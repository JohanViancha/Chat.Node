// guardamos nombre de usuario y sexo en localStorage
window.onload = function(){
    document.querySelector('#send-form')
        .addEventListener('click', function(e){

            localStorage.username = document.querySelector('#username').value;
            localStorage.color = newColor();
        })

     
}


function newColor() {
    const hBase = Math.random();
    const newH = Math.floor(hBase * 360);
    const newL = Math.floor(Math.random() * 16) + 75;
    
    return `hsl(${newH}, 100%, ${newL}%)
    ` }