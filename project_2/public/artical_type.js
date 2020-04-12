console.log('Hello World');

<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    $(document).ready(function(){
          $('button').click(function(){
              $.get('/getpageColumnDetails', function(data, status){
                  console.log(data);
              });
          });  
    });
