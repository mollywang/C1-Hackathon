import requests
import IPython as ipy
import json


account_id = '555bed95a520e036e52b2680'
api_key = '4baacf4ff89dcf34346063a26c8b7d0b'

link = 'http://api.reimaginebanking.com:8080/accounts/'+account_id+'/bills?key='+api_key

def make_payment(payee, date, amount):
	status='completed'


	payload = {'status':status,
			   'payee':payee,
			   'payment_date':date,
			   'payment_amount':amount}
	requests.post(link, data=json.dumps(payload), headers={'content-type':'application/json'})

def main():
	companies = ['Apple', 'Seven-Eleven', 'Uber', 'Starbucks', 'Amazon.com','Costco', 'The Local Pub', 'Hooters', 'Venmo.com', 'H&M', 'UPS', 'United']
	
	months = ['0'+str(i) for i in range(1,6)]
	days = [str(i) for i in range(1,30)]

	payee='Uber'
	date='2015-05-12'
	amount=39
	make_payment(payee, date, amount)
	# r = requests.get('http://api.reimaginebanking.com:8080/accounts/'+account_id+'/bills?key='+api_key)
	ipy.embed()