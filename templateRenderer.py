import json
import cgi
import os

print("Content-type: text/html")
print("")


f = open("testTemplate.json")

data = json.load(f)

f.close()


template = data['F1']


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