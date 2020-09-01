import json
import sqlite3

with sqlite3.connect("Users.db") as db:
    cursor = db.cursor()

getTemplates = ("select * from templates;")
cursor.execute(getTemplates)

templates = str(cursor.fetchall())
string = "hello"

print()
print("Content-type: text/html")
print("")

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="../viewer.js"></script>
    <title>Document</title>
</head>
<body>

 <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand">Welcome, Aa'isha</a>
        <button id="refresh">refresh</button>
        <form class="form-inline">
          <input class="form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search">
          <!-- <button class="btn btn-outline-success my-2 my-sm-0 submit" type="submit">Search</button> -->
        </form>
    </nav>
    
    <div class="outer ml-4">
        <h1>Templates</h1>
        <div class="row justify-content-left" id="workspaceTemplates">
            
        </div> 
        <h1>Exhibits</h1>
        <div class="row justify-content-left" id="workspaceExhibits">
            
        </div>       
    
    </div>


<script>

var dataTemplates="""+templates+"""

for (row in dataTemplates){
        
    console.log(row)

    var workspaceTemplates = document.getElementById("workspaceTemplates")
    workspaceTemplates.innerHTML+=(makeTemplate(row))

}

function makeTemplate(template) {
    
        return `
        <div class="card" style=" display:inline-block; padding:10px;margin: 10px;border-radius: 10px;border-style:solid; border-width:1px; border-color:black;max-width: 20rem;" >
            <img src=${template[4]} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${template[1]}</h5>
                <h6 class="card-subtitle mb-2 text-muted">made by ${getCreators(template[2])} </h6>
                <a href="./editTemplate.py?id=${template[1]}.html" class="btn btn-primary">edit</a>
                <a href="${template[1]}.html" class="btn btn-primary">populate</a>
            </div>

        </div>

    `
}

function getCreators(string){
    var nameLinks = ""
    var names = string.split(",")
    for(name in names){
        nameLinks+= `<a href="${names[name]}.html">${names[name]}</a>,`
    }
    console.log(nameLinks)
    return nameLinks
}

</script>
</body>
"""
)

# print(templates[0][0]) #id
# print(templates[0][1]) #name of template
# print(templates[0][2]) #creators
# print(templates[0][3]) #contents
# print(templates[0][4]) #cover image

