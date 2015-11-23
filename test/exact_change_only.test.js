var expect = require('chai').expect;
// Re-initialize the module when we are running all the tests from npm
var mod_name = require.resolve('../lib/vending_machine.js');
if(mod_name) delete require.cache[mod_name];
var vending_machine = require('../lib/vending_machine.js');


// When the machine is not able to make change with the money in the machine for any of the items that it sells, it will display EXACT CHANGE ONLY instead of INSERT COINS.
describe('vending machine ', function(){
	describe('exact change only', function(){
		it('display shows INSERT COIN', function() {
			expect(vending_machine.get_display()).to.eq('INSERT COIN');
		});
		it('empty coin hopper', function() {
			expect(vending_machine.empty_coin_hopper()).to.be.true;
		});
		it('display shows EXACT CHANGE ONLY', function() {
			expect(vending_machine.get_display()).to.eq('EXACT CHANGE ONLY');
		});
		it('add a nickel', function() {
			expect(vending_machine.fill_coin_hopper(1,0,0)).to.be.true;
		});
		it('display shows EXACT CHANGE ONLY', function() {
			expect(vending_machine.get_display()).to.eq('EXACT CHANGE ONLY');
		});
		it('add 2 dimes', function() {
			expect(vending_machine.fill_coin_hopper(0,2,0)).to.be.true;
		});
		it('display shows INSERT COIN', function() {
			expect(vending_machine.get_display()).to.eq('INSERT COIN');
		});
	});
});