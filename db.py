#!/usr/bin/python3
import json
import fcntl 


try:
    fcntl.flock(open("TemplatesDB.json", "w"), fcntl.LOCK_EX | fcntl.LOCK_NB)
except IOError:
    print ("can't immediately write-lock the file ($!), blocking ...")
else:
    print ("No error")
f = open("TemplatesDB.json")

data = json.load(f)

f.close()

templates = data['templates']

def templateCards():
    for template in templates:
        templateCard = templates[template]
        print(templateCard["title"])


templateCards()