// guardamos nombre de usuario y sexo en localStorage
window.onload = function(){
    document.querySelector('#send-form')
        .addEventListener('click', function(e){

            localStorage.username = document.querySelector('#username').value;
            localStorage.color = getRandomColor();
        })

     
}

var colores=[];

function getRandomColor() {
    var num=(Math.floor(Math.random()*4)*4).toString(16);
    var letters = ['0','F',num];
    var color = '#';
    
    for (var i = 0; i < 3; i++ ) {
        let pos=Math.floor(Math.random() * letters.length);
        color += letters[pos];
        letters.splice(pos,1);
    }

    return color;
}