import sqlite3
from sqlite3 import Error

with sqlite3.connect("Users.db") as db:
    cursor = db.cursor()
    
find = ("select contents from templates where id = 1;")

cursor.execute(find)
result = cursor.fetchone()
contents =  (result[0])
print("blah"*100)


