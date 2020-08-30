#!/usr/bin/python3

import cgitb
import json
import cgi
import os

print("Content-type: text/html")
print("")

fs = cgi.FieldStorage()
name = fs.getvalue("name")
f = open("/home/ubuntu/templates/Templates.json")

data = json.load(f)

f.close()


templates = data["templates"]
template = json.dumps(templates[name])



print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div id="workspace" class="workspace" style="position:absolute"></div>

<script>
var data ="""+template+"""
document.body.style.backgroundColor = data.bgColor
    document.getElementById("workspace").innerHTML=`${data.items.map(makeDiv).join("")}`

function makeDiv(div) {
    return `
   <div id="${div.id}" style="position:absolute;border-style:solid; border-width:${div.borderWidth};padding:${div.padding};text-align:${div.textAlign};box-shadow:${div.shadow};z-index:${div.z};border-color:${div.borderColor};position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">

    </div>

    `
}
</script>

</body>
"""
)