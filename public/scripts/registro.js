// guardamos nombre de usuario y sexo en localStorage
window.onload = function(){
    document.querySelector('#send-form')
        .addEventListener('click', function(e){
            localStorage.username = document.querySelector('#username').value;
            localStorage.genero = document.querySelector('input[name=sex]:checked').value;
        })
}