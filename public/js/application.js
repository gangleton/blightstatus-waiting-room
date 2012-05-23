$(document).ready(function(){
  $('form').submit(function(e){
    e.preventDefault();
    var emailVal = $('input.email').attr('value');
    if(emailVal.match(/^[A-Z0-9]+@[A-Z0-9]+\.[A-Z0-9]+/i)){
      var formData = $(this).serialize();
      $.post('/signup', formData, function(data, textStatus, jqXHR){
        console.log(data);
        if(data.success == true){
          $('.signup').html('<h3>Thank you for giving us your email! We\'ll let you know when we\'ve launched.</h3>');
        } else {
          $('.errors').text('Something went wrong. Please try again.');
        };
      }, 'json');
     }else{
       $('.errors').text('Please enter a valid email address');
     };
  });
});
