$(document).ready(function(){
    // Activate Carousel
    // $("#exhibitCarousel").carousel();
      
      
    // // Enable Carousel Controls
    // $(".left").click(function(){
    //   $("#exhibitCarousel").carousel("prev");
    // });
    // $(".right").click(function(){
    //   $("#exhibitCarousel").carousel("next");
    // });

    
    $('#search').keyup(function (){
      $('.card').removeClass('d-none');
      var filter = $(this).val(); // get the value of the input, which we filter on
      $('.card-deck').find('.card .card-body h5:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
  })

    
});