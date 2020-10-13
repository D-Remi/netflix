$.fn.extend({
    openFrameTrailer: function () {
        $frame = $(this);
        $('body .container .vid-lines .start-display section .list div.video-frame').html('');
        position = $frame.offset().left > $(window).width() - 192 * 1.5 + 26 ? 'left' :
                   $frame.offset().left < 192 * 0.5/2 + 26 ? 'right' : 'center';
        $frame.append(`
            <div class="frame-trailer-container ${position}">
                <div class="frame-trailer" style="background: url('${$frame.data('vignette')}') no-repeat center/cover">
                </div>
                <div class="frame-content">
                    <div class="title">${$frame.data('title')}</div>
                    <div class="recom-dur">
                        <div class="recom">Recommandé à ${$frame.data('recommendation')}%</div>
                        <div class="duration">${$frame.data('duration')}</div>
                    </div>
                    <div class="desc">Description: ${$frame.data('desc')}</div>
                    <div class="genres">Genres: ${$frame.data('genres')}</div>
                </div>
            </div>
        `);
        $video = $('<video />');
        $video[0].muted = true;
        $source = $('<source />', {
            src:$frame.data('trailer-link'),
            type:"video/mp4",
        });
        $video.append($source);
        $('.frame-trailer-container .frame-trailer', $frame).append($video)
        $video[0].load();
        $video.ready(function(){
            $frame.find('.frame-trailer-container').addClass('show');
            setTimeout(function(){
                $video.addClass('show')[0].play();
            },300);
        });
    },
    closeFrameTrailer: function () {
        $frame = $(this);
        $('.frame-trailer-container .frame-trailer video', $frame).removeClass('show')[0].pause()
        $frame.find('.frame-trailer-container').removeClass('show');
    },
    addFrames: function (lines) {
        let $vidLinesDisplay = $(this);
        lines.forEach(function(line, k){
            let title = line.title;
            let videos = line.videos;
            let $section = $('<section></section>');
            $vidLinesDisplay.append($section);
            $section.append(`
                <div class="title">${title}</div>
                <div class="list custom-scrollbar"></div>
            `);
            videos.forEach(function(video, k){
                let $list = $('div.list', $section);
                let genres_text = "";
                video.genres.forEach(function(v){genres_text += v + ', ';});
                genres_text = genres_text.slice(0,-2);
                let $frame = $(`
                    <div class="video-frame" 
                        data-trailer-link="${video.trailer}" 
                        data-title="${video.title}" 
                        data-desc="${video.description}" 
                        data-recommendation="${video.recommendation}"
                        data-duration="${video.duration}"
                        data-genres="${genres_text}"
                        data-vignette="${video.vignette}"
                        style="background: url('${video.vignette}') no-repeat center/cover"
                    ></div>
                `);
                $list.append($frame);
            });
        });

        $(document).on('mouseenter','body .container .vid-lines .start-display section .list div.video-frame', function(event){
            event.stopPropagation();
            $frame = $(this).addClass('active').data('timeout',
                setTimeout(function(){
                    if($frame.is('.active:not(.opened)')){
                        $frame.addClass('opened').openFrameTrailer();
                    }
                },500)
            );
        });

        $(document).on('mouseleave','body .container .vid-lines .start-display section .list div.video-frame.active', function(){
            $frame = $(this).removeClass('active');
            clearTimeout($frame.data('timeout'));
            if( $frame.is('.opened') ){
                $frame.removeClass('opened').closeFrameTrailer();
            }
            $frame.data('timeout','');
        });
    }
})