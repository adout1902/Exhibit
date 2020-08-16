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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js" integrity="sha512-s/XK4vYVXTGeUSv4bRPOuxSDmDlTedEpMEcAQk0t/FMd9V6ft8iXdwSBxV0eD60c6w/tjotSlKu9J2AAW1ckTA==" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
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
$(document).ready(function() {
	 html2canvas(document.body, {
           onrendered: function(canvas) {
           var tempcanvas = document.createElement('canvas');
           tempcanvas.width=465;
           tempcanvas.height=524;
           var context=tempcanvas.getContext('2d');
           context.drawImage(canvas,465,40,465,524,0,0,465,524);
           var link=document.createElement("a");
           link.href=canvas.toDataURL('image/jpg');
           link.download = 'screenshot.jpg';
           link.click();
           
            
           }
         });

});

</script>

</body>
"""
)