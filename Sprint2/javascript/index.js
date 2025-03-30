document.addEventListener('DOMContentLoaded', init);
let slideIndex = 0;
showSlide(slideIndex);

function register(){
    window.location.href = "../pages/createAccountPage.html"
}
function login(){
    window.location.href = "../pages/logInPage.html"
}

function showSlide(slideIndex) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        if (i === slideIndex) {
            slides[i].className += " active";
            slides[i].style.display = "block";
        }else {
            slides[i].style.display = "none";
        }
    }

    for (let i = 0; i < dots.length; i++) {
        if (i === slideIndex) {
            dots[i].className = "dot active";
        }else{
            dots[i].className = "dot";
        }
    }
}


function loadTemplate(fileName, id, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        if(callback){
            callback();
        }
    })
}


function init() {
    loadTemplate('../templates/homeHeader.html', 'header')
    loadTemplate('../templates/photoCarousel.html', 'carousel')
    loadTemplate('../templates/footer.html', 'footer')

}