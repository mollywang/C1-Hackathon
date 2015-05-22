// $("#slider").noUiSlider({
// 	start: [90, 130],
// 	connect: true,
// 	range: {
// 		'min': 0,
// 		'max': 141
// 	}
// });

var items = {'Uber':400, 'Safeway':20};
require(['account', 'atm', 'branch', 'customer', 'deposit', 'transaction', 'withdrawal', 'bills']);
bills = require('bills');
var apikey = '4baacf4ff89dcf34346063a26c8b7d0b';
items = billDemo(apikey, bills, '2015-01-01','2015-05-22');

function findUseful(bills) {
  //Filters out irrelevant properties within bill
  var usefulBills = [];
  for (key in bills) {
    var bill = bills[key];
    var billCopy = {};
    for (attribute in bill) {
      if (attribute == "payee" || attribute == "payment_date" || attribute == "payment_amount") {
        billCopy[attribute] = bill[attribute];
      }
    }
    usefulBills.push(billCopy);
  }
  return usefulBills;
}

function sortByDate(usefulBills) {
  //returns sorted list of bills by date
  return usefulBills.sort(function(a,b) {
    return new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime();
  });
}

function filterDate(date1, date2, sortedUsefulBills) {
  //returns bills with dates in the given boundaries
  var newDate1 = new Date(date1).getTime();
  var newDate2 = new Date(date2).getTime();
  validBills = [];
  for (key in sortedUsefulBills) {
    bill = sortedUsefulBills[key];
    time = new Date(bill.payment_date).getTime();
    if (time >= newDate1 && time <= newDate2) {
      validBills.push(bill);
    }
  }
  return validBills;
}

function sortByAmount(sortedValidBills) {
  //returns bills sorted by amount in a given date boundary 
  return sortedValidBills.sort(function(a,b) { 
    return a.payment_amount - b.payment_amount;
  });
}

var app = angular.module('myApp',[]);

// $(function(){
// 	require(['account', 'atm', 'branch', 'customer', 'deposit', 'transaction', 'withdrawal', 'bills'], function (account, atm, branch, customer, deposit, transaction, withdrawal, bills) {
// 		var apikey = '4baacf4ff89dcf34346063a26c8b7d0b';
// 		//var custAccount = account.initWithKey(apikey);
// 		//var customer = custAccount.getAll()[0];
// 		//accountDemo(apikey, account);
// 		//atmDemo(apikey, atm);
// 		billDemo(apikey, bills);
// 		//branchDemo(apikey, branch);
// 		// customerDemo(apikey, customer);
// 		//depositDemo(apikey, deposit);	
// 		//transactionDemo(apikey, account, transaction);
// 		//withdrawalDemo(apikey, withdrawal);
// 	});
// });
function companyAmountPairsSort(pairs) {
  var amounts = []
  for (i in pairs) {
    amounts.push({"payee": i, "amount": pairs[i]})
  }
  var sortedByReverseAmount = amounts.sort(function(a, b) { 
     return b.amount - a.amount
  });

  return amounts
 }


function billDemo (apikey, bills, start, end) {
	var bm = bills.initWithKey(apikey);
	// console.log("[Customer Account Bills] : " + JSON.stringify(bm.getAllBillsByAccountId("555bed95a520e036e52b2680")));
	var bills = bm.getAllBillsByAccountId("555bed95a520e036e52b2787");
	// console.log("[Customer Account Bills] : " + bm.getAllBillsByAccountId("555bed95a520e036e52b2680"));
	// var result = bm.getAllBillsByAccountId("555bed95a520e036e52b2680");
	var filtered = filterDate(start, end, bills);
	var l = new Object();
	for (i in filtered) {
		payment = filtered[i];
		l[payment.payee] = (l[payment.payee] ? l[payment.payee] + payment.payment_amount : payment.payment_amount)
	}
	return companyAmountPairsSort(l)
	// console.log(l);
	// console.log(JSON.stringify(filtered));
}

$("#range_22").ionRangeSlider({
	type: "double",
    min: new Date("January 1 2015").getTime(),
    max: new Date("May 22 2015").getTime(),
    prettify: function (num) {
    	return new Date(num).toDateString();
	},
	onFinish: function (data) {
		function formatDate(d) {
		    var month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();

		    if (month.length < 2) month = '0' + month;
		    if (day.length < 2) day = '0' + day;

		    return [year, month, day].join('-');
		}
		var start = formatDate(new Date(data.from));
		var end = formatDate(new Date(data.to));
		// require(['account', 'atm', 'branch', 'customer', 'deposit', 'transaction', 'withdrawal', 'bills'])
	    bills = require('bills');
		var apikey = '4baacf4ff89dcf34346063a26c8b7d0b';
		window.rootScope.items = billDemo(apikey, bills, start, end);
		window.rootScope.$apply();
	}
});
	
app.controller('ListController', function($scope) {
	window.rootScope = $scope;
	items = {'Uber':400, 'Safeway':20};
    require(['account', 'atm', 'branch', 'customer', 'deposit', 'transaction', 'withdrawal', 'bills']);
    bills = require('bills');
	var apikey = '4baacf4ff89dcf34346063a26c8b7d0b';
	$scope.items = billDemo(apikey, bills, '2015-01-01','2015-05-22');
});

app.controller('sliderController', function($scope) {
	var lower_value = document.getElementById('lower_value').innerHTML;
	var upper_value = document.getElementById('upper_value').innerHTML;
});

