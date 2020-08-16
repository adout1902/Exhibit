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
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="viewer.js"></script>
    <link rel="stylesheet" href="cardView.css">
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



