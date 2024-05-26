jQuery(document).ready(function ($) {
  $(".selectpicker").selectpicker();
  // chatScrollDirectionDown();
  uploadImg();
  initAllSiteMixItUp();
  customDropdown();
  allSiteSwiperInit();
  verificationCodeSeprate();
  showPassword($);
  toggleSideMenuInSmallScreens($);
  stickyHeader($);
  lazyLoad();
  initCopyNumber();
  changeHeartRate();
});

// functions init

function lazyLoad() {
  const images = document.querySelectorAll(".lazy-omd");

  const optionsLazyLoad = {
    //  rootMargin: '-50px',
    // threshold: 1
  };

  const preloadImage = function (img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.parentElement.classList.remove("loading-omd");
      img.parentElement.classList.add("loaded-omd");
      img.parentElement.parentElement.classList.add("lazy-head-om");
    };
  };

  const imageObserver = new IntersectionObserver(function (enteries) {
    enteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function swiperInit(options) {
  const swiper = new Swiper(options.className + " .swiper-container", {
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    rtl: $("html").attr("dir") === "rtl" ? true : false,
    pagination: {
      el: options.className + " .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: options.className + " .swiper-button-next",
      prevEl: options.className + " .swiper-button-prev",
    },
    breakpoints: options.breakpoints,
    observer: options.observer,
    observeParents: options.observeParents,
    grid: options.grid,
    ...options,
  });

  lazyLoad();

  return swiper;
}

function allSiteSwiperInit() {
  const ourLatestSubscribersSwiperBreakNormalPoints = {
    0: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1800: {
      slidesPerView: 5,
    },
  };

  const heroSection = {
    autoplay: false,
    className: ".hero_sec__",
    spaceBetween: 10,
  };

  swiperInit(heroSection);

  /********************************
   *
   * single page products slider -- product gallery  *
   *
   ********************************/
  var addsThumbs = new Swiper(".adds_thumbnails_slider__ .swiper", {
    loop: false,
    spaceBetween: 20,

    // slidesPerView: 5,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
    observer: true,
    observeParents: true,
    freeMode: false,
    watchSlidesProgress: true,
    direction: "horizontal",
  });

  var productsImages = new Swiper(".adds_main_slider .swiper", {
    loop: false,
    spaceBetween: 10,

    pagination: {
      el: ".adds_main_slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".adds_main_slider .swiper-button-next",
      prevEl: ".adds_main_slider .swiper-button-prev",
    },
    thumbs: {
      swiper: addsThumbs,
    },
    // on: {
    //   init: handleVideoPlayback,
    //   slideChange: handleVideoPlayback,
    // },
  });
}

function verificationCodeSeprate() {
  const inputElements = [...document.querySelectorAll("input.code-input")];

  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      // if the keycode is backspace & the current field is empty
      // focus the input before the current. The event then happens
      // which will clear the input before the current
      if (e.keyCode === 8 && e.target.value === "") {
        inputElements[Math.max(0, index - 1)].focus();
      }
    });
    ele.addEventListener("input", (e) => {
      if (e.target.value === "") {
        inputElements[index].classList = "code-input";
      } else {
        inputElements[index].classList = "code-input active";
      }

      // take the first character of the input
      // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
      // but I'm willing to overlook insane security code practices.
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // the `??` '' is for the backspace usecase
      const lastInputBox = index === inputElements.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });
}

function showPassword($) {
  $(".show-password-button-om").on("click", function (e) {
    e.preventDefault();
    if ($(this).parent().find("input").attr("type") == "text") {
      $(this).parent().find("input").attr("type", "password");
      $(this).removeClass("show-om");
    } else {
      $(this).parent().find("input").attr("type", "text");
      $(this).addClass("show-om");
    }
  });
}

function toggleSideMenuInSmallScreens($) {
  // nav men activation
  $("#menu-butt-activ-om").on("click", function (e) {
    e.preventDefault();

    $("#navbar-menu-om").addClass("active-menu");
    $(".overlay").addClass("active");
    $("body").addClass("overflow-body");
  });

  // nav men close
  $(".close-button__ , .overlay ").on("click", function (e) {
    e.preventDefault();
    $("#navbar-menu-om").removeClass("active-menu");
    $(".overlay").removeClass("active");
    $("body").removeClass("overflow-body");
  });
}

