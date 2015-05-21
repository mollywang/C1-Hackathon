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