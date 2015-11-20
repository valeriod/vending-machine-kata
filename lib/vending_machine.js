// # Vending Machine Kata #

// ### Coins Definition ###
// We define coins by weight, diameter and thickness.
// Sources: [US Mint](https://www.usmint.gov/about_the_mint/?action=coin_specifications), [Change Machine](http://www.madehow.com/Volume-4/Change-Machine.html).
// An object that is keyed by weight, diameter and thicknes returns the value in cents for any of the coins we accept.
var coin_specs = {
	5:{21.21:{1.95:5}}	// Nickel
}
	

var current_amount = 0;

// ## Features ##
module.exports = {
	// Accept Coins
	// ------------
	// The vending machine will accept valid coins (nickels, dimes, and quarters) and reject invalid ones (pennies)
	//  When a valid coin is inserted the amount of the coin will be added to the current amount and the display will be updated.
	insert_coin: function(weight, diameter, thickness){
		if(typeof coin_specs[weight][diameter][thickness] != 'undefined'){
			var amount = coin_specs[weight][diameter][thickness];
			current_amount += amount
			return amount;
		}else{
			return 0;
		}
	},
	get_display: function(){
		return current_amount == 0 ? 'INSERT COIN' : current_amount;
	}
}
