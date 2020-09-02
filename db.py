import json
from datetime import date
# import fcntl 


# try:
#     fcntl.flock(open("TemplatesDB.json", "w"), fcntl.LOCK_EX | fcntl.LOCK_NB)
# except IOError:
#     print ("can't immediately write-lock the file ($!), blocking ...")
# else:
#     print ("No error")

def write_json(data, filename): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4)


def addTemplate(title,creators,img,templateContents):
    #to do: lock file for writing 
    f = open("ExhibitDB.json")
    data = json.load(f)
    
    systemData = data["systemData"]
    noTemplates = systemData["noTemplates"]
    noTemplates = noTemplates +1
    systemData["noTemplates"] = noTemplates
    write_json(data, "ExhibitDB.json")
    tempID = str(noTemplates)
    today = date.today()
    lastUpdated = today.strftime("%d/%m/%Y")
    f.close()
    
    
    f = open("TemplatesDB.json")
    data = json.load(f)
    f.close()
    templates = data["templates"]
    templates[tempID] = {"title":title,"creators":creators,"templateImg":img, "lastUpdated": lastUpdated,"comments":[]}
    contents = data["contents"]
    contents[tempID] = templateContents
    write_json(data, "TemplatesDB.json")

addTemplate("test3",["Dika"],"test3Template.PNG",{"title":"test3","backgroundColour":"blue","items":[
                {
                    "id": "title",
                    "top": "0px",
                    "left": "0px",
                    "width": "1396.36px",
                    "height": "100px",
                    "borderWidth": "5px",
                    "padding": "0px",
                    "textAlign": "center",
                    "shadow": "none",
                    "z": "auto",
                    "borderStyle": "solid",
                    "borderColour": "rgb(0, 0, 0)",
                    "backgroundColour": "rgba(0, 0, 0, 0)"
                },
                {
                    "id": "textbox1",
                    "top": "300px",
                    "left": "100px",
                    "width": "500px",
                    "height": "200px",
                    "borderWidth": "10px",
                    "padding": "0px",
                    "textAlign": "start",
                    "shadow": "none",
                    "z": "1",
                    "borderStyle": "solid",
                    "borderColour": "rgb(0, 0, 0)",
                    "backgroundColour": "rgb(255, 255, 255)"
                },
                {
                    "id": "image1",
                    "top": "186px",
                    "left": "862px",
                    "width": "324px",
                    "height": "244px",
                    "borderWidth": "10px",
                    "padding": "0px",
                    "textAlign": "center",
                    "shadow": "none",
                    "z": "1",
                    "borderStyle": "solid",
                    "borderColour": "rgb(0, 0, 0)",
                    "backgroundColour": "rgb(255, 255, 255)"
                }
            ]
        }
    )



def templateCards():
    f = open("TemplatesDB.json")

    data = json.load(f)

    f.close()

    templates = data['templates']
    for template in templates:
        templateCard = templates[template]
        print("name: %s" % templateCard["title"])
        print("creators: %s" % ", ".join(templateCard["creators"]))
        print("last updated: %s" % templateCard["lastUpdated"])


templateCards()

