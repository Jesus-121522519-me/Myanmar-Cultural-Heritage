document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var sideNav = document.getElementById('mySidenav');
  var overlay = document.getElementById('sidenavOverlay');
  var openButton = document.getElementById('hamburger-toggle');
  var closeButton = sideNav ? sideNav.querySelector('.closebtn') : null;
  var openButtonIcon = openButton ? openButton.querySelector('i') : null;
  var navLinks = sideNav ? Array.prototype.slice.call(sideNav.querySelectorAll('.sidenav-link')) : [];
  var desktopLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links [data-scroll-target]'));
  var heroTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-scroll-target]'));
  var fabButton = document.getElementById('myFab');
  var teamModal = document.getElementById('teamModal');
  var teamModalContent = teamModal ? teamModal.querySelector('.team-modal__content') : null;
  var teamModalPhoto = document.getElementById('teamModalPhoto');
  var teamModalAge = document.getElementById('teamModalAge');
  var teamModalTitle = document.getElementById('teamModalTitle');
  var teamModalTagline = document.getElementById('teamModalTagline');
  var teamModalRoles = document.getElementById('teamModalRoles');
  var teamModalDescription = document.getElementById('teamModalDescription');
  var teamTriggers = Array.prototype.slice.call(document.querySelectorAll('.team-profile-trigger'));
  var teamModalCloseElements = teamModal ? Array.prototype.slice.call(teamModal.querySelectorAll('[data-team-modal-close]')) : [];
  var focusableModalSelectors = ['button', 'a[href]', 'input', 'textarea', 'select', '[tabindex]:not([tabindex="-1"])'];
  var activeTrigger = null;
  var lastFocusedElementBeforeModal = null;

  if (!sideNav) {
    return;
  }

  function closeNav() {
    body.classList.remove('nav-open');
    sideNav.setAttribute('aria-hidden', 'true');

    if (overlay) {
      overlay.hidden = true;
    }

    if (openButtonIcon) {
      openButtonIcon.classList.remove('bi-x-lg');
      openButtonIcon.classList.add('bi-list');
    }
  }

  function openNav() {
    body.classList.add('nav-open');
    sideNav.setAttribute('aria-hidden', 'false');

    if (overlay) {
      overlay.hidden = false;
    }

    if (openButtonIcon) {
      openButtonIcon.classList.remove('bi-list');
      openButtonIcon.classList.add('bi-x-lg');
    }

    setTimeout(function () {
      if (navLinks.length > 0) {
        navLinks[0].focus();
      }
    }, 50);
  }

  function trapFocus(event) {
    if (event.key !== 'Tab' || !body.classList.contains('nav-open')) {
      return;
    }

    var focusableElements = [closeButton].concat(navLinks).filter(Boolean);
    var activeElement = document.activeElement;
    var lastIndex = focusableElements.length - 1;
    var firstElement = focusableElements[0];
    var lastElement = focusableElements[lastIndex];

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  if (openButton) {
    openButton.addEventListener('click', function () {
      if (body.classList.contains('nav-open')) {
        closeNav();
        return;
      }
      openNav();
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeNav);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      closeNav();
      return;
    }
    trapFocus(event);
  });

  window.addEventListener('resize', function () {
    if (!openButtonIcon) {
      return;
    }
    if (window.innerWidth > 991 && openButtonIcon.classList.contains('bi-x-lg')) {
      openButtonIcon.classList.remove('bi-x-lg');
      openButtonIcon.classList.add('bi-list');
    }
  });

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var teamMembers = {
    aung: {
      photo: 'assets/images/james.png',
      age: 'Age 13',
      name: 'Aung Khant Min',
      tagline: 'Software Developer | Ethical Hacker | Full Stack Web Developer',
      roles: ['Coder', 'Website Structure Builder', 'Designer', 'Researcher', 'Debugger'],
      description: 'Aung Khant Min architected the site foundation, implemented responsive layouts, handled debugging, and ensured every interaction feels polished and secure.'
    },
    moe: {
      photo: "assets/images/honey's photo.jpg",
      age: 'Age 15',
      name: 'Moe Thant Sin Phyu',
      tagline: 'Web Developer',
      roles: ['Main Designer', 'Researcher', 'Photo Curator', 'Folder Structure Reorganizer'],
      description: 'Moe Thant Sin Phyu led the visual direction, curated imagery, refined copy, and kept the asset library organized so the entire site stayed coherent and beautiful.'
    }
  };

  function handleSmoothScroll(event, targetId) {
    var targetElement = document.getElementById(targetId);
    if (!targetElement) {
      return;
    }
    event.preventDefault();
    closeNav();

    setTimeout(function () {
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }, 50);
  }

  for (var i = 0; i < navLinks.length; i++) {
    (function(link) {
      var target = link.getAttribute('data-scroll-target');
      link.addEventListener('click', function (event) {
        if (target) {
          handleSmoothScroll(event, target);
          return;
        }
        setTimeout(closeNav, 60);
      });
    })(navLinks[i]);
  }

  for (var j = 0; j < desktopLinks.length; j++) {
    (function(link) {
      var target = link.getAttribute('data-scroll-target');
      if (!target) {
        return;
      }
      link.addEventListener('click', function (event) {
        handleSmoothScroll(event, target);
      });
    })(desktopLinks[j]);
  }

  for (var k = 0; k < heroTriggers.length; k++) {
    (function(trigger) {
      var target = trigger.getAttribute('data-scroll-target');
      if (!target) {
        return;
      }
      trigger.addEventListener('click', function (event) {
        handleSmoothScroll(event, target);
      });
    })(heroTriggers[k]);
  }

  function openTeamModal(memberKey, trigger) {
    if (!teamModal || !teamModalContent) {
      return;
    }

    var member = teamMembers[memberKey];
    if (!member) {
      return;
    }

    activeTrigger = trigger;
    lastFocusedElementBeforeModal = document.activeElement;
    teamModalPhoto.src = member.photo;
    teamModalPhoto.alt = member.name;
    teamModalAge.textContent = member.age;
    teamModalTitle.textContent = member.name;
    teamModalTagline.textContent = member.tagline;

    while (teamModalRoles.firstChild) {
      teamModalRoles.removeChild(teamModalRoles.firstChild);
    }

    for (var m = 0; m < member.roles.length; m++) {
      var li = document.createElement('li');
      li.textContent = member.roles[m];
      teamModalRoles.appendChild(li);
    }

    teamModalDescription.textContent = member.description;
    teamModal.hidden = false;
    teamModal.classList.add('is-visible');
    body.style.overflow = 'hidden';

    setTimeout(function () {
      var focusableElements = teamModalContent.querySelectorAll(focusableModalSelectors.join(','));
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 50);
  }

  function closeTeamModal() {
    if (!teamModal) {
      return;
    }

    teamModal.classList.remove('is-visible');
    teamModal.hidden = true;
    body.style.overflow = '';

    if (lastFocusedElementBeforeModal) {
      lastFocusedElementBeforeModal.focus();
    }

    activeTrigger = null;
  }

  for (var n = 0; n < teamTriggers.length; n++) {
    (function(trigger) {
      trigger.addEventListener('click', function () {
        var memberKey = trigger.getAttribute('data-member');
        openTeamModal(memberKey, trigger);
      });

      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          var memberKey = trigger.getAttribute('data-member');
          openTeamModal(memberKey, trigger);
        }
      });
    })(teamTriggers[n]);
  }

  for (var p = 0; p < teamModalCloseElements.length; p++) {
    (function(element) {
      element.addEventListener('click', closeTeamModal);
    })(teamModalCloseElements[p]);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && teamModal && !teamModal.hidden) {
      closeTeamModal();
      return;
    }

    if (event.key === 'Tab' && teamModal && !teamModal.hidden) {
      var focusableElements = teamModalContent ? teamModalContent.querySelectorAll(focusableModalSelectors.join(',')) : [];

      if (focusableElements.length === 0) {
        return;
      }

      var firstElement = focusableElements[0];
      var lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });

  if (teamModal) {
    teamModal.addEventListener('click', function (event) {
      var target = event.target;
      if (!teamModalContent.contains(target) && !target.closest('.team-modal__content')) {
        closeTeamModal();
      }
    });
  }

  if (fabButton) {
    fabButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});