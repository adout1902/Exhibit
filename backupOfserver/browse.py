#!/usr/bin/python3
import json

f = open("/home/ubuntu/json/TemplatesDB.json")

data = json.load(f)

f.close()

#exhibits = json.dumps(data['exhibits'])
templates = json.dumps(data['templates'])

print("Content-type: text/html")
print("")

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="../js/viewer.js"></script>
    <link rel="stylesheet" href="../viewer.css">
    <title>Browse</title>
</head>
<body>

 <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand">Exhibit</a>
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

for (key in dataTemplates){
        
    template = dataTemplates[key]
    console.log(key,template)

    var workspaceTemplates = document.getElementById("workspaceTemplates")
    workspaceTemplates.innerHTML+=(makeTemplate(key,template))

}

function makeTemplate(key,template) {
    
        return `
	<div class="flip">
        	<div class="card" id="card${key}" style=" display:inline-block; padding:10px;margin: 10px;border-radius: 10px;border-style:solid; border-width:1px; border-color:black;min-height:20rem;max-width: 20rem;" >
            		<div class="face front">
				<div style="margin-right:1.25rem;">
                			<img src="${template.templateImg}" class="card-img-top" style=" margin: 0 auto;">    
              			</div>	
	            		<div class="card-body">
                			<h5 class="card-title">${template.title}</h5>
                			<h6 class="card-subtitle mb-2 text-muted">made by <a href="">${getCreators(template.creators)}</a></h6>
					<div class="buttons">
						<button id="edit${key}" data-templateID="${key}" class="btn btn-primary editBttn">edit</button>
                				<button id="populate${key}" class="btn btn-primary editBttn">populate</button>
						<button class="commentsBttn btn btn-success">comments</button>
					</div>               
            			</div>

        		</div>
			<div class="face back">
               			<div id="comments-container${key}" class="comments-container card-body" style="overflow:auto;height:12rem;margin-bottom:2rem;" >
					${getComments(key,template.comments)}
                		</div>
                		<div class="form-inline comments" style="margin-bottom:1rem;margin-left:.5rem;">
                  			<input class="comment-name form-control mr-sm-2"  type="text" style="margin-bottom:.5rem;" placeholder="name" aria-label="">
                  			<input class="comment-text form-control mr-sm-2" type="text" placeholder="comment" aria-label="">
                  			<button class="btn btn-success submit-comment" type="submit">add</button> 
                		</div>
                		<button style="margin-left:.5rem;" id="front" class="backBttn btn btn-success">back</button>
            		</div>
		</div>
	</div>
    `

}

function getCreators(creators){
    var names = creators
    var nameLinks=""
    for(name in names){
        nameLinks+= `<button class="nameLink" type="submit">${names[name]}</button> `
    }
    console.log(nameLinks)
    return nameLinks
   
}

function getComments(container,comments){
     console.log(container)
     return `${comments.map(formatComment).join("")}`
}


function formatComment(comment){
	return `<strong>${comment.username}: </strong>${comment.text}<br>`

}

//var dataExhibits = exhibits //put quotes back in 

// for (key in dataExhibits){
        
//     exhibit = dataExhibits[key]
//     console.log(exhibit)

//     var workspaceExhibits = document.getElementById("workspaceExhibits")
//     workspaceExhibits.innerHTML+=(makeExhibit(exhibit))

// }

// function makeExhibit(exhibit) {
    
//         return `
//         <div class="card" style=" display:inline-block; padding:10px;margin: 10px;border-radius: 10px;border-style:solid; border-width:1px; border-color:black;max-width: 20rem;" >
//             <img src="${exhibit.coverImg}" class="card-img-top">
//             <div class="card-body">
//                 <h5 class="card-title">${exhibit.title}</h5>
//                 <h6 class="card-subtitle mb-2 text-muted">made by <a href="">${exhibit.creator}</a></h6>
//                 <p class="card-text overflow-auto">${exhibit.description}</p>
//                 <a href="${exhibit.title}.html" class="btn btn-primary">view</a>
//             </div>

//         </div>
//     `
// }

</script>
</body>
"""
)



