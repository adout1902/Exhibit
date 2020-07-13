import xml.etree.ElementTree as ET 
import cgi 

print ("Content-Type: text/html")
print()


tree = ET.parse("drivers.xml")
root = tree.getroot()
for x in root.findall('driver'):
    name =x.find('name').text
    image = x.find('price').text
    print("<img src=\""+image+"\">")
    print("<p>"+name+"</p>")






