#!/usr/bin/python3
import cgi,cgitb,os

print("Content-type: text/html")
print("")

# create instance of field storage
form = cgi.FieldStorage()

# get data from fields
text = form.getvalue('uploadFile')
name = ""

""" if 'uploadFile' in form and form['uploadFile'].filename:
    print (form['uploadFile'].value)
    fn = os.path.basename(form['uploadFile'].filename)
    name = fn
    open('/~ubuntu/uploads/' + fn, 'wb').write(form['uploadFile'].file.read())     
else:
    print ('no file') """



print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<p>"""+text+"""</p>
<!--<img src='/~ubuntu/uploads/"""+name+"""'>-->
</body>
""")