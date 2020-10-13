$(function(){
    $.getJSON(
        'asset/videos.json',
        function (data) {
            console.log(data);
        }
    )
});