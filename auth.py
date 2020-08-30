import sqlite3
from sqlite3 import Error
import json

with sqlite3.connect("Users.db") as db:
    cursor = db.cursor()
    
find = ("select creators from templates where id = 1;")

cursor.execute(find)
result = cursor.fetchone()
creators =  (result[0])
creators=creators.split(",")
username = input("Enter your username")

if username in creators:
    print("allowed")

else:
    print("not")

#         cursor.execute(addTemplate,[(name),(creator)])
# db.commit()

