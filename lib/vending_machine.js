// # Vending Machine Kata #

// ### Coins Definition ###
// We define coins by weight, diameter and thickness.
// Sources: [US Mint](https://www.usmint.gov/about_the_mint/?action=coin_specifications), [Change Machine](http://www.madehow.com/Volume-4/Change-Machine.html).
// An object that is keyed by weight, diameter and thicknes returns the value in cents for any of the coins we accept.
var coin_specs = {
	5:{21.21:{1.95:{amount:5, name:'Nickel'}}},							// Nickel
	2.268:{17.91:{1.35:{amount:10, name:'Dime'}}},					// Dime
	5.670:{24.26:{1.75:{amount:25, name:'QuarterDollar'}}}	// QuarterDollar
}

// Inserted coins are placed in the coin dispenser.
var coin_dispenser = {Nickel:0, Dime: 0, QuarterDollar: 0}
// Rejected coins are placed in the coin return as well as coins in the dispenser when the user presses return coins.
var coin_return = {Rejected:0, Nickel:0, Dime: 0, QuarterDollar: 0}
var current_amount = 0;

// There are three products: 
// cola for $1.00, chips for $0.50, and candy for $0.65.
var products = {
	cola: {amt:100, qty:0}, 
	chips: {amt:50, qty:0}, 
	candy: {amt:65, qty:5}
}
var currently_selected_product = '';
var product_dispensed = false;
var show_price = false;
var product_sold_out = false;
// The money in the machine is kept in the coin hoppers.  We initialize with the minimum needed so we don't break the previous tests.
var coin_hopper = {Nickel:1, Dime:2, QuarterDollar:0}

// ## Features ##
module.exports = {
	// Accept Coins
	// ------------
	// The vending machine will accept valid coins (nickels, dimes, and quarters) and reject invalid ones (pennies)
	//  When a valid coin is inserted the amount of the coin will be added to the current amount and the display will be updated.
	insert_coin: function(weight, diameter, thickness){
		if(typeof coin_specs[weight] != 'undefined' && 
		typeof coin_specs[weight][diameter] != 'undefined' && 
		typeof coin_specs[weight][diameter][thickness] != 'undefined'){
			var amount = coin_specs[weight][diameter][thickness].amount;
			current_amount += amount
			coin_dispenser[coin_specs[weight][diameter][thickness].name]++;
			dispense_product();
			return amount;
		}else{
			coin_return.Rejected++;
			return 0;
		}
	},
	get_display: function(){
		// If the product is dispensed then the machine displays THANK YOU.  
		if(product_dispensed){
			// We reset the current amount and the dispensed flag so that if the display is checked again, it will display INSERT COINS.
			current_amount = 0;
			product_dispensed = false
			currently_selected_product = '';
			return 'THANK YOU';
		}else{
			if(product_sold_out){
				// Reset flag so it will display the amount of money remaining in the machine or INSERT COIN next time.
				product_sold_out = false;
				return 'SOLD OUT' 
			}else if(show_price){
				// Reset flag so it will display the amount of money remaining in the machine or INSERT COIN next time.
				show_price = false;
				return 'PRICE ' + products[currently_selected_product].amt;
			}else{
				if(current_amount == 0){
					return exact_change_only() ? 'EXACT CHANGE ONLY' : 'INSERT COIN'; 
				}else{
					return current_amount;
				}
			}
		}
		
	},
	get_coin_dispenser: function(){
		return coin_dispenser;
	},
	get_coin_return: function(){
		return coin_return;
	},
	// Select Product
	// --------------
	// Select one of the available products and execute the dispensing logic.
	// Make Change
	// -----------
	// Return extra money, logic in dispense_product()
	select_product: function(product_key){
		if(products[product_key]){
			if(products[product_key].qty > 0){
				currently_selected_product = product_key;
				dispense_product();
			}else{
				product_sold_out = true;
			}
			return true;
		}
		return false;
	},
	// Return Coins
	// ------------
	// When the return coins is selected, the money the customer has placed in the machine is returned and the display shows INSERT COIN.
	return_coins: function(){
		for(coin_denomination in coin_dispenser){
			coin_return[coin_denomination] = coin_dispenser[coin_denomination];
			coin_dispenser[coin_denomination] = 0;
		}
		current_amount = 0;
		return true;
	},
	// Sold Out
	// --------
	// When the item selected by the customer is out of stock, the machine displays SOLD OUT.  If the display is checked again, it will display the amount of money remaining in the machine or INSERT COIN if there is no money in the machine.
	add_product: function(product_key, qty){
		if(products[product_key]){
			products[product_key].qty += qty;
			return true;
		}
		return false
	},
	// Exact Change Only
	// -----------------
	// When the machine is not able to make change with the money in the machine for any of the items that it sells, it will display EXACT CHANGE ONLY instead of INSERT COINS.
  fill_coin_hopper: function(Nickel_qty, Dime_qty, QuarterDollar_qty) {
  	coin_hopper.Nickel += Nickel_qty;
		coin_hopper.Dime += Dime_qty;
		coin_hopper.QuarterDollar += QuarterDollar_qty;
		return true;
  },
	empty_coin_hopper: function(){
		coin_hopper = {Nickel:0, Dime:0, QuarterDollar:0}
		return true;
	}
}

// ## Private methods ##

// When a product button is pressed and enough money has been inserted, the product is dispensed and the machine displays THANK YOU.  If the display is checked again, it will display INSERT COINS and the current amount will be set to $0.00.  If there is not enough money inserted then the machine displays PRICE and the price of the item and subsequent checks of the display will display either INSERT COINS or the current amount as appropriate.
function dispense_product(){
	if(currently_selected_product && 
	products[currently_selected_product].amt <= current_amount){
		product_dispensed = true;
		products[currently_selected_product].qty--;
		make_change();
	}
	set_show_price_flag();
}

function set_show_price_flag(){
	if(currently_selected_product && 
	products[currently_selected_product].amt > current_amount){
		show_price = true;
	}else{
		show_price = false;
	}
}
// When a product is selected that costs less than the amount of money in the machine, then the remaining amount is placed in the coin return. 
function make_change(){
	if(products[currently_selected_product].amt < current_amount){
		var change = current_amount - products[currently_selected_product].amt;
		// Return coins from higer denomination to lower one.
		var QuarterDollar_qty = Math.floor(change/25); 
		coin_return.QuarterDollar++;
		change -= QuarterDollar_qty * 25;
		// Dime
		var Dime_qty = Math.floor(change/10); 
		coin_return.Dime++;
		change -= Dime_qty * 10;
		// Nickel
		var Nickel_qty = Math.floor(change/5); 
		coin_return.Nickel++;
		change -= Nickel_qty * 10;
	}
}
// The minimum amount of change you need is `larger_denomination - smaller_denomination`.and you need at least a coin where `price % denomination == 0` for each denomination except the larger one.
function exact_change_only(){
	var values = {Nickel:5, Dime:10, QuarterDollar:25}
	// Check the minimum amount.
	var min_amt = 25 - 5;
	var tot_coin_hopper_amt = 0;
	for(denomination in coin_hopper){
		tot_coin_hopper_amt += coin_hopper[denomination] * values[denomination];
	}
	if(tot_coin_hopper_amt < min_amt) return true;
	// Check that we have the minimum number of coins.
	for(product_key in products){
		var price = products[product_key].amt;
		for(denomination in coin_dispenser){
			if(denomination != 'QuarterDollar' && 
			price % values[denomination] == 0 && coin_hopper[denomination] == 0)
				return true;
		}
	}
	return false;
}
