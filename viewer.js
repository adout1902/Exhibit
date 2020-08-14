$(document).ready(function(){
    // Activate Carousel
    $("#exhibitCarousel").carousel();
      
      
    // Enable Carousel Controls
    $(".left").click(function(){
      $("#exhibitCarousel").carousel("prev");
    });
    $(".right").click(function(){
      $("#exhibitCarousel").carousel("next");
    });


    
  });