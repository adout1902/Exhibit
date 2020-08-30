#!/usr/bin/python3 

import cgi 
print("Content-type: text/html\n\n") 
print("<html><body>") 
print("<h1> Hello Program! </h1>") 
# Using the inbuilt methods 
form = cgi.FieldStorage() 
name = form.getvalue("name") 
print("<h1>Hello" +name+"! Welcome to the official Grosjean fansite!</h1>")  
# Using HTML input and forms method 
print("<form method='post' action='form.py'>") 
print("Name: <input type='text' name='name' />")  
print("<input type='submit' value='Submit' />") 
print("</form") 
print("</body></html>")
