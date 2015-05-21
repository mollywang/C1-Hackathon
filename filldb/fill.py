import requests
import IPython as ipy
import json
import random


account_id = '555bed95a520e036e52b2680'
api_key = '4baacf4ff89dcf34346063a26c8b7d0b'

link = 'http://api.reimaginebanking.com:8080/accounts/'+account_id+'/bills?key='+api_key

def make_payment(payee, date, amount):
	status='completed'


	payload = {'status':status,
			   'payee':payee,
			   'payment_date':date,
			   'payment_amount':amount}
	return requests.post(link, data=json.dumps(payload), headers={'content-type':'application/json'})

def main():
	companies = ['Apple', 'Seven-Eleven', 'Uber', 'Starbucks', 'Amazon.com','Costco', 'The Local Pub', 'Hooters', 'Venmo.com', 'H&M', 'UPS', 'United']
	
	months = ['0'+str(i) for i in range(1,6)]
	days = [str(i) for i in range(1,31)]
	years = ['2015']

	# for month in months:
	# 	for day in days:
	# 		for year in years:
	# 			for _ in range(random.randint(3,6)):
	# 				date = year+'-'+month+'-'+day
	# 				payee = companies[random.randint(0,len(companies)-1)]
	# 				if payee not in ['Seven-Eleven', 'Uber', 'Starbucks', 'The Local Pub', 'Hooters', 'UPS']:
	# 					amount = random.randint(50,500)
	# 				else:
	# 					amount = random.randint(5,50)
	# 				make_payment(payee, date, amount)
	# make_payment(payee, date, amount)
	r = requests.get('http://api.reimaginebanking.com:8080/accounts/'+account_id+'/bills?key='+api_key)
	print r.text
	print "Completed"

if __name__ == '__main__':
	main()