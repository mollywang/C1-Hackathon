var bills = [{
  "_id": "",
  "status": "",
  "payee": "Uber",
  "nickname": "",
  "creation_date": "",
  "payment_date": "2015-05-20",
  "recurring_date": 0,
  "upcoming_payment_date": "",
  "payment_amount": 40
}, 
{
  "_id": "",
  "status": "",
  "payee": "Chipotle",
  "nickname": "",
  "creation_date": "",
  "payment_date": "2015-05-28",
  "recurring_date": 0,
  "upcoming_payment_date": "",
  "payment_amount": 15
},
{
  "_id": "",
  "status": "",
  "payee": "Chipotle",
  "nickname": "",
  "creation_date": "",
  "payment_date": "2015-05-30",
  "recurring_date": 0,
  "upcoming_payment_date": "",
  "payment_amount": 10
}, 
{
  "_id": "",
  "status": "",
  "payee": "Starbucks",
  "nickname": "",
  "creation_date": "",
  "payment_date": "2015-05-24",
  "recurring_date": 0,
  "upcoming_payment_date": "",
  "payment_amount": 5
}];

function findUseful(bills) {
  //Filters out irrelevant properties within bill
	var usefulBills = []
	for (key in bills) {
		var bill = bills[key]
		var billCopy = {}
		for (attribute in bill) {
			if (attribute == "payee" || attribute == "payment_date" || attribute == "payment_amount") {
				billCopy[attribute] = bill[attribute]
				}
		}
		usefulBills.push(billCopy)
	}
	return usefulBills
}

function sortByDate(usefulBills) {
  //returns sorted list of bills by date
	return usefulBills.sort(function(a,b) { 
    return new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime() 
	});
}

function filterDate(date1, date2, sortedUsefulBills) {
  //returns bills with dates in the given boundaries
  var newDate1 = new Date(date1).getTime()
  var newDate2 = new Date(date2).getTime()
  validBills = []
  for (key in sortedUsefulBills) {
    bill = sortedUsefulBills[key]
    time = new Date(bill.payment_date).getTime()
    if (time >= newDate1 && time <= newDate2) {
      validBills.push(bill)
    }
  }
  return validBills
}

function sortByAmount(sortedValidBills) {
  //returns bills sorted by amount in a given date boundary 
  return sortedValidBills.sort(function(a,b) { 
    return a.payment_amount - b.payment_amount
  });
}

var useful = findUseful(bills)

var sorted = sortByDate(useful)     

var filtered = filterDate("2015-05-21", "2015-05-29", sorted) 

var sortedFiltered = sortByAmount(filtered)

console.log(sortedFiltered)



