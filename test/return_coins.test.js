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
	describe('return coins', function(){
		it("accepts coins", function() {
			var aNickel = coin_specs.Nickel;
			expect(vending_machine.insert_coin(aNickel.w, aNickel.dia, aNickel.th)).to.eql(5);
			var aDime = coin_specs.Dime;
			expect(vending_machine.insert_coin(aDime.w, aDime.dia, aDime.th)).to.eql(10);
			var aQuarterDollar = coin_specs.QuarterDollar;
			expect(vending_machine.insert_coin(aQuarterDollar.w, aQuarterDollar.dia, aQuarterDollar.th)).to.eql(25);
		});
		it("return coins", function() {
			expect(vending_machine.return_coins()).to.be.true;
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