$("#slider").noUiSlider({
	start: [20, 80],
	connect: true,
	range: {
		'min': 0,
		'max': 100
	}
});

$(function(){
	require(['account', 'atm', 'branch', 'customer', 'deposit', 'transaction', 'withdrawal', 'bills'], function (account, atm, branch, customer, deposit, transaction, withdrawal, bills) {
		var apikey = '4baacf4ff89dcf34346063a26c8b7d0b';
		//var custAccount = account.initWithKey(apikey);
		//var customer = custAccount.getAll()[0];
		//accountDemo(apikey, account);
		//atmDemo(apikey, atm);
		billDemo(apikey, bills);
		//branchDemo(apikey, branch);
		// customerDemo(apikey, customer);
		//depositDemo(apikey, deposit);	
		//transactionDemo(apikey, account, transaction);
		//withdrawalDemo(apikey, withdrawal);
	});
});

function billDemo (apikey, bills) {
	var bm = bills.initWithKey(apikey);
	// console.log("[Customer Account Bills] : " + JSON.stringify(bm.getAllBillsByAccountId("555bed95a520e036e52b2680")));
}

function customerDemo (apikey, customer) {
	var customerAccount = customer.initWithKey(apikey);
	console.log("[Customer - Get All] : Sample Customer: " + customerAccount.getAll()[0].account_ids);
	console.log("[Customer - Get All] : Sample Customer: " + customerAccount.getAll()[0]._id);
	console.log("[Customer - Get One] : Sample Customer" + customerAccount.getOne('555bed95a520e036e52b20c6').first_name);
	console.log("[Customer - Get OneByAccount] : Sample Customer" + customerAccount.getOneByAcountId('555bed95a520e036e52b2787'));
	var customerInfo = "{\"address\": {\"street_number\": \"8020\",\"street_name\": \"Greenroad Dr\",\"city\": \"McLean\",\"state\": \"VA\",\"zip\": \"22102\"}}";
	console.log("[Customer - Update Customer] :" + customerAccount.updateCustomer('555bed95a520e036e52b20c6', customerInfo));
}

var app = angular.module('myApp',[]);
app.controller('ListController', function($scope) {
    $scope.items = [["Uber","200"],["Costco","40"],["Starbucks","5"]]
});