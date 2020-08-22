#!/usr/bin/python3

import sqlite3

with sqlite3.connect("Users.db") as db:
    cursor = db.cursor()

cursor.execute("""
INSERT INTO user(username,password)
VALUES("Aa'isha","aaisha")
""")
db.commit()

cursor.execute("SELECT * FROM user")
print(cursor.fetchall())