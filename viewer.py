import json

f = open("testTemplate.json")

data = json.load(f)

exhibits = json.dumps(data['exhibits'])

testViewer = open("testViewer.html","w")

testViewer.write("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="viewer.js"></script>
    <link rel="stylesheet" href="viewer.css">
    <title>Document</title>
</head>
<body>
<div class="container" >
        <div id="exhibitCarousel" class="carousel slide">

      
          <!-- Wrapper for slides -->
          <div  id="workspace" class="carousel-inner" role="listbox" style=" width:100%; height: 800px !important;">
        
          </div>
      
          <!-- Left and right controls -->
          <a class="left carousel-control" href="#exhibitCarousel" role="button">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#exhibitCarousel" role="button">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
<script>
var data ="""+exhibits+"""

var count = 0;
for (key in data){
        
    exhibit = data[key]
    console.log(exhibit)

    var workspace = document.getElementById("workspace")
    workspace.innerHTML+=(makeItem(exhibit))

    count++;

}

function makeItem(exhibit) {
    if (count==0){
        return `
        <div class="item active">
            <img src="${exhibit.coverImg}" width="625px" height="500px">
            <div class="carousel-caption">
                <a href=${exhibit.title}.html">${exhibit.title}</a><br>
                made by <a href="">${exhibit.creator}</a>
                <p>${exhibit.description}</p>
            </div>

        </div>

    `

    }

    else {
        return `
        <div class="item">
                <img src="${exhibit.coverImg}" width="625px" height="500px">
                <div class="carousel-caption">
                    <a href=${exhibit.title}.html">${exhibit.title}</a><br>
                    made by <a href="">${exhibit.creator}</a>
                    <p>${exhibit.description}</p>
                </div>
        </div>
    `}
}
</script>


</body>
"""
)



