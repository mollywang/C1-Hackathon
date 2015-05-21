$("#slider").noUiSlider({
	start: [20, 80],
	connect: true,
	range: {
		'min': 0,
		'max': 100
	}
});

$('#hi').innerHTML = $('#slider').Link('lower').to($('#slider-value'));

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
	var bills = bm.getAllBillsByAccountId("555bed95a520e036e52b2680");
	// console.log("[Customer Account Bills] : " + bm.getAllBillsByAccountId("555bed95a520e036e52b2680"));
	// var result = bm.getAllBillsByAccountId("555bed95a520e036e52b2680");
	var filtered = filterDate("2015-05-21", "2015-05-29", bills);
	var l = new Object();
	for (i in filtered) {
		payment = filtered[i];
		var its_in_there = false;
		for (k in l) {
			if (payment.payee == k) {
				 its_in_there = true;
			}
		}
		if (its_in_there == true) {
			l[payment.payee] += payment.payment_amount; 
		}
		else {
			l[payment.payee] = payment.payment_amount;
		}
	}
	return l
	// console.log(l);
	// console.log(JSON.stringify(filtered));
}
	
app.controller('ListController', function($scope) {
    require(['account', 'atm', 'branch', 'customer', 'deposit', 'transaction', 'withdrawal', 'bills'])
    bills = require('bills');
	var apikey = '4baacf4ff89dcf34346063a26c8b7d0b';
	$scope.items = billDemo(apikey, bills);
});