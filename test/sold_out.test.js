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

// When the return coins is selected, the money the customer has placed in the machine is returned and the display shows INSERT COIN.
describe('vending machine ', function(){
	describe('sold out', function(){
		it("select chips", function() {
			expect(vending_machine.select_product('chips')).to.be.true;
		});
		it('display shows SOLD OUT', function() {
			expect(vending_machine.get_display()).to.eq('SOLD OUT');
		});
	});	
	describe('add chips and buy them', function(){
		it("add chips", function() {
			expect(vending_machine.add_product('chips', 1)).to.be.true;
		});
		it("select chips", function() {
			expect(vending_machine.select_product('chips')).to.be.true;
		});
		it('display shows price (PRICE 50)', function() {
			expect(vending_machine.get_display()).to.eq('PRICE 50');
		});	
		it("accepts coins", function() {	
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
	describe('now chips are sold out', function(){
		it("select chips", function() {
			expect(vending_machine.select_product('chips')).to.be.true;
		});
		it('display shows SOLD OUT', function() {
			expect(vending_machine.get_display()).to.eq('SOLD OUT');
		});
	});	
});