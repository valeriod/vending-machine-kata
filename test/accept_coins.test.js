var expect = require('chai').expect;
var vending_machine = require('../lib/vending_machine.js');

// We define coins by weight, diameter and thickness.
var coin_specs = {
	Cent : {w:2.5, dia:19.05, th: 1.52},
	Nickel : {w:5, dia:21.21, th: 1.95},
	Dime : {w:2.268, dia:17.91, th: 1.35},
	QuarterDollar : {w:5.670, dia:24.26, th: 1.75},
	HalfDollar : {w:11.340, dia:30.61, th: 2.15},
}

// The vending machine will accept valid coins (nickels, dimes, and quarters) and reject invalid ones (pennies). 
describe('vending machine ', function(){
	describe('coin dispenser', function(){
		var coin_dispenser = vending_machine.get_coin_dispenser();
		it("has a coin_dispenser object", function() {
			expect(typeof coin_dispenser).to.eql('object');
		});
		it("has Nickel, Dime and QuarterDollar properties", function() {
			expect(coin_dispenser).to.have.ownProperty('Nickel');
			expect(coin_dispenser).to.have.property('Dime');
			expect(coin_dispenser).to.have.property('QuarterDollar');
		});
		it("has no coins initially", function() {
			expect(coin_dispenser.Nickel).to.eql(0);
			expect(coin_dispenser.Dime).to.eql(0);
			expect(coin_dispenser.QuarterDollar).to.eql(0);
		});
	});
	describe('machine display', function(){	
		it('shows INSERT COIN', function() {
			expect(vending_machine.get_display()).to.eq('INSERT COIN');
		});
	});	
	describe('accept coins ', function(){
		it("accepts a nickel", function() {
			var aNickel = coin_specs.Nickel;
			expect(vending_machine.insert_coin(aNickel.w, aNickel.dia, aNickel.th)).to.eql(5);
		});
	});
	describe('machine display', function(){	
		it('shows inserted amount (5)', function() {
			expect(vending_machine.get_display()).to.eq(5);
		});			
	});
	describe('coin dispenser', function(){
		var coin_dispenser = vending_machine.get_coin_dispenser();
		it("has one nickel", function() {
			expect(coin_dispenser.Nickel).to.eql(1);
			expect(coin_dispenser.Dime).to.eql(0);
			expect(coin_dispenser.QuarterDollar).to.eql(0);
		});
	});
});