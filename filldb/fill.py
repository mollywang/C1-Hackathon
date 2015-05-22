import requests
import IPython as ipy
import json
import random


account_id = '555bed95a520e036e52b2787'
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

	year = '2015'

	for i in range(1,32):
		date = year+'-'+'1'+'-'+str(i)
		payee = companies[random.randint(0,len(companies)-1)]
		if payee not in ['Seven-Eleven', 'Uber', 'Starbucks', 'The Local Pub', 'Hooters', 'UPS']:
			amount = random.randint(50,500)
		else:
			amount = random.randint(5,50)
		make_payment(payee, date, amount)

	for i in range(1,29):
		date = year+'-'+'2'+'-'+str(i)
		payee = companies[random.randint(0,len(companies)-1)]
		if payee not in ['Seven-Eleven', 'Uber', 'Starbucks', 'The Local Pub', 'Hooters', 'UPS']:
			amount = random.randint(50,500)
		else:
			amount = random.randint(5,50)
		make_payment(payee, date, amount)
	print "2"
	for i in range(1,32):
		date = year+'-'+'3'+'-'+str(i)
		payee = companies[random.randint(0,len(companies)-1)]
		if payee not in ['Seven-Eleven', 'Uber', 'Starbucks', 'The Local Pub', 'Hooters', 'UPS']:
			amount = random.randint(50,500)
		else:
			amount = random.randint(5,50)
		make_payment(payee, date, amount)
	print "3"
	for i in range(1,31):
		date = year+'-'+'4'+'-'+str(i)
		payee = companies[random.randint(0,len(companies)-1)]
		if payee not in ['Seven-Eleven', 'Uber', 'Starbucks', 'The Local Pub', 'Hooters', 'UPS']:
			amount = random.randint(50,500)
		else:
			amount = random.randint(5,50)
		make_payment(payee, date, amount)
	print "4"
	for i in range(1,23):
		date = year+'-'+'5'+'-'+str(i)
		payee = companies[random.randint(0,len(companies)-1)]
		if payee not in ['Seven-Eleven', 'Uber', 'Starbucks', 'The Local Pub', 'Hooters', 'UPS']:
			amount = random.randint(50,500)
		else:
			amount = random.randint(5,50)
		make_payment(payee, date, amount)

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