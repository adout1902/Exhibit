#!/usr/bin/python3

from http import cookies
import cgi


fs = cgi.FieldStorage()
username = fs.getvalue("username")

def logUser(username):
    print("Set-Cookie: username="+username)
    print("Content-type: text/html")
    print("")


logUser(username)



