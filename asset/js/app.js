let bigscreen;
let lines;
let $bigscreen = $('body .container .bigscreen');
let $bsvideo = $('video.video',$bigscreen);
let bsVideoPaused = false;

$(function(){
    $.getJSON(
        'asset/videos.json',
        function (data) {
            bigscreen = data.shift();
            lines = data;
            updateVideos()
            $(window).on('scroll',function (){
               if($(window).scrollTop() > $(window).width() * 0.5625 /2 && !bsVideoPaused){
                   bsVideoPaused = true; $bsvideo[0].pause();
               } else if($(window).scrollTop() < $(window).width() * 0.1  && bsVideoPaused){
                   bsVideoPaused = false; $bsvideo[0].play();
               }
            });
        }
    )
});

function updateVideos(){
    $bigscreen.css({background : `url('${bigscreen.vignette} ') no-repeat center/cover`, opacity: '1'})

    $('source', $bsvideo).attr('src',bigscreen.trailer);
    $bsvideo[0].load();
    $bsvideo.on('pause',function(){ $bsvideo.removeClass('show'); });
    $bsvideo.on('play',function(){ $bsvideo.addClass('show'); });
};

