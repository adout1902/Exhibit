import json
import cgi
import os

print("Content-type: text/html")
print("")

def write_json(data, filename='testTemplate.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4)


f = open("testTemplate.json")

data = json.load(f)

temp = data["templates"]

y = {"title": "The Troubles",
            "backgroundColor": "green",
            "noImages":1,
            "noTextboxes": 2,
            "images":[{"id":"image1", "top":"100px", "left":"100px","height":"200px","width":"200px"}],
            "textboxes":[{"id":"textbox1", "top":"300px", "left":"100px","height":"200px","width":"500px", "backgroundColor":"black"},{"id":"textbox2", "top":"600px", "left":"100px","height":"200px","width":"500px",  "backgroundColor":"black"}]
}

name = "troubles"

temp[name]=y

write_json(data)

f.close()


template = json.dumps(data['F1'])


print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://docs.google.com/uc?export=download&id=1YaMQTnETCfbdaCHuK4WmolaL2SgpryCD">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<script>
var data ="""+template+"""
document.body.style.backgroundColor = data.backgroundColor
    document.getElementById("workspace").innerHTML=`<h1> ${data.title}<h1>
    ${data.images.map(makeDiv).join("")}
    ${data.textboxes.map(makeDiv).join("")}
    `

function makeDiv(div) {
    return `
    <div style="position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">

    </div>

    `
}
</script>


</body>
"""
)