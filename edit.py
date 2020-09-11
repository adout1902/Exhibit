#!/usr/bin/python3

import cgi
import json

fs = cgi.FieldStorage()
mode = fs.getvalue("mode")

if mode == "new":
    templateID = 0

elif mode == "edit":
    templateID = fs.getvalue("templateID")
else:
    templateID = 0

print("Content-type: text/html")
print("")

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Editor</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js" integrity="sha512-s/XK4vYVXTGeUSv4bRPOuxSDmDlTedEpMEcAQk0t/FMd9V6ft8iXdwSBxV0eD60c6w/tjotSlKu9J2AAW1ckTA==" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
    <script src="../js/templateEditor.js"></script>
    <link rel="stylesheet" href="../jQueryVsn.css">
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</head>
<body onload="setup("""+str(templateID)+""")" id="body">


    <div id="edit-menu" class="overlay">

        <!-- Button to close the overlay navigation -->
        <!-- Overlay content -->
        <!-- remove inline -->
        <button onclick="closeEditMenu()" class="fab" id="closeBtn">X</button>
        <div class="overlay-content">

            <div class="edit-panel card">
                <div>
                    <p><b>change height:</b></p>
                    <input type="text" id="input-height">
                    <button id="set-height">set</button>
                </div>
                <div>
                    <p><b>change width:</b></p>
                    <input type="text" id="input-width">
                    <button id="set-width">set</button>
                </div>
            </div>
            <div class="edit-panel card"><p><b>change border width:</b></p>
                <div class="slidecontainer"><input type="range" min="0" max="50" value="25" class="slider" id="border-width"></div>
                or enter exact pixel width: 
                <div>
                    <input type="text" id="input-bwidth">
                    <button type="button" id="set-bwidth-btn">set</button>
                </div>
            </div>
            
            <div class="edit-panel card text-only"><p><b>change padding:</b> </p>
                top and bottom text padding
                <div class="slidecontainer"><input type="range" min="0" max="100" value="0" class="slider" id="text-padding-top"></div>
                left text padding
                <div class="slidecontainer"><input type="range" min="0" max="100" value="0" class="slider" id="text-padding-left"></div>
                right text padding
                <div class="slidecontainer"><input type="range" min="0" max="100" value="0" class="slider" id="text-padding-right"></div>
                or enter exact pixel width: 
                <div>
                    <input type="text" id="input-padding">
                    <button type="button" id="set-padding-btn">set</button>
                </div>
            </div>
            
        
            <div class="edit-panel card text-only"><p><b>align text:</b></p>
                <input type="radio" id="left" value="left" name="text-alignment">
                <label for="left">left</label><br>

                <input type="radio" id="center" value="center"  name="text-alignment">
                <label for="center">center</label><br>
                
                <input type="radio" id="right" value="right"  name="text-alignment">
                <label for="right">right</label><br>
            
            </div>
            <div class="edit-panel card text-only">

                <div>
                    <p><b>change textbox background colour:</b></p>
                    <input type="color" id="textbox-color-change">
                    <button id="colour-changeBG">ok</button>
                </div>
            </div>

            <div class="edit-panel card">
                <div>
                    <p><b>change border colour:</b></p>
                    <input type="color" id="border-color-change">
                    <button id="colour-changeBorder">ok</button>
                </div>                
            </div>
              
               

            <div class="edit-panel card">
                <p><b>apply shadow:</b></p>
                <div class="slidecontainer"><input type="range" min="0" max="20" value="0" class="slider" id="shadow-width"></div>
                or enter exact pixel width: 
                <div>
                    <input type="text" id="input-swidth">
                    <button type="button" id="set-swidth-btn">Set</button>
                </div>
            </div>

            <div class="edit-panel card">
                <p><b>adjust layer:</b></p>
                <button id="add-z" class="editPanelBtn">bring item forward</button>
                <button id="sub-z" class="editPanelBtn">send item back</button>
            </div>
            
            

        
    </div>
    </div>
   

    <div  class="workspace" id="exhibit-space">

        <nav class="navbar navbar-expand-md navbar-dark" id="control-panel" style="background-color: rgb(214, 214, 212)">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <!-- <ul class="navbar-nav mr-auto"> -->
                    <!-- <li> -->
                        <button  id="undo" class="btn btn-sm btn-outline-secondary" type="button">undo</button>
                        <button  id="redo" class="btn btn-sm btn-outline-secondary" type="button">redo</button>
                    <!-- </li> -->
                    <!-- <li> -->
                        <button id="add-image" class="btn btn-sm btn-outline-secondary" type="button">add image</button>
                    <!-- </li>
                    <li> -->
                        <button id="add-text" class="btn btn-sm btn-outline-secondary" type="button">add textbox</button>
                    <!-- </li>
                    <li>              -->
                        <div class="colourPanel" style=" font-size: small; border-color: rgb(102, 100, 100); border-width: 1px; margin-left: 15px; position: relative; align-content: center;">
                            <p>select background colour:</p>
                            <input type="color" class="" id="change-bg-colour" style="height: 30px;;">
                            <button class="btn btn-sm btn-outline-secondary" type="button" style="position: relative; top: -5px;">ok</button>
                        </div>
                    <!-- </li> -->
               
                 <!-- </ul> -->
            </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                    <li>
                        <button id="save-modal" class="btn btn-sm btn-outline-secondary" type="button">save template</button>
                    </li>
                    <li>
                        <button id="render" class="btn btn-sm btn-outline-secondary" type="button">render template</button>
                    </li>
                    <li>
                        <button id="populate" class="btn btn-sm btn-outline-secondary" type="button">populate template</button>
                    </li>
                    <li>
                        <button id="browse" class="btn btn-sm btn-outline-secondary" type="button">browse</button>  
                    </li>

                </ul>
            </div>

        </nav>
    </div>

       <div id="modal-background"></div>
    <div id="modal-content">
        <label for="filename"><b>Enter the template name:</b></label>
        <input type="text" id="filename" name="filename">
        <label for="creator"><b>Enter your name:</b></label>
        <input type="text" id="creator" name="creator">
        <!-- <div class="input-group" id="collab">
            <label for="collab"><b>Add collaborators (these users will be able to edit the exhibit):</b></label>
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input list="user-list" id="collab-input" name= "collab"  class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            <datalist id="user-list">
                <option value=""></option>
            </datalist>
                    
            <div class="input-group-append">
                <button id="add-user">add</button>
            </div>
          </div>
          Allowed to edit: <span style="font-size: small;" id="display-collab"></span> -->
            <div id="modal-buttons">
                <button id="save-template">save</button>
		<button id="modal-close">close</button>
            </div>
            
    </div>
     
</body>
</html>
""")
