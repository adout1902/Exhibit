#!/usr/bin/python3


import json
import cgi
import os

print("Content-type: text/html")
print("")

def write_json(data, filename="/testTemplate.json"): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4)

f = open("/testTemplate.json")

data = json.load(f)

temp = data["templates"]

fs = cgi.FieldStorage()

d = {"name":fs.getvalue("filename"), "contents":json.loads(fs.getvalue("contents"))}

temp[d["name"]] = d["contents"]

write_json(data)

f.close()