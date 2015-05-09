function myAlert(msg, type) {
    var ale = document.getElementById('alert');
    ale.innerHTML = ale.innerHTML + msg;
    ale.style.display = "block";
    if (type && type == "auto") {
        setTimeout(function() {
            ale.style.display = "none";
        }, 5000);
    }
}

function alertClose() {
    var ale = document.getElementById('alert');
    ale.style.display = "none";
}