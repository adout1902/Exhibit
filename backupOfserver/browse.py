#!/usr/bin/python3

import json
import cgi
import os
from http import cookies

fs = cgi.FieldStorage()
username = fs.getvalue("username")

f = open("/home/ubuntu/json/TemplatesDB.json")
data = json.load(f)
f.close()

# added by ceara
ef = open("/home/ubuntu/json/aTest.json")
exhibitData = json.load(ef)
ef.close()

exhibits = json.dumps(exhibitData['exhibits'])
templates = json.dumps(data['templates'])

if (username is None or not username or username == "undefined" or username=="null"):
   print("Set-Cookie: username="+"no one logged in.")
else:
   print("Set-Cookie: username="+username)
print("Content-type: text/html")
print("")
#print("Cache-Control: no-cache")

if os.environ.get('HTTP_COOKIE'):
    uname = os.environ.get('HTTP_COOKIE').split("=")[1]

else:
    uname =""

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="../js/viewer.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/taggle/1.15.0/taggle.js"></script>
    <link rel="stylesheet" href="../viewer.css">
    <link rel="stylesheet" href="../css/taggle.css">

    <title>Browse</title>
</head>
<body>

 <nav class="navbar navbar-light bg-light justify-content-between fixed-top" style="height:10vh">
        <div>
		<a id="" class="navbar-brand" href="../landingPage.html">EXHIBIT</a>
        	<p style="font-size:smaller">logged in: """+uname+"""</p>
	</div>
	<div>
		<button id="refresh">refresh</button>

	</div>
		<div placeholder="" style="position:absolute;margin-left:40%" class="input textarea" id="name-filter"></div>
       
		<div id="tag-controls" style="font-size:smaller;margin-left:30%">
		<button id="add-all">all</button>
		<button id="clear-all">clear</button>
                </div>

	
	<form class="form-inline">
          	<input class="form-control mr-sm-2" id="search" type="search" placeholder="Search by title" aria-label="Search">
          <!-- <button class="btn btn-outline-success my-2 my-sm-0 submit" type="submit">Search</button> -->
        </form>
    </nav>
    
    <div class="outer ml-4" style="margin-top:5rem;">
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
	<div class="flip mb-3 show showSearch" style=" background-color:none;">
        	<div class="card shadow-sm" id="card${key}" style="background-color:none;display:inline-block; padding:10px;margin: 10px;border-radius: 10px;border-style:solid; border-width:1px; border-color:black;min-height:20rem;max-width: 20rem;" >
            		<div class="face front" style="background-color:none;">
				<div class="img-container" style="margin-right:1.25rem;">
                			<img src="${template.templateImg}" class="card-img-top template-pic" style="border-style:solid;border-color:#909090;border-width:.1rem;margin: 0 auto;">    
              			</div>	
	            		<div class="card-body">
                			<h5 class="card-title">${template.title}</h5>
                			<h6 class="card-subtitle mb-2 text-muted">made by <a href="">${getCreators(template.creators)}</a></h6>
					<p class="text-muted">${template.lastUpdated}</p>
					<div class="buttons" style="font-size:small, text-align:center;display: inline-block;">
						<button id="edit${key}" data-templateID="${key}" class="btn btn-primary editBttn" data-toggle="tooltip" data-placement="bottom" title="edit">
							 <svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        				<path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                       	 				</svg>  
						</button>
                				<button id="populate${key}" class="btn btn-primary editBttn"  data-toggle="tooltip" data-placement="bottom" title="populate">
							<svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-card-image" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                       					 <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        				</svg>
						</button>
						<button class="commentsBttn btn btn-success" data-toggle="tooltip" data-placement="bottom" title="view comments">
							<svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-left-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          				<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                          				<path fill-rule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                          				</svg>  
						</button>
						 <div class="dropdown" style="float:right;margin-left:.25rem;">
                          				<button class=" downloadBttn btn btn-success" data-toggle="dropdown" data-hover="tooltip" data-placement="bottom" aria-haspopup="true" title="download" aria-expanded="false">
                          					<svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          					<path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                          	  				<path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                            					</svg>
                          				</button> 
                          				<div class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton" >
                            					<a class="dropdown-item dropdown-item-style" href="../pdfs/${template.title}_${key}.pdf" download>download PDF</a>
                            					<a class="dropdown-item dropdown-item-style" href="../demoHTML/${template.title}_${key}.html" download>download HTML</a>
                          				</div>
                  	      			</div>
					</div>               
            			</div>

        		</div>
			<div class="face back"style="background-color:none;">
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
        var sep=","
	if (name == 0){
		sep = ""
	}
        
        nameLinks+= `${sep} <button value="${names[name]}" class="nameLink" type="submit">${names[name]}</button>`
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

var dataExhibits="""+exhibits+"""

for (key in dataExhibits){
        
    exhibit = dataExhibits[key]
    console.log(key,exhibit)

    var workspaceExhibits = document.getElementById("workspaceExhibits")
    workspaceExhibits.innerHTML+=(makeExhibit(key,exhibit))

}

function makeExhibit(key,exhibit) {  
	return `
		<div class="flip mb-3 show showSearch" style=" background-color:none;">
        	<div class="card shadow-sm" id="card${key}" style="background-color:none;display:inline-block; padding:10px;margin: 10px;border-radius: 10px;border-style:solid; border-width:1px; border-color:black;min-height:20rem;max-width: 20rem;" >
				<div class="face front" style="background-color:none;">
					<div class="img-container" style="margin-right:1.25rem;">
						<img src="${exhibit.coverImage}" class="card-img-top exhibit-pic" style="border-style:solid;border-color:#909090;border-width:.1rem;margin: 0 auto;">    
					</div>	
					<div class="card-body">
						<h5 class="card-title">${exhibit.title}</h5>
						<h6 class="card-subtitle mb-2 text-muted">made by <a href="">${getCreators(exhibit.creators)}</a></h6>
						<p class="text-muted">${exhibit.lastUpdated}</p>
							<div class="buttons" style="font-size:small, text-align:center;display: inline-block;">
								<button id="edit${key}" data-exhibitID="${key}" class="btn btn-primary editBttn" data-toggle="tooltip" data-placement="bottom" title="edit">
							 	<svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
								</svg>  
								</button>
								<button class="commentsBttn btn btn-success" data-toggle="tooltip" data-placement="bottom" title="view comments">
									<svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-left-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          				<path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                          				<path fill-rule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
									</svg>  
								</button>
						 	<div class="dropdown" style="float:right;margin-left:.25rem;">
								<button class=" downloadBttn btn btn-success" data-toggle="dropdown" data-hover="tooltip" data-placement="bottom" aria-haspopup="true" title="download" aria-expanded="false">
									<svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
										<path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
									</svg>
								</button> 
							<div class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton" >
									<a class="dropdown-item dropdown-item-style" href="../pdfs/${exhibit.title}_${key}.pdf" download>download PDF</a>
									<a class="dropdown-item dropdown-item-style" href="../demoHTML/${exhibit.title}_${key}.html" download>download HTML</a>
							</div>
							</div>
					</div>               
				</div>

        		</div>
			<div class="face back"style="background-color:none;">
				<div id="comments-container${key}" class="comments-container card-body" style="overflow:auto;height:12rem;margin-bottom:2rem;" >
					${getComments(key,exhibit.comments)}
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

</script>
</body>
"""
)



