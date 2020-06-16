"""
Remember to activate the virtual environment with this command:
source ./venv/bin/activate
then python create.py
"""

import requests
import csv

# register a temp user
# grab it's jwt for requests
# populate the log table
# delete user

api_url = input('What is the url you would like to use? > ')

fake_user = {
    "firstName": "temp",
    "lastName": "user",
    "userName": "testerboi",
    "password": "testing123"
}

session = requests.Session()

response = session.post(f'{api_url}/user/signup', json={"user":fake_user})
token = response.json().get('sessionToken')
session.headers.update({'Authorization': token})

with open('./log3.csv') as f:
    stuff = csv.reader(f)
    for k, row in enumerate(stuff):
        if k == 0:
            continue
        toChange = {
            "restaurantName": row[0],
            "address": row[1],
            "foodType": row[2]
        }
        print(toChange)
        response = session.post(f"{api_url}/log", json={"log":toChange})
        print(response)
        

    