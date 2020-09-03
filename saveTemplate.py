#!/usr/bin/python3

import json
import portalocker
from datetime import date
import cgi
import os
import base64
import sqlite3

print("Content-type: text/html")
print("")


def addTemplate(title,creators,img,templateContents):
    #update system record
    with open("/home/ubuntu/json/ExhibitDB.json", 'r') as f:
        #portalocker.lock(f, portalocker.LOCK_EX)
        data = json.load(f)
    print("data loaded")
    systemData = data["systemData"]
    noTemplates = systemData["noTemplates"]
    noTemplates = noTemplates +1
    systemData["noTemplates"] = noTemplates
    with open("/home/ubuntu/json/ExhibitDB.json", 'w') as f:
        portalocker.lock(f, portalocker.LOCK_EX)
        json.dump(data,f,indent=4)
        print("data written")

    tempID = str(noTemplates)
    today = date.today()
    lastUpdated = today.strftime("%d/%m/%Y")
    
    #save template preview image

    templateImg = base64.b64decode((img).split(',')[1])
    filename ="../templateScreenshots/"+title+"_"+tempID+"Template.jpg"
    with open(filename, 'wb') as file:
        file.write(templateImg)


    #save template  
    with open("/home/ubuntu/json/TemplatesDB.json", 'r') as f:
        data = json.load(f)
        templates = data["templates"]
    templates[tempID] = {"title":title,"creators":creators,"templateImg":filename, "lastUpdated": lastUpdated,"comments":[]}
    contents = data["contents"]
    contents[tempID] = templateContents
    with open("/home/ubuntu/json/TemplatesDB.json", 'w') as f:
        portalocker.lock(f, portalocker.LOCK_EX)
        json.dump(data,f,indent=4)
        print("data written")

#retrieve data from ajax post
fs = cgi.FieldStorage()
name = fs.getvalue("filename")
creators = fs.getvalue("creators")
contents = json.loads(fs.getvalue("contents"))
templateImg = fs.getvalue("templateImg")

addTemplate(name,creators,templateImg,contents)




#def saveToDB():
 #   with sqlite3.connect("/home/ubuntu/Users.db") as db:
  #      cursor = db.cursor()
   #     addTemplate = ("INSERT INTO templates(name,creators,contents,templateImg) VALUES(?,?,?,?)")
    #    cursor.execute(addTemplate,[(name),(creators),(json.dumps(contents)),(filename)])
     #   db.commit()

#saveToDB()
        

    