#!/usr/bin/python3
# Import Basic OS functions
import os
# Import modules for CGI handling
import cgi, cgitb, jinja2
import urllib.request

# enable debugging
cgitb.enable()
# print content type
print("Content-type:text/html\r\n\r\n")


# HTML INPUT FORM
HTML = """
<html>
<head>
<title></title>
</head>
<body>

  <h1>Upload File</h1>
  <form action="index.html" method="POST" enctype="multipart/form-data">
    File: <input name="file" type="file">
    <input name="submit" type="submit">
</form>

{% if filedata %}

<blockquote>

{{filedata}}

</blockquote>

{% endif %}

</body>
</html>
"""


inFileData = None

form = cgi.FieldStorage()

UPLOAD_DIR='public_html/uploads'

# IF A FILE WAS UPLOADED (name=file) we can find it here.
if "file" in form:
    form_file = form['file']
    # form_file is now a file object in python
    if form_file.filename:

        uploaded_file_path = os.path.join(UPLOAD_DIR, os.path.basename(form_file.filename))
        with open(uploaded_file_path, 'wb') as fout:
            # read the file in chunks as long as there is data
            while True:
                chunk = form_file.file.read(100000)
                if not chunk:
                    break
                # write the file content on a file on the hdd
                fout.write(chunk)

        # load the written file to display it
        with open(uploaded_file_path, 'r') as fin:
            inFileData = ""
            for line in fin:
                inFileData += line


headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}

print(jinja2.Environment().from_string(HTML).render(filedata=inFileData))
