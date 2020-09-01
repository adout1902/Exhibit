$(document).ready(function(){
    
   var workspace = document.getElementById("workspace")
   var download = $("#download")

   download.click(function(){
    // html2canvas(workspace,{
    //     onrendered:function(canvas){
    //     var imgData = canvas.toDataURL("image/jpeg", 1.0);
    //     var pdf = new jsPDF('p', 'mm', [400, 480]);
    //     pdf.addImage(imgData, 'JPEG', 0, 0, 400, 480);
    //     pdf.save("screen-3.pdf");
    //     }
     
    //     });

    kendo.drawing
    .drawDOM("#workspace", 
    { 
        paperSize: "A4",
        margin: { top: "1cm", bottom: "1cm" },
        scale: 0.8,
        height: 500
    })
        .then(function(group){
        kendo.drawing.pdf.saveAs(group, "Exported.pdf")
    });


    
   })

    
  
});