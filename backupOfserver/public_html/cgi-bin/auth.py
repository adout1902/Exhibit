#!/usr/bin/python3

import sqlite3
import cgi
import json
import sys

fs = cgi.FieldStorage()
sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n")
sys.stdout.write("\n")
result={}
def login():
    username = fs.getvalue("username")
    password = fs.getvalue("password")
    with sqlite3.connect("/home/ubuntu/Users.db") as db:
        cursor = db.cursor()
    findUser = ("SELECT * FROM user WHERE username = ? AND password = ?")
    cursor.execute(findUser,[(username),(password)])
    results = cursor.fetchall()

    if results:
        result["success"] = True
        result["message"]="Welcome, "+username
        return("done")

    else:
        result["message"]= "Incorrect credentials."

login()
print(json.dumps(result))



