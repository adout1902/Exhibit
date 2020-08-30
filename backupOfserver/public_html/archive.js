window.onload = function () {
    var noImgs = 12;
    console.log("Number of images in archive: " + noImgs);

    for(var i = 1; i <= noImgs; i++) {
        createThumbnail(i);
    }

    var ws = document.getElementById("workspace");
    ws.style.display = "flex";
    ws.style.flexWrap = "wrap";
    ws.style.width = "1200px";
    ws.style.height = "500px";

    editThumbs();
    //editImgs();

    /*
    var json_div = document.createElement("div");
    json_div.id = "json-div";
    json_div.style.width = "500px";
    json_div.style.height = "500px";
    json_div.style.position = "absolute";
    json_div.style.top = "700px";
    json_div.style.left = "450px";
    json_div.style.border = "5px solid green";
    json_div.textContent = "This is where the json contents will be read to.";

    document.body.appendChild(json_div);
    */

};

function createThumbnail(num) {

    console.log("Creating thumbnail " + num);
    var t = document.createElement("div");
    t.id = "thumbnail" + num;
    t.className = "thumbs";
    //t.textContent = "Thumbnail " + num;

    t.style.borderStyle = "solid";
    t.style.borderColor = "hotPink";
    t.style.borderWidth = "5px";
    t.style.padding = "10px";
    t.style.margin = "10px";

    var c = document.createElement("p");
    c.id = "contributor" + num;
    c.className = "cons";
    c.textContent = "Contributor: " + num;
    c.style.display = "none";

    var i = document.createElement("img");
    i.id = "img" + num;
    i.className = "imgs";
    i.onmouseover = function() {
        c_id = "contributor" + this.id.charAt(this.id.length - 1);
        console.log("The c_id is " + c_id);
        document.getElementById(c_id).style.display = "block";
    }
    i.onmouseout = function() {
        c_id = "contributor" + this.id.charAt(this.id.length - 1);
        console.log("The c_id is " + c_id);
        document.getElementById(c_id).style.display = "none";
    }

    i.style.width = "50px";
    i.style.height = "50px";

    i.style.minWidth = 50 + "%"
    i.style.minHeight = 50 + "%";
    i.src = "http://13.59.167.42/images/"+num+".jpeg";
    i.alt = "exhibit content";

    t.appendChild(c);
    t.appendChild(i);
    document.getElementById("workspace").appendChild(t);

}

function showDCMI(num) {
    var id = "contributor"+num;
    document.getElementById(id).style.display = "block";
}

function hideDCMI(num) {
    var id = "contributor"+num;
    document.getElementById(id).style.display = "none";
}

/* separate function makes sure they're all even */
function editThumbs() {
    var t = document.getElementsByClassName("thumbs");
    for (var i = 0; i < t.length; i++) {
        t[i].style.backgroundColor = "white";
        t[i].style.minWidth = t.length + "%";
        t[i].style.flex = "1 1 auto";
    }   
}