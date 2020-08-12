import sys
import json
import cgi

fs = cgi.FieldStorage()

f = open("template.txt", "w")

f.write("Content-Type: application/json")

f.write("\n")
f.write("\n")


result = {}
result['success'] = True
result['message'] = "Saved successfully"
result['keys'] = ",".join(fs.keys())

d = {}
for k in fs.keys():
    d[k] = fs.getvalue(k)

result['data'] = d

f.write(json.dumps(result,indent=1))
f.write("\n")

f.close()