let bigscreen;
let lines;
let $bigscreen = $('body .container .bigscreen');
let $bsvideo = $('video.video',$bigscreen);
let bsVideoPaused = false;
var videosMuted = true;
let $container = $('body .container');
let $vidLinesDisplay = $('.vid-lines .start-display', $container);
let $bsText = $('.bigscreen-text', $container);

$(function(){
    $.getJSON(
        'asset/videos.json',
        function (data) {
            bigscreen = data.shift();
            lines = data;
            updateVideos()
        }
    );

    $(document).on('click', function (){
        videosMuted = false;
        $('video').attr('mute',videosMuted);
        $('body .mute').addClass('hide');
    });
    $(window).on('scroll',function (){
        if($(window).scrollTop() > $(window).width() * 0.5625 /2 && !bsVideoPaused){
            bsVideoPaused = true; $bsvideo[0].pause();
            $('body header nav.nav-top').addClass('dark');
        } else if($(window).scrollTop() < $(window).width() * 0.1  && bsVideoPaused){
            bsVideoPaused = false; $bsvideo[0].play();
            $('body header nav.nav-top').removeClass('dark');
        }
    });
});

function updateVideos(){
    $bigscreen.css({background : `url('${bigscreen.vignette}') no-repeat center/cover`, opacity: '1'});

    $('source', $bsvideo).attr('src',bigscreen.trailer);
    $bsvideo[0].load();
    $bsvideo.ready(function (){
        if($(window).scrollTop() < $(window).width() * 0.5625 /2 && !bsVideoPaused){
            bsVideoPaused = true;
            $bsvideo[0].play();
        }
    });

    $bsvideo.on('pause',function(){ $bsvideo.removeClass('show'); });
    $bsvideo.on('play',function(){ $bsvideo.addClass('show'); });

    $bsText.find('.title').text(bigscreen.title);
    $bsText.find('.desc').text(bigscreen.description);

    $vidLinesDisplay.addFrames(lines);
};


