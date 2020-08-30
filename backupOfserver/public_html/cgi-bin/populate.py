#!/usr/bin/python3

import cgitb
import json
import cgi
import os

print("Content-type: text/html")
print("")

fs = cgi.FieldStorage()
name = fs.getvalue("name")
f = open("/home/ubuntu/templates/Templates.json")

data = json.load(f)

f.close()

templates = data["templates"]
template = json.dumps(templates[name])

print("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div id="workspace" class="workspace" style="position:absolute"></div>

<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>
<script>

/* ========== HEADER AND IMAGE TRAY CODE ========== */
/* ========== HEADER DIV CODE ========== */

// creating the header element to store save button
var header = document.createElement("div");
header.id = "header";

// creating the save button
var saveBtn = document.createElement("button");
saveBtn.id = "save-button";
saveBtn.textContent = "Save";

// style the save button
saveBtn.style.margin = "10px";
saveBtn.style.position = "absolute";
saveBtn.style.top = 0;
saveBtn.style.right = 0;
saveBtn.onclick = saveExhibit;

// create a button to display the tray (add to header)
trayBtn = document.createElement("button");
trayBtn.textContent = "Show Tray";
trayBtn.onclick = showTray;

trayBtn.style.margin = "10px";
trayBtn.style.position = "absolute";
trayBtn.style.top = "0px";
trayBtn.style.right = "50px";

// add the save button to the header div
header.appendChild(saveBtn);
header.appendChild(trayBtn);

// add the header to the body tag
document.body.appendChild(header);

/* ========== IMAGE TRAY CODE ========== */

// creating the image tray element to store archive images
var tray = document.createElement("div");
tray.id = "tray";
tray.textContent = "This is the tray element";

// styling the tray for testing
tray.style.backgroundColor = "pink";
tray.style.width = "100%";
tray.style.height = "450px";
tray.style.position = "absolute";
tray.style.top = "500px";
tray.style.left = "0px";
tray.style.zIndex = "9999";
tray.style.display = "none";

// close button for tray
var trayCloseBtn = document.createElement("button");
trayCloseBtn.id = "tray-close-btn";
trayCloseBtn.textContent = "X";
trayCloseBtn.style.margin = "10px";2
trayCloseBtn.style.position = "absolute";
trayCloseBtn.style.top = "0";
trayCloseBtn.style.right = "0";
trayCloseBtn.onclick = showTray;

tray.appendChild(trayCloseBtn);

// add the tray to the document body
document.body.appendChild(tray);

console.log("Loading the page...");
var data ="""+template+"""
document.body.style.backgroundColor = data.bgColor

// create the template

document.getElementById("workspace").innerHTML=`${data.items.map(makeDiv).join("")}`

function makeDiv(div) {
    return `
    <div id="${div.id}" style="position:absolute;border-style:solid; border-width:${div.borderWidth};padding:${div.padding};text-align:${div.textAlign};box-shadow:${div.shadow};z-index:${div.z};border-color:${div.borderColor};position:absolute;height:${div.height};width:${div.width};top:${div.top};left:${div.left};background-color:${div.backgroundColor}">
    <p>PlaceHolder</p>
    </div>
    `
}

//  =================== EDIT TEMPLATE ELEMENTS TO MAKE EXHIBIT ===================

/* ========== TITLE AREA CODE ========== */
// change the title div to a textarea
var title = document.getElementById("title");
title.innerHTML = editTitle("title");
var titleArea = document.getElementById("titleArea");
titleArea.style.backgroundColor = title.style.backgroundColor;

// set the style of the title textarea (must match template specifications)
titleArea.style.width = "inherit";
titleArea.style.height = "inherit";
titleArea.style.borderWidth = 0;
titleArea.style.resize = "none";
titleArea.style.padding = "inherit";

// function to create new textarea for title specifically
function editTitle(titleId) {
    return `
        <textarea id="titleArea" placeHolder="Enter title..."></textarea>
    `
}

/* ========== TEXTBOX CODE ========== */

// changing all textbox divs to textareas
var noTextboxes = data.noTextboxes; // set the number of textboxes in the exhibit
for(var i = 1; i <= noTextboxes; i++) {
    
    var textboxId = "textbox"+i; // id for textarea
    
    var textbox = document.getElementById(textboxId); // storing the textbox (parent div of textarea)  
    textbox.innerHTML = addTextArea(); // changing inner HTML of parent div
    
    // alert("working");   // tracing
    
    var textArea = document.getElementById("textId"); // storing the textarea (inside div textbox)   
    textArea.id = "text-area"+i; // change textarea attrs to match template

    //textArea.style.marginBottom = textbox.style.borderWidth;
    //textArea.style.marginRight = textbox.style.borderWidth;

    // set the style of the title textarea
    textArea.style.width = "inherit";
    textArea.style.height = "inherit";
    textArea.style.top = textbox.style.top;
    textArea.style.left = textbox.style.left;
    textArea.style.borderWidth = 0;
    textArea.style.resize = "none";
    textArea.style.backgroundColor = textbox.style.backgroundColor;
    textArea.style.border = textbox.style.padding;
    textArea.style.textAlign = textbox.style.textAlign;
}

// function to create new textarea for textboxes specifically
function addTextArea() {
    return `<textarea id=textId placeHolder="Enter text..."></textarea>`
}

/* ========== IMAGE BOX CODE ========== */

// changing all image divs to allow image upload and display
var noImages = data.noImages; // set the number of image boxes in the exhibit
for(var i = 1; i <= noImages; i++) {

    var imageId = "image" + i; // id for the image
    var mainImageDiv = document.getElementById(imageId); // id for the image box (div)
    mainImageDiv.innerHTML = addImage(); // add the image to the image box
    
    // alert("working");

    // access all necessary elements
    // the image div - holds form and preview
    var imageDiv = document.getElementById("img-div");
    imageDiv.id = "img-div"+i;

    // the image form
    var imageForm = document.getElementById("input");
    imageForm.id = "input"+i;
    
    // the upload element in the form
    var imageUpload = document.getElementById("imgUpload");
    imageUpload.id = "imgUpload"+i;

    // the upload area
    var uploadDiv = document.getElementById("upload-area");
    uploadDiv.id = "upload-area"+i;
    
    // the actual image preview
    var previewDiv = document.getElementById("preview");    
    previewDiv.id = "preview"+i;

    // the image tag
    /* make image preview take up whole div */
    var imageSrc = document.getElementById("img");
    imageSrc.id = "img"+i;
    imageSrc.style.width = mainImageDiv.style.width;
    imageSrc.style.height = mainImageDiv.style.height;

    /* get menu button and edit style */
    var menuBtn = document.getElementById("menu-btn");
    menuBtn.id = "menu-btn" + i;  // create unique id
    menuBtn.onclick = createMenu(i);
    
}

// function to add the forms and preview areas to image box
function addImage() {
    return `
        <div class="img-divs" id="img-div">
            <button class=menu-btns id=menu-btn style="position:absolute;top:0;right:0;margin:10px;border-width:1px;width:40px;height:40px;background-size:100%;background-image:url('https://image.flaticon.com/icons/png/512/3/3901.png');background-repeat:no-repeat"></button>
            <!--<button class=hide onclick="hideForm(this)">Hide</button>-->
            <form id=input style="display:none" action=./cgi-bin/ajax.py method=post>
                <input id=imgUpload type=file name=uploadFile>
                <input type=submit value=Submit>
            </form>
        </div>

        <div id=upload-area>
            <div id=preview>
                <img width="100px" height="100px" alt="Image preview" src="https://via.placeholder.com/100/FFFFFF" id=img>
            </div>
        </div>
    `
}





// the save function (saves an html of the exhibit)
function saveExhibit() {
    console.log("saving exhibit...");
}

// showTray function to display tray onclick event
function showTray() {
    var t = document.getElementById("tray");
    if(t.style.display == "none") {
        t.style.display = "block";
        console.log("displaying tray");
    } else {
        t.style.display = "none";
        console.log("hiding tray");
    }
}

/* function to hide the form element after button click */
function hideForm(elem) {
    document.getElementById(elem.parentNode.id).style.display = "none";
}

function createMenu(btn_id) {
    // creating the menu
    console.log("Creating menu number " + btn_id + " for button number " + btn_id);
    var menu_id = "img-menu" + btn_id;
    if(document.getElementById(menu_id)) {
        console.log("This element already exists.");
        document.getElementById(menu_id).style.display = "block";
        return;
    }

    // add the menu background div
    var menu = document.createElement("div");
    menu.id = "img-menu" + btn_id;
    menu.style.width = "300px";
    menu.style.height = "250px";
    menu.style.position = "relative";
    menu.style.margin = "0 auto";
    menu.style.boxShadow = "0px 10px 30px darkGrey";
    menu.style.backgroundColor = "lightYellow";
    menu.style.display = "none";
    menu.style.zIndex = "9000";

    // create instructions for menu
    var title = document.createElement("p");
    title.id = "menu-title" + btn_id;
    title.textContent = "Insert image from archive or local.";
    title.style.position = "absolute";
    title.style.top = "10px";
    title.style.left = "30px";

    // create buttons for menu

    // local button
    var localBtn = document.createElement("button");
    localBtn.id = "local-btn" + btn_id;
    localBtn.textContent = "Open Local";
    localBtn.style.position = "absolute";
    localBtn.style.top = "100px";
    localBtn.style.left = "40px";
    localBtn.addEventListener('click', function(event) {
        openLocal(btn_id);
        event.preventDefault();
    });

    // archive button
    var archiveBtn = document.createElement("button");
    archiveBtn.id = "archive-btn" + btn_id;
    archiveBtn.textContent = "Open Archive";
    archiveBtn.style.position = "absolute";
    archiveBtn.style.top = "100px";
    archiveBtn.style.left = "160px";
    archiveBtn.addEventListener('click', function(event) {
        openArchive(btn_id);
        event.preventDefault();
    });

    // paragraph element for menu identifier
    var menuTitle = document.createElement("p");
    menuTitle.id = "menu-header" + btn_id;
    menuTitle.textContent = "Menu " + btn_id;

    // attach buttons to menu div
    menu.appendChild(localBtn);
    menu.appendChild(archiveBtn);
    // attach title to menu
    menu.appendChild(title);
    menu.appendChild(menuTitle)
    // attach menu to document body
    document.body.appendChild(menu);

    // change the button onclick event
    var btnChangeClick = "menu-btn" + btn_id;
    var btn = document.getElementById(btnChangeClick);
    btn.addEventListener('click', function(event) {
        showMenu(btn_id);
        event.preventDefault();
    });
}

function openLocal(btn_id) {
    var fd_id = "input"+btn_id;
    var form = document.getElementById(fd_id);
    if (form.style.display == "none") {
      form.style.display = "block";
      console.log("displaying form " + fd_id);
    } else {
      form.style.display = "none";
      console.log("hiding form " + fd_id);
    }
}

function openArchive(btn_id) {
    var menu = document.getElementById("img-menu"+btn_id);
    if(menu.style.display == "block") {
        menu.style.display = "none";
        showTray();
    }
}

function showMenu(menu_id) {
    console.log("called by button " + menu_id);
    var id = "img-menu" + menu_id;
    var menu = document.getElementById(id);
    
    if(menu.style.display == "none") {
        menu.style.display = "block";
        console.log("opening menu");
    } else {
        menu.style.display = "none";
        console.log("closing menu");
    }
}

/* ========= IMAGE UPLOAD ========= 
 upload image to server via ajax */
$.fn.ajaxForm = function(options) {
    options = $.extend({}, {
        onSubmit:function() {},
        onResponse:function(data) {}
    }, options);
    var iframeName = 'ajaxForm', $iframe = $('[name=' + iframeName + ']');
    if (!$iframe.length) {
        $iframe = $('<iframe name=' + iframeName + ' style="display:none">').appendTo('body');
    }
    return $(this).each(function() {
        var $form = $(this);
        $form
            .prop('target', iframeName)
            .prop('enctype', 'multipart/form-data')
            .prop('encoding', 'multipart/form-data')
            .submit(function(e) {
                options.onSubmit.apply($form[0]);
                $iframe.one('load', function() {
                    var iframeText = $iframe.contents().find('body').text();
                    options.onResponse.apply($form[0], [iframeText]);
                });
            });
    });
};
$('#input').ajaxForm({
    onResponse:function(data) {
        $('#output').html(data);
    }
});
// function to preview image before upload
// path name
var pathName = "/home/ubuntu/uploads/"
function readURL(input) {
    if (input.files && input.files[0]) {

        /* var loadFile = function(event) {
            var reader = new FileReader();
            reader.onload = function(){
                var output = document.getElementById('output');
                output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }; */

        var reader = new FileReader();
        
        reader.onload = function(e) {
            $('#img').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

$("#imgUpload").change(function() {
    readURL(this);
});

/* var pathName = "/home/ubuntu/uploads/"
$(function() {
    $('#uploadFile').change(function () {
        var fileName = $(this).val();
        $('#image-preview').src(pathName+fileName);
    });
}); */


</script>

</body>
</html>
"""
)