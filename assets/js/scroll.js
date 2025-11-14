document.addEventListener('DOMContentLoaded', function () {
  var scrollButton = document.getElementById('scrollBtn');
  var highlightSection = document.querySelector('.journey-highlights');
  var highlightCards = highlightSection ? Array.prototype.slice.call(highlightSection.querySelectorAll('.destination-card')) : [];
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cardsAnimated = false;

  function toggleScrollButton() {
    if (!scrollButton || document.body.classList.contains('intro-active')) {
      if (scrollButton) {
        scrollButton.style.display = 'none';
      }
      return;
    }

    if (window.scrollY > 300) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }

  function checkHighlightCardsVisible() {
    if (cardsAnimated || highlightCards.length === 0) {
      return;
    }

    var windowHeight = window.innerHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    for (var i = 0; i < highlightCards.length; i++) {
      var card = highlightCards[i];
      var rect = card.getBoundingClientRect();
      var cardTop = rect.top + scrollTop;

      if (scrollTop + windowHeight > cardTop + (rect.height * 0.2)) {
        card.classList.add('is-visible');
      }
    }

    var allVisible = true;
    for (var j = 0; j < highlightCards.length; j++) {
      if (!highlightCards[j].classList.contains('is-visible')) {
        allVisible = false;
        break;
      }
    }

    if (allVisible) {
      cardsAnimated = true;
    }
  }

  if (scrollButton) {
    scrollButton.addEventListener('click', scrollToTop);
  }

  window.addEventListener('scroll', function() {
    toggleScrollButton();
    checkHighlightCardsVisible();
  });

  toggleScrollButton();
  checkHighlightCardsVisible();
});