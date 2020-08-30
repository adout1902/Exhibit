#!/usr/bin/python3

import cgitb
import cgi

form = cgi.FieldStorage()


print("Content-type: text/html")
print("")

name = form.getvalue("name") 

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

    <div id="outer">  
        <div id="inner"><img src="https://drive.google.com/uc?export=view&id=1UNKeZz9mKnPNJ_HMAvDr4s6RFFmeILCR" alt="you have been robbed of the pleasure of seeing RG due to technical issues" ></div>
    </div>

    
    <audio autoplay loop>
        <source src="https://docs.google.com/uc?export=download&id=15k7WLg3Q8dLG5IbgnN8eiibZfdHShpg9">
    </audio>
""")
print("<p id=\"spinner\">Welcome to the official Grosjean fansite, "+name+"!</p>")

print("""   
    <div class="scroll-left">
        <p>Car number: 8... Fastest laps: 1 ... Podiums: 10... Hearts stolen: numerous... </p>
    </div>

    
</body>
</html>"""
)