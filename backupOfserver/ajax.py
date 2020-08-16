#!/usr/bin/python3
import cgi,os



print("Content-type: text/html")
print("")


form = cgi.FieldStorage()

name = ""

#for reference
pathName = "/home/ubuntu/uploads/"

if 'uploadFile' in form and form['uploadFile'].filename:
    print (form['uploadFile'].value)
    fn = os.path.basename(form['uploadFile'].filename)
    name = fn
    open('/home/ubuntu/uploads/' + fn, 'wb').write(form['uploadFile'].file.read())     
else:
    print ('no file')



print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<img src="/home/ubuntu/uploads/"""+name+"""\">
</body>
"""
)