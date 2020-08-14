import json

f = open("testTemplate.json")

data = json.load(f)

exhibits = json.dumps(data['exhibits'])

testViewer = open("testCards.html","w")

testViewer.write("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="viewer.js"></script>
    <link rel="stylesheet" href="cardView.css">
    <title>Document</title>
</head>
<body>
<div class="container mt-4" style="padding-top:100px">
  <div class="row justify-content-left" id="workspace">
     
  </div>
</div>

<script>
var data ="""+exhibits+"""

for (key in data){
        
    exhibit = data[key]
    console.log(exhibit)

    var workspace = document.getElementById("workspace")
    workspace.innerHTML+=(makeItem(exhibit))

}

function makeItem(exhibit) {
    
        return `
        <div class="card" style=" display:inline-block; padding:10px;margin: 10px;border-radius: 10px;border-style:solid; border-width:1px; border-color:black;max-width: 40rem;" >
            <img src="${exhibit.coverImg}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${exhibit.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">made by <a href="">${exhibit.creator}</a></h6>
                <p class="card-text overflow-auto">${exhibit.description}</p>
                <a href="${exhibit.title}.html" class="btn btn-primary">view</a>
            </div>

        </div>

    `


}
</script>


</body>
"""
)



