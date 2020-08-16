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
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
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



