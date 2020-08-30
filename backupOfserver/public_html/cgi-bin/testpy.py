#!/usr/bin/python3

import cgi

form = cgi.FieldStorage()
query = form["query"].value

print ("Content-type: text/plain\n\nquery = " + query + "\n")