function stickyHeader($) {
  let headerHeight = $("header").outerHeight();

  $("header").innerHeight(headerHeight);

  let lastScroll = 0;
  $(document).on("scroll", function () {
    let currentScroll = $(this).scrollTop();
    // side links
    if (currentScroll > headerHeight + 500 || screen.width < 500) {
      $(".side_links_section").addClass("active");
    } else {
      $(".side_links_section").removeClass("active");
    }

    // scroll down
    if (currentScroll < lastScroll && currentScroll > headerHeight + 500) {
      // add class avtive menu
      $(".fixed_header__").addClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    } else if (
      currentScroll > lastScroll &&
      currentScroll > headerHeight + 500
    ) {
      // scroll up
      if ($(".fixed_header__").hasClass("active_menu__")) {
        $(".fixed_header__").removeClass("active_menu__");
        $(".fixed_header__").addClass("not_active_menu__");
      }
    } else {
      $(".fixed_header__").removeClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    }
    lastScroll = currentScroll;
  });

  $(".arrow_button__").click(() => {
    $(".side_links_section").removeClass("active");
  });
}

function customDropdown() {
  $(".dropdown_button__").on("click", function (event) {
    const perantElement = $(this).closest(".custom_dropdown__");
    const menu = perantElement.find(".dropdown_menu__");
    const menuSec = perantElement.find(".section_menu_dropdown_");
    let timeoutId;

    event.preventDefault();
    // perantElement.toggleClass("show");

    // menu.on("mouseleave", function () {
    //   timeoutId = setTimeout(function () {
    //     perantElement.removeClass("show");
    //   }, 750);
    // });

    // menu.on("mouseenter", () => clearTimeout(timeoutId));

    if ($(".dropdown_menu__")) {
      perantElement.toggleClass("show");
      menu.on("mouseleave", function () {
        timeoutId = setTimeout(function () {
          perantElement.removeClass("show");
        }, 750);
      });
      menu.on("mouseenter", () => clearTimeout(timeoutId));
    }
    if ($(".section_menu_dropdown_").css("position") === "relative") {
      perantElement.addClass("show");
      $(menuSec).slideToggle(750);
      menuSec.on("mouseleave", function () {
        timeoutId = setTimeout(function () {
          perantElement.addClass("show");
        }, 750);
      });
      menuSec.on("mouseenter", () =>
        clearTimeout(
          setTimeout(function () {
            perantElement.addClass("show");
          }, 3000)
        )
      );
    }
  });
}

function chatScrollDirectionDown() {
  let messageBody = document.querySelector(".messages_wrapper__");
  if (!messageBody) {
    return;
  }

  messageBody.scrollTop = messageBody.scrollHeight;
}

function initAllSiteMixItUp() {
  const mixitupElement = document.querySelector(".all_furniture");
  if (mixitupElement) {
    const mixItUp = new mixitup(mixitupElement, {
      selectors: {
        control: `.control`,
        target: ".mix",
      },
    });

    mixItUp.filter(".furniture_filter");
  }

  const mixitupElement2 = document.querySelector(".all_ads");
  if (mixitupElement2) {
    const mixItUp2 = new mixitup(mixitupElement2, {
      selectors: {
        control: `.controlAds`,
        target: ".mixAds",
      },
    });

    mixItUp2.filter(".waiting_ads");
  }

  const mixitupElement3 = document.querySelector(".all_followrs");
  if (mixitupElement3) {
    const mixItUp3 = new mixitup(mixitupElement3, {
      selectors: {
        control: `.control_followers`,
        target: ".mix_followers",
      },
    });

    mixItUp3.filter(".your_followers");
  }
}

function uploadImg() {
  $(".upload_photo__ input").change(function (e) {
    let img = $(this).parent().parent().find(".profile_img");
    let file = e.target.files[0];

    if (!img.length) return;

    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        img.attr("src", reader.result).show();
        img.parent().parent().addClass("uploaded__");
      };
      reader.readAsDataURL(file);
    }
  });
}

function initCopyNumber() {
  const copyNumber = document.querySelector(".copy_number");
  if (!copyNumber) return;
  copyNumber.addEventListener("click", function () {
    let copy = document.querySelector(".copy_number_wrapper .number");
    copy_text(copy);
  });
}

function copy_text(node) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    document.execCommand("copy");
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  }
}

function changeHeartRate() {
  let targetImages = document.querySelectorAll(".button_heart_rate img");

  $(targetImages).each(function (i, target) {
    if ($(target).hasClass("change_src")) {
      $(".change_src").attr("src", "assets/images/shapes/red_heart.png");
    }
    $(target).click(function () {
      $(target).toggleClass("change_src");

      if ($(target).hasClass("change_src")) {
        $(".change_src").attr("src", "assets/images/shapes/red_heart.png");
      } else if (!$(target).hasClass("change_src")) {
        $(target).attr("src", "assets/images/shapes/adds/heart.svg");
      }
    });
  });
}
