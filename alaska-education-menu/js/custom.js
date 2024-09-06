var ex = new EX({ offset: 200 }).init();

$(document).ready(function () {
  // Remove the Breadcrumb and insert after one section
  var breadcrumb = $(".ae-breadcrumb");
  breadcrumb.detach();
  breadcrumb.insertAfter(".umb-block-list > section:first-child");

  // Mobile menu
  $(".navbar-toggler").click(function () {
    $(".alaska-nav").toggleClass("open");
    $("body")
      .append('<div class="mobile-menu-overlay"></div>')
      .find(".mobile-menu-overlay")
      .click(function () {
        $(".alaska-nav").removeClass("open");
        $(this).remove();
      });
  });
  $(window)
    .resize(function () {
      if ($(window).width() < 1280) {
        $(
          ".alaska-menu .nav-item.has-dropdown .nav-link .icon-arrow-right"
        ).click(function (e) {
          e.preventDefault();
          $(this).parent().parent().parent().addClass("open");
          $(this).parent().siblings(".dropdown-wrapper").addClass("show");
        });
        $("nav .btn-back").click(function (e) {
          e.preventDefault();
          const _ = this;
          setTimeout(() => {
            $(_).parent().removeClass("show");
            $(".menu-text").html("Close");
          }, 300);
        });
        $("nav .btn-close").click(function () {
          $(".alaska-nav").removeClass("open");
          $(".mobile-menu-overlay").remove();
          $(".dropdown-wrapper, .sub-menu").removeClass("show");
        });
      }
    })
    .resize();

  // Desktop Menu Dropdown Open script start //
  function toggleNavItem() {
    if ($(window).width() > 1280) {
      $(document).on("click", function (event) {
        // Check if the click happened outside the .alaska-menu
        if (!$(event.target).closest(".alaska-menu").length) {
          // Remove 'active' class from all nav links
          $(".alaska-menu .nav-item.has-dropdown.active").removeClass("active");
          $(".alaska-menu .dropdown-wrapper .sub-menu").removeClass("show");
          $("#overlay").remove();
        }
      });
    }
  }

  // Initial check
  toggleNavItem();
  $(window).resize(function () {
    toggleNavItem();
    $(".alaska-nav").removeClass("open");
    $(".mobile-menu-overlay").remove();
    
  });

  function toggleMenuOverlay() {
    // Remove previous event handlers to avoid duplication
    $(".alaska-menu .nav-item.has-dropdown .nav-link").off("click");
    
    if ($(window).width() >= 1280) {
      $(".alaska-menu .nav-item.has-dropdown .nav-link").on(
        "click",
        function (event) {
          event.preventDefault();
          event.stopPropagation(); // Prevent the click event from bubbling up to the document

          // Add overlay if not already present
          if ($("#overlay").length === 0) {
            $("body").append('<div id="overlay"></div>');
          }

          // Toggle active class on clicked item
          if ($(this).parent().hasClass("active")) {
            $(this).parent().removeClass("active");
            // Remove overlay if no other nav item is active
            if ($(".alaska-menu .nav-item.has-dropdown.active").length === 0) {
              $("#overlay").remove();
              $(".dropdown-wrapper").removeClass("show");
              
            }
          } else {
            // Remove 'active' class from all other items
            $(".sub-menu").removeClass("show");
            $(".dropdown-wrapper").removeClass("show").css("height", "auto");
            $(".has-submenu a").removeClass("active");
            $(this)
              .closest(".alaska-menu")
              .find(".nav-item.has-dropdown.active")
              .removeClass("active");
            $(this).parent().addClass("active");
            $(this).parent().siblings(".dropdown-wrapper").addClass("show");
          }
        }
      );
    } else {
      // Remove active class and overlay if window is resized to less than 1280px
      $("#overlay").remove();
      $(".dropdown-wrapper").removeClass("show");
      $(".alaska-menu .nav-item.has-dropdown.active").removeClass("active");
      
      
    }
  }

  // Ensure the function runs on page load and on window resize
  $(document).ready(toggleMenuOverlay);
  $(window).resize(toggleMenuOverlay);
  // Desktop Menu Dropdown Open script End //

  function adjustDropdownHeight($dropdown) {
    if ($dropdown.length) {
      // Reset height to auto to calculate new height
      $dropdown.css("height", "auto");
  
      // Get the computed height
      var height = $dropdown[0].scrollHeight;
  
      // Set the new height
      $dropdown.css("height", height + "px");
    }
  }
  
  $(".dropdown-wrapper").on("click", ".has-submenu .icon-arrow-right", function (event) {
    // Prevent the default action
    event.preventDefault();
  
    // Get the closest .has-submenu item
    var $parentItem = $(this).closest(".has-submenu");
  
    // Find the closest .sub-menu that is a direct child
    var $currentSubMenu = $parentItem.children(".sub-menu");
  
    // Check if the current submenu is already visible
    var isCurrentlyVisible = $currentSubMenu.hasClass("show");
  
    // Remove .show and .active class from all sibling .sub-menu elements and their parents within the same .dropdown-wrapper
    $parentItem.siblings().find(".sub-menu").removeClass("show");
    $parentItem.siblings().removeClass("active");
  
    // Also remove .show and .active from any descendants of the current .has-submenu
    $parentItem.find(".sub-menu").removeClass("show");
    $parentItem.find(".has-submenu").removeClass("active");
    $parentItem.children("a").removeClass("active");
    $parentItem.siblings().find(".sub-menu").siblings().removeClass("active");
  
    // Toggle .show class on the current .sub-menu
    if (!isCurrentlyVisible) {
      $currentSubMenu.addClass("show");
      $parentItem.addClass("active");
      $currentSubMenu.siblings().addClass("active");
    }
  
    // Adjust the height of the parent .dropdown-wrapper
    var $dropdown = $parentItem.closest(".dropdown-wrapper");
    adjustDropdownHeight($dropdown);
  });
  

  // Tab Script for move towards left and  script start//
  $(".secondary-tab-comp-wrap").each(function () {
    var $section = $(this);
    var $navTabs = $section.find(".nav-pills");

    $navTabs.find(".nav-link").on("shown.bs.tab", function (e) {
      var $targetTab = $(e.target);

      // Check if the target tab is fully visible
      if (!$targetTab.position()) {
        return;
      }

      // Calculate the necessary scroll amount
      var scrollLeft = $navTabs.scrollLeft() - 20;
      var tabLeft = $targetTab.position().left;
      var tabWidth = $targetTab.outerWidth();
      var navWidth = $navTabs.outerWidth();

      // Calculate the new scroll position to center the active tab
      var newScrollLeft = scrollLeft + tabLeft - navWidth / 2 + tabWidth / 2;

      $navTabs.animate({ scrollLeft: newScrollLeft }, 300);

      // Check visibility of first and last tab and update buttons
      updateNavButtons($navTabs);
    });

    $section.find("#prevBtn").on("click", function () {
      var scrollOffset = Math.max($navTabs.width() / 3, 100); // Adjust scroll offset
      $navTabs.animate(
        { scrollLeft: $navTabs.scrollLeft() - scrollOffset },
        300
      );
    });

    $section.find("#nextBtn").on("click", function () {
      var scrollOffset = Math.max($navTabs.width() / 3, 100); // Adjust scroll offset
      $navTabs.animate(
        { scrollLeft: $navTabs.scrollLeft() + scrollOffset },
        300
      );
    });

    function updateNavButtons($navTabs) {
      var $firstTab = $navTabs.children().first();
      var $lastTab = $navTabs.children().last();
      var navScrollLeft = $navTabs.scrollLeft();
      var navScrollRight =
        $navTabs[0].scrollWidth - navScrollLeft - $navTabs.outerWidth();

      // Check if the first tab is not visible
      if (navScrollLeft > $firstTab.position().left) {
        $section.find("#prevBtn").show();
      } else {
        $section.find("#prevBtn").hide();
      }

      // Check if the last tab is not visible
      if (navScrollRight > 10) {
        $section.find("#nextBtn").show();
      } else {
        $section.find("#nextBtn").hide();
      }
    }
    // Initial check to add or remove buttons on page load
    updateNavButtons($navTabs);
    // Update buttons on window resize
    $(window).on("resize", function () {
      updateNavButtons($navTabs);
    });
    // Update buttons on scroll
    $navTabs.on("scroll", function () {
      updateNavButtons($navTabs);
    });
  });

  // Script for Navlink Tab scroll Start //

  var sections = $(".tab-navigation-wrap"),
    nav = $(".inner-nav-links"),
    nav_height = nav.outerHeight();
  // Function to highlight active section based on scroll position
  function highlightActiveSection() {
    var cur_pos = $(window).scrollTop();

    sections.each(function () {
      var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find("a").removeClass("active");
        sections.removeClass("active");

        $(this).addClass("active");
        nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
      }
    });
  }

  // Click event handler for navigation links
  nav.find("a").on("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    var $el = $(this),
      id = $el.attr("href"); // Get the parent <li> of the clicked <a>

    // Scroll to the section with slower animation
    $("html, body").animate(
      {
        scrollTop: $(id).offset().top - 80,
      },
      {
        duration: 0.5, // Change the duration here (e.g., 1000 for 1 second)
      }
    );
    // Remove active class from all links
    nav.find("a").removeClass("active");
    // Add active class to the clicked link
    $el.addClass("active");
  });
  // Scroll event listener
  $(window).on("scroll", function () {
    highlightActiveSection();
  });
  // Script for Navlink Tab scroll Ends //

  //show video in model
  $(".video-card").click(function () {
    var videoUrl = $(this).find("iframe").attr("src");
    var autoplayUrl =
      videoUrl.replace("embed/", "embed/") +
      (videoUrl.includes("?") ? "&" : "?") +
      "autoplay=1";
    $("#videoFrame").attr("src", autoplayUrl);
    $(".videoModal").modal("show");
  });

  $("#videoModal").on("hidden.bs.modal", function () {
    $("#videoFrame").attr("src", "");
  });

  // Close modal programmatically
  $(".btn-close-model").click(function () {
    $(".videoModal").modal("hide");
  });

  // silck slider
  $(".slider").length &&
    $(".slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      speed: 300,
      autoplay: false,
      infinite: false,

      autoplaySpeed: 2000,
      //Responsive
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

  // Search popup script
  $(".alaska-menu .icon-search[type=button]").click(function () {
    $(this).toggleClass("btn-close").toggleClass("icon-search");
    $(".alaska-menu .form-search").slideToggle();
    $(".alaska-menu .form-search input").focus();
  });

  function loadCards(dataId) {
    var cards = $(".cards-" + dataId);
    for (let i = 0; i < 6 && i < cards.length; i++) {
      $(cards[i]).removeClass("hiddenCards");
      $(cards[i]).removeClass("cards-" + dataId);
      $(cards[i]).show();
    }
    if ($(".cards-" + dataId).length === 0) {
      $("#button-" + dataId).fadeOut("slow");
    }
  }

  $(".load-more-cards").click(function () {
    var dataId = $(this).data("id");
    loadCards(dataId);
  });

  //Carousel Swipe left and right functionality
  var crsl = $("#alaska-bannerCarousel"),
    threshold = 50; // Adjust swipe threshold as needed
  crsl.on("touchstart mousedown", function (e) {
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  });

  crsl.on("touchmove mousemove", function (e) {
    endX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  });

  crsl.on("touchend mouseup", function (e) {
    var deltaX = endX - startX;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        crsl.carousel("prev");
      } else {
        crsl.carousel("next");
      }
    }
  });

  //Disabled carousel btn
  function updateCarouselButtons() {
    var $carouselItems = $(".carousel-item");
    var $nextButton = $(".carousel-control-next");
    var $prevButton = $(".carousel-control-prev");

    if ($carouselItems.last().hasClass("active")) {
      $nextButton.attr("disabled", "disabled").addClass("disabled");
    } else {
      $nextButton.removeAttr("disabled").removeClass("disabled");
    }

    if ($carouselItems.first().hasClass("active")) {
      $prevButton.attr("disabled", "disabled").addClass("disabled");
    } else {
      $prevButton.removeAttr("disabled").removeClass("disabled");
    }
  }
  // Call the function on page load
  updateCarouselButtons();

  // Call the function after the carousel slides
  $("#alaska-bannerCarousel").on("slid.bs.carousel", function () {
    updateCarouselButtons();
  });

  //inner page navigation mobile select
  const $selector = $(".ae-section-selector");
  $selector.on("change", function () {
    const sectionId = $(this).val();
    const $section = $("#" + sectionId);

    if ($section.length) {
      const sectionTop = $section.offset().top;
      const offsetPosition = sectionTop - 180;

      $("html, body").animate({ scrollTop: offsetPosition }, "smooth");
    }
  });

  //inner page navigation scroll to top
  function toggleButtonVisibility() {
    $(".nav-links-wrap").each(function () {
      let $navLinksWrap = $(this);
      let $button = $navLinksWrap.find(".btn-scroll-top");
      let navLinksWrapTop = $navLinksWrap.offset().top;
      let navLinksWrapBottom =
        navLinksWrapTop + $navLinksWrap.outerHeight() - 1200;
      let windowTop = $(window).scrollTop() - 500;
      let windowBottom = windowTop + $(window).height();
      if (windowBottom >= navLinksWrapTop && windowTop <= navLinksWrapBottom) {
        $button.css("display", "flex");
      } else {
        $button.css("display", "none");
      }
    });
  }

  toggleButtonVisibility();

  $(window).scroll(() => {
    toggleButtonVisibility();
  });
  // Trigger scroll event on window resize to handle cases where window width changes dynamically
  $(window).resize(() => {
    toggleButtonVisibility();
  });

  const button = $(".btn-scroll-top");
  const scrollToTop = () => {
    button.on("click", function () {
      // Find parent element and then find inner elements
      const parentElement = $(this).parent();
      const target = parentElement.find(".inner-nav-links"); // Target element with class 'inner-nav-links'
      const target_select = parentElement.find(".ae-section-selector"); // Target element with class 'ae-section-selector'

      // Calculate scroll top position based on target element's offset
      const top_link = target.offset().top - 100;
      const top_select = target_select.offset().top - 50;

      // Check window width and animate scroll accordingly
      if ($(window).width() > 768) {
        $("html, body").animate(
          {
            scrollTop: top_link,
          },
          500
        );
      } else {
        $("html, body").animate(
          {
            scrollTop: top_select,
          },
          500
        );
      }
    });
  };
  scrollToTop();
  $(window).resize(() => {
    scrollToTop();
  });

  // $("p:has(.asset)").css("margin-bottom", "0px");

  function adjustLinks() {
    if ($(window).width() < 768) {
      $(".nav-link").each(function () {
        var text = $(this).text().trim();
        var wordCount = text.split(/\s+/).length;
        if (wordCount > 2) {
          $(this).attr("data-words", "more-than-2");
          var words = text.split(" ");
          $(this).html(
            words.slice(0, 2).join(" ") + " <br> " + words.slice(2).join(" ")
          );
        }
      });
    } else {
      // Reset the links if the window width is greater than or equal to 768px
      $(".nav-link").each(function () {
        if ($(this).attr("data-words") === "more-than-2") {
          $(this).html($(this).text().replace(/<br>/g, " "));
          $(this).removeAttr("data-words");
        }
      });
    }
  }
  // Find the max height of all nav items
  function adjustNavItemsHeight() {
    if (window.innerWidth < 768) {
      $(".ae-tab").each(function () {
        var maxHeight = 0;
        var $navItems = $(this).find(".nav-pills .nav-item");

        $navItems.each(function () {
          var height = $(this).height();
          if (height > maxHeight) {
            maxHeight = height;
          }
        });

        $navItems.height(maxHeight);
      });
    } else {
      // Reset heights if screen is wider than 768px
      $(".ae-tab .nav-pills .nav-item").css("height", "");
    }
  }

  adjustLinks();
  adjustNavItemsHeight();

  // Adjust heights on window resize
  $(window).resize(function () {
    adjustLinks();
    adjustNavItemsHeight();
  });

  // Offset script for accordion component
  $(".accordion-wrap").each(function () {
    var accordion_wrap = $(this);
    accordion_wrap.find(".accordion-button").on("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      var accordion_button = $(this); // Get the clicked .accordion-button
      var accordion_item = accordion_button.closest(".accordion-item");
      // First expand/collapse the accordion item
      accordion_item
        .find(".accordion-collapse")
        .on("shown.bs.collapse", function () {
          // Get the offset of the current .accordion-button
          var offset = accordion_button.offset();
          if (offset) {
            var scrollTopValue =
              $(window).width() <= 768 ? offset.top - 80 : offset.top - 100;
            $("html, body").animate(
              {
                scrollTop: scrollTopValue,
              },
              300 // Change the duration here
            );
          }
        });
      // Toggle the collapse state
      accordion_item.find(".accordion-collapse").collapse("toggle");
    });
  });

});
