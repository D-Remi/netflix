
var menuNav = document.getElementById('navi');
var derniere_position_de_scroll_connue = 0;
var ticking = false;

function faireQuelqueChose(position_scroll) {
    if(derniere_position_de_scroll_connue != 0)
        menuNav.style.opacity = 1;
    else
        menuNav.style.opacity = 0.5;
}

window.addEventListener('scroll', function(e) {
  derniere_position_de_scroll_connue = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      faireQuelqueChose(derniere_position_de_scroll_connue);
      ticking = false;
    });
  }

  ticking = true;
});