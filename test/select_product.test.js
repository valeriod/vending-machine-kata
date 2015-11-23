var expect = require('chai').expect;
// Re-initialize the module when we are running all the tests from npm
var mod_name = require.resolve('../lib/vending_machine.js');
if(mod_name) delete require.cache[mod_name];
var vending_machine = require('../lib/vending_machine.js');

// We define coins by weight, diameter and thickness.
var coin_specs = {
	Cent : {w:2.5, dia:19.05, th: 1.52},
	Nickel : {w:5, dia:21.21, th: 1.95},
	Dime : {w:2.268, dia:17.91, th: 1.35},
	QuarterDollar : {w:5.670, dia:24.26, th: 1.75},
	HalfDollar : {w:11.340, dia:30.61, th: 2.15},
}

// There are three products: cola for $1.00, chips for $0.50, and candy for $0.65.  When the respective button is pressed and enough money has been inserted, the product is dispensed and the machine displays THANK YOU.  If the display is checked again, it will display INSERT COINS and the current amount will be set to $0.00.  If there is not enough money inserted then the machine displays PRICE and the price of the item and subsequent checks of the display will display either INSERT COINS or the current amount as appropriate.
describe('vending machine ', function(){
	describe('select product', function(){
		describe('buy candy', function(){
			it("accepts coins", function() {
				var aNickel = coin_specs.Nickel;
				expect(vending_machine.insert_coin(aNickel.w, aNickel.dia, aNickel.th)).to.eql(5);
				var aDime = coin_specs.Dime;
				expect(vending_machine.insert_coin(aDime.w, aDime.dia, aDime.th)).to.eql(10);
				var aQuarterDollar = coin_specs.QuarterDollar;
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
			});
			it('display shows inserted amount (65)', function() {
				expect(vending_machine.get_display()).to.eq(65);
			});	
			it("select product", function() {
				expect(vending_machine.select_product('candy')).to.be.true;
			});
			it('display shows THANK YOU', function() {
				expect(vending_machine.get_display()).to.eq('THANK YOU');
			});
			it('then display shows INSERT COIN', function() {
				expect(vending_machine.get_display()).to.eq('INSERT COIN');
			});
		});
		describe('buy candy and show price', function(){
			it("select product", function() {
				expect(vending_machine.select_product('candy')).to.be.true;
			});
			it("accepts coins", function() {
				var aNickel = coin_specs.Nickel;
				expect(vending_machine.insert_coin(aNickel.w, aNickel.dia, aNickel.th)).to.eql(5);
			});
			it('display shows price (PRICE 65)', function() {
				expect(vending_machine.get_display()).to.eq('PRICE 65');
			});	
			it("accepts coins", function() {	
				var aDime = coin_specs.Dime;
				expect(vending_machine.insert_coin(aDime.w, aDime.dia, aDime.th)).to.eql(10);
				var aQuarterDollar = coin_specs.QuarterDollar;
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
			});
			it('display shows THANK YOU', function() {
				expect(vending_machine.get_display()).to.eq('THANK YOU');
			});
			it('then display shows INSERT COIN', function() {
				expect(vending_machine.get_display()).to.eq('INSERT COIN');
			});
		});
		describe('buy candy and make change', function(){
			it("accepts coins", function() {
				var aNickel = coin_specs.Nickel;
				expect(vending_machine.insert_coin(aNickel.w, aNickel.dia, aNickel.th)).to.eql(5);
				expect(vending_machine.insert_coin(aNickel.w, aNickel.dia, aNickel.th)).to.eql(5);
				var aDime = coin_specs.Dime;
				expect(vending_machine.insert_coin(aDime.w, aDime.dia, aDime.th)).to.eql(10);
				expect(vending_machine.insert_coin(aDime.w, aDime.dia, aDime.th)).to.eql(10);
				var aQuarterDollar = coin_specs.QuarterDollar;
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
				expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
			});
			it("select product", function() {
				expect(vending_machine.select_product('candy')).to.be.true;
			});
			var coin_return = vending_machine.get_coin_return();
			it("coin return has 3 coins", function() {
				expect(coin_return.Rejected).to.eql(0);
				expect(coin_return.Nickel).to.eql(1);
				expect(coin_return.Dime).to.eql(1);
				expect(coin_return.QuarterDollar).to.eql(1);
			});
		});	
	});
});