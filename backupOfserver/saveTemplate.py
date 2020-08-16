#!/usr/bin/python3


import json
import cgi
import os
import base64

print("Content-type: text/html")
print("")

def write_json(data, filename="/home/ubuntu/templates/Templates.json"): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4)

f = open("/home/ubuntu/templates/Templates.json")

data = json.load(f)

temp = data["templates"]

fs = cgi.FieldStorage()



d = {"name":fs.getvalue("filename"), "contents":json.loads(fs.getvalue("contents")), "templateImg":fs.getvalue("templateImg")}

templateImg = base64.b64decode((d["templateImg"]).split(',')[1])

filename =d["name"]+"template.jpg"



with open(filename, 'wb') as file:
        file.write(templateImg)

contents = d["contents"]
contents["templateImg"] = filename

temp[d["name"]] = d["contents"]

write_json(data)

f.close()