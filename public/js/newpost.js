var fileInput =  document.querySelector("#id_photo");
fileInput.addEventListener('change', handImage);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

function handImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
         var img = new Image();
         img.onload = function(){
             canvas.width = 300;
             canvas.height = 300;
             ctx.drawImage(img,0,0,300,300);
         };
         img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}