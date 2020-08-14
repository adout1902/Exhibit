#!/usr/bin/python3
import cgi,os
import stat


print("Content-type: text/html")
print("")


form = cgi.FieldStorage()

name = ""

if 'uploadFile' in form and form['uploadFile'].filename:
    print (form['uploadFile'].value)
    fn = os.path.basename(form['uploadFile'].filename)
    name = fn
    open('./' + fn, 'wb').write(form['uploadFile'].file.read())     
else:
    print ('no file')

os.chmod('./'+name, stat.S_IXUSR)


print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<img src="./"""+name+"""\">
</body>
"""
)