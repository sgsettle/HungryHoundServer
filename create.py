import requests
import csv

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
        response = requests.post("http://localhost:3000/log", json={"log":toChange})
        print(response)
        

    