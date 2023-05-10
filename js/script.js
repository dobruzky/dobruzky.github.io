'use strict';

window.addEventListener("load", () => {

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.classList.contains('scroll')) {
      link.addEventListener('click', function(e) {
       document.querySelector('body').classList.remove('mobile-menu-open');
        e.preventDefault();
        let href = this.getAttribute('href');
        gsap.to(window, {duration: 1, scrollTo: href});
    });
    }
  });

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  const inputs = Array.from(document.querySelectorAll('.welcome__form-inputs input'));
  const submitButton = document.querySelector('.welcome__form-submit');
  
  // To set proper state on come back from payment page
  if(inputs.every((input) => input.value)) {
    submitButton.removeAttribute('disabled')
  }

  inputs.forEach((input, i) => {
    input.addEventListener('keyup', function(e) {
      input.value = input.value.replace (/\D/g, '');
      const ml = input.getAttribute('maxlength');
      if (ml && input.value.length >= ml && inputs[i+1]) {
        inputs[i+1].focus();
      }

      if(inputs.every((input) => input.value)) {
        submitButton.removeAttribute('disabled')
      } else {
        submitButton.setAttribute('disabled', true);
      }
    });
  });

  inputs.forEach((input, i) => {
    input.addEventListener('keydown', function(e) {
      input.value = input.value.replace (/\D/g, '');
      if (e.keyCode === 8 && !input.value.length >= 1 && inputs[i-1]) {
        input.val = '';
        inputs[i-1].focus();
      }
    });
  });

  submitButton.addEventListener('click', () => {
    const code = inputs.map((input) => input.value).join('');
    window.location.href = `https://app.tipse.ge/tip?code=${code}`;
  })

  document.querySelectorAll('.burger').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('body').classList.toggle('mobile-menu-open');
    });
  });

  document.querySelector('.header__lang-current').addEventListener('click', () => {
    document.querySelector('.header__lang').classList.toggle('open');
  });

  document.addEventListener( 'click', (e) => {
    const withinBoundaries = e.composedPath().includes(document.querySelector('.header__lang'));
    if ( ! withinBoundaries ) {
      document.querySelector('.header__lang').classList.remove('open');
    }
  });

  let typed = new Typed('#typed', { // Тут id того блока, в которм будет анимация
    stringsElement: '#typed-strings', // Тут id блока из которого берем строки для анимации
    typeSpeed: 130, // Скорость печати
    startDelay: 0, // Задержка перед стартом анимации
    backSpeed: 50, // Скорость удаления
    backDelay: 2000, // Пауза перед удалением
    loop: true, // Указываем, повторять ли анимацию
    onStringTyped: (arrayPos, self) => {
      setTimeout(() => {
        document.querySelectorAll('.hero-section__item').forEach(item => {
        item.classList.remove('active');
        });
        document.querySelector(`.hero-section__item_${arrayPos + 2}`).classList.add('active');
      }, 2800);
    },
});


// check is touch device
function isTouchDevice() {
  return !!('ontouchstart' in window);
}

let tlwelcome = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-content",
    start: 'top-=16px top', // when the top of the trigger hits the top of the viewport

    onEnter: () => {
      document.querySelector('body').classList.add('info-page');
      gsap.to(window, {duration: 0, scrollTo: 0});
      tlwelcome.kill();
      ScrollTrigger.refresh();
    },
  }
});


let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".tips-info",
    pin: true,   // pin the trigger element while active
    start: 'center center', // when the top of the trigger hits the top of the viewport
    end: "+=5000", // end after scrolling 500px beyond the start
    scrub: 3, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  }
});

