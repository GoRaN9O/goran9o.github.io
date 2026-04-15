(function() {
  "use strict";

  /**
   * Theme Toggle (Dark/Light Mode)
   */
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const themeToggleSticky = document.querySelector('.theme-toggle-sticky');
  const headerThemeToggle = document.querySelector('.header-theme-toggle');
  const themeToggleOriginal = document.querySelector('#theme-toggle');
  const themeToggleTop = document.querySelector('#theme-toggle-top');
  
  function toggleTheme() {
    document.body.classList.add('theme-transition');
    
    document.body.classList.toggle('dark-mode');
    
    const icon = document.querySelector('.theme-toggle-btn i');
    const stickyIcon = document.querySelector('.theme-toggle-sticky i');
    const headerIcon = document.querySelector('.header-theme-toggle i');
    const originalIcon = document.querySelector('#theme-toggle i');
    const topIcon = document.querySelector('#theme-toggle-top i');
    if (document.body.classList.contains('dark-mode')) {
      if (icon) {
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
      }
      if (stickyIcon) {
        stickyIcon.classList.remove('bi-moon-stars');
        stickyIcon.classList.add('bi-sun');
      }
      if (headerIcon) {
        headerIcon.classList.remove('bi-moon-stars');
        headerIcon.classList.add('bi-sun');
      }
      if (originalIcon) {
        originalIcon.classList.remove('bi-moon-stars');
        originalIcon.classList.add('bi-sun');
      }
      if (topIcon) {
        topIcon.classList.remove('bi-moon-stars');
        topIcon.classList.add('bi-sun');
      }
    } else {
      if (icon) {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-stars');
      }
      if (stickyIcon) {
        stickyIcon.classList.remove('bi-sun');
        stickyIcon.classList.add('bi-moon-stars');
      }
      if (headerIcon) {
        headerIcon.classList.remove('bi-sun');
        headerIcon.classList.add('bi-moon-stars');
      }
      if (originalIcon) {
        originalIcon.classList.remove('bi-sun');
        originalIcon.classList.add('bi-moon-stars');
      }
      if (topIcon) {
        topIcon.classList.remove('bi-sun');
        topIcon.classList.add('bi-moon-stars');
      }
    }
    
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleSticky) {
    themeToggleSticky.addEventListener('click', toggleTheme);
  }
  
  if (headerThemeToggle) {
    headerThemeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleOriginal) {
    themeToggleOriginal.addEventListener('click', toggleTheme);
  }

  if (themeToggleTop) {
    themeToggleTop.addEventListener('click', toggleTheme);
  }

  /**
   * Load saved theme preference
   */
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = themeToggleBtn?.querySelector('i');
    const topIcon = themeToggleTop?.querySelector('i');
    const headerIcon = headerThemeToggle?.querySelector('i');
    const originalIcon = themeToggleOriginal?.querySelector('i');
    if (icon) {
      icon.classList.remove('bi-moon-stars');
      icon.classList.add('bi-sun');
    }
    if (topIcon) {
      topIcon.classList.remove('bi-moon-stars');
      topIcon.classList.add('bi-sun');
    }
    if (headerIcon) {
      headerIcon.classList.remove('bi-moon-stars');
      headerIcon.classList.add('bi-sun');
    }
    if (originalIcon) {
      originalIcon.classList.remove('bi-moon-stars');
      originalIcon.classList.add('bi-sun');
    }
  }

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 400,
      easing: 'ease',
      once: true,
      mirror: false,
      offset: 120
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          let value = el.getAttribute('aria-valuenow');
          el.style.width = value + '%';
          
          let percent = parseInt(value);
          let color;
          if (percent >= 100) color = '#059652';
          else if (percent >= 90) color = '#20c997';
          else if (percent >= 80) color = '#0dcaf0';
          else if (percent >= 70) color = '#0d6efd';
          else if (percent >= 60) color = '#6610f2';
          else if (percent >= 50) color = '#d63384';
          else color = '#dc3545';
          
          el.style.backgroundColor = color;
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();