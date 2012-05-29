$(document).ready(function(){
  $('form').submit(function(e){
    e.preventDefault();
    var emailVal = $('input.email').attr('value');
    if(emailVal.match(/^[A-Z0-9]+@[A-Z0-9]+\.[A-Z0-9]+/i)){
      var formData = $(this).serialize();
      $.post('/signup', formData, function(data, textStatus, jqXHR){
        console.log(data);
        if(data.success == true){
          $('.error').hide();
          $('.signup').html('<h3>Thank you for giving us your email! We\'ll let you know when we\'ve launched.</h3>');
        } else {
          $('.error').text('Something went wrong. Please try again.');
        };
      }, 'json');
     }else{
       $('.error').text('Please enter a valid email address');
     };
  });


 $('.toggle-btn').toggle(function(e){
    e.preventDefault();
    $(this).siblings('.dropdown').show();
 }, function(e){
    e.preventDefault();
    $(this).siblings('.dropdown').hide();
 });

  $('.carousel').carousel({
    interval: false
  });
});