tl
// .to(".tips-info__text_4", {rotation:0.001,}, '+=0.02')
.to(".tips-info__smartphone-qr", {x: -100, y: -30, rotation: 0, })
.to(".tips-info__smartphone", {xPercent: 280}, '<')
.to(".tips-info__smartphone-emodji", {x: -200,}, '<')
.to(".tips-info__smartphone-front_1", {delay: 0.1, duration: 0, autoAlpha: 0,}, '<')
.to(".tips-info__text_1", {duration: 0.2, x: -200, autoAlpha: 0,}, '<')
.fromTo(".tips-info__text_2", {x: 150, autoAlpha: 0,}, {duration: 0.2, x: 0, autoAlpha: 1,}, '<0.1')
.to(".tips-info__text_4", {rotation:0.001,}, '+=0.1')
.to(".tips-info__smartphone-front_2", {autoAlpha: 0,})
.to(".tips-info__smartphone-emodji", {x: 0,}, '<')
.to(".tips-info__smartphone-payments", {x: 190,}, '<')
.to(".tips-info__smartphone", {xPercent: 0,}, '<')
.to(".tips-info__text_2", {duration: 0.1, x: 200, autoAlpha: 0,}, '<0.1')
.fromTo(".tips-info__text_3", {x: -150, autoAlpha: 0,}, {duration: 0.2, x: 0, autoAlpha: 1,}, '<0.1')
.to(".tips-info__text_4", {rotation:0.001,}, '+=0.1')
.to(".tips-info__smartphone-front_3", {duration: 0.3, autoAlpha: 0,})
.to(".tips-info__smartphone-payments", {x: 0,}, '<')
.to(".tips-info__smartphone", {xPercent: 280,}, '<')
.to(".tips-info__smartphone-waiter", {x: -130, rotation: -15, }, '<')
.to(".tips-info__text_3", {duration: 0.2, x: -150, autoAlpha: 0,}, '<')
.fromTo(".tips-info__text_4", {x: 150, autoAlpha: 0,}, {duration: 0.2, x: 0, autoAlpha: 1,}, '<0.1');
// .to(".tips-info__text_4", {rotation:0.001,}, '+=0.02');

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".manager-section",
    pin: true,   // pin the trigger element while active
    start: 'center center', // when the top of the trigger hits the top of the viewport
    end: "+=3000", // end after scrolling 500px beyond the start
    scrub: 3, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  }
});

tl4
// .to(".manager-section__text_2", {rotation:0.001,}, '+=0.02')
.to(".manager-section__computer-manager", {x: -100, y: -30, zIndex: 0,  autoAlpha: 0, })
.to(".manager-section__computer", {xPercent: 70, left: 0,}, '<')
.to(".manager-section__computer-mac1", {duration: 0.3, autoAlpha: 0,}, '<')
.to(".manager-section__text_1", {duration: 0.2, x: -150, autoAlpha: 0,}, '<')
.fromTo(".manager-section__text_2", {x: 150, autoAlpha: 0,}, {duration: 0.2, x: 0, autoAlpha: 1,}, '<0.2')
.to(".manager-section__computer-tips", {delay: 0.2, duration: 0.2,  x: -200, y: - 90, scale: 1}, '<')
.to(".manager-section__computer-trans", {delay: 0.01, duration: 0.2, x: -160, y: - 210, scale: 1}, '<')
.to(".manager-section__computer-raiting", {delay: 0.02, duration: 0.2, x: 10, y: - 120, scale: 1}, '<');
// .to(".manager-section__text_2", {rotation:0.001,}, '+=0.02');

const benefits = new Swiper('.benefits__slider', {
  slidesPerView: 1,
  enabled: false,
  breakpoints: {
    300: {
      slidesPerView: 1,
      enabled: true,
      spaceBetween: 12,
    },
    550: {
      slidesPerView: 2,
      enabled: true,
      spaceBetween: 16,
    },
    800: {
      slidesPerView: 2.5,
      enabled: true,
      spaceBetween: 16
    },
    1021: {
      slidesPerView: 1,
      enabled: false,
    }
  }
});

const infoSlider = new Swiper('.info-slider__swiper', {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
    speed: 1000,
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});


const qrcodeSwiper = new Swiper('.qr-code__swiper', {
  slidesPerView: 4,
  spaceBetween: 16,

  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 12
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 16
    },
    730: {
      slidesPerView: 3,
      spaceBetween: 16
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 16,
    }
  }
});


document.querySelectorAll('.faq__item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('faq__item-button')) {
      if (item.classList.contains('open')) {
        item.classList.remove('open');
      } else {
        document.querySelectorAll('.faq__item').forEach(item => {
          item.classList.remove('open');
        });
        item.classList.toggle('open');
      }
    }
  });
});

document.querySelectorAll('.benefits__nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.benefits__nav-item').forEach(item => {
      item.classList.remove('active');
    });
    item.classList.add('active');
    document.querySelectorAll('.benefits__tabs-content').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(item.getAttribute('href')).classList.add('active');
  });
});

document.querySelectorAll('.qr-code__nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.qr-code__nav-item').forEach(item => {
      item.classList.remove('active');
    });
    item.classList.add('active');
    document.querySelectorAll('.qr-code__content').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(item.getAttribute('href')).classList.add('active');
  });
});


let tlnav = gsap.timeline({
  scrollTrigger: {
    trigger: ".qr-code__nav",
    start: 'center center', // when the top of the trigger hits the top of the viewport
    onEnter: () => {
      document.querySelectorAll('.qr-code__content').forEach(item => {
        item.classList.add('grid-active');
      });
    },
    onLeaveBack: () => {
      document.querySelectorAll('.qr-code__content').forEach(item => {
        item.classList.remove('grid-active');
      });
    },
  }
});

});
