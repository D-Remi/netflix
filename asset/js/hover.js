var play = $(".video").hover( hoverVideo, hideVideo );
var lecteur = $(".video").hover( hoverlecteur);

function hoverVideo(e) {  
    $('video', this).get(0).play(); 
}

function hideVideo(e) {
    $('video', this).get(0).pause(); 
}

function hoverlecteur(){
    $('video', this).hover()
}