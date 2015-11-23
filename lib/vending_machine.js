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
var products = {cola: 100, chips: 50, candy: 65}
var currently_selected_product = '';
var product_dispensed = false;
var show_price = false;

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
			if(show_price){
				show_price = false;
				return 'PRICE ' + products[currently_selected_product];
			}else{
				return current_amount == 0 ? 'INSERT COIN' : current_amount;
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
			currently_selected_product = product_key;
			dispense_product();
			return true;
		}
		return false;
	}
}

// ## Private methods ##

// When a product button is pressed and enough money has been inserted, the product is dispensed and the machine displays THANK YOU.  If the display is checked again, it will display INSERT COINS and the current amount will be set to $0.00.  If there is not enough money inserted then the machine displays PRICE and the price of the item and subsequent checks of the display will display either INSERT COINS or the current amount as appropriate.
function dispense_product(){
	if(products[currently_selected_product] <= current_amount){
		product_dispensed = true;
		make_change();
	}
	set_show_price_flag();
}

function set_show_price_flag(){
	if(currently_selected_product && products[currently_selected_product] > current_amount){
		show_price = true;
	}else{
		show_price = false;
	}
}
// When a product is selected that costs less than the amount of money in the machine, then the remaining amount is placed in the coin return. 
function make_change(){
	if(products[currently_selected_product] < current_amount){
		var change = current_amount - products[currently_selected_product];
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

