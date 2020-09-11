#!/usr/bin/python3

import os
import portalocker
import sys
import cgi
import json


sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n")
sys.stdout.write("\n")



with open("/home/ubuntu/json/Users.json", 'r') as f:
        #portalocker.lock(f, portalocker.LOCK_EX)
        users = json.load(f)

def login():
    if username in users:
        if users[username]["password"] == password:
            result["message"] = "Welcome, "+username
            result["code"] = 1
           
        else:
            result["message"] = "Incorrect credentials. Please try again."
            result["code"] = 0
    else:
        result["message"] = "Incorrect credentials. Please sign up."
        result["code"] = 0



def signUp():
    if username in users:
        result["message"] = "Sorry, this username is taken."
        result["code"] = 0

    else:
        users[username] = {"username":username,"password":password}
        with open("/home/ubuntu/json/Users.json", 'w') as f:
            portalocker.lock(f, portalocker.LOCK_EX)
            json.dump(users,f,indent=4)
        result["message"] = "Welcome to Exhibit, "+username
        result["code"] = 1
       
def getUsers():
    result["users"] = json.dumps(list(users.keys()))

fs = cgi.FieldStorage()
action = fs.getvalue("action")
username = fs.getvalue("username")
password = fs.getvalue("password")
result={}


if action == "login":
    login()

elif action == "signup":
    signUp()

elif action == "get":
    getUsers()


print(json.dumps(result))

    