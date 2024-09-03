var ex = new EX({ offset: 200 }).init();

$(document).ready(function () {
  // Mobile menu
  $(".navbar-toggler").click(function () {
    $(".alaska-nav").toggleClass("open");
    $(".dropdown-wrapper, .inner-sub-menu, .sub-menu").removeClass("show");
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
        // Click handler for nav-link to open the dropdown
        $(".alaska-menu .nav-item.has-dropdown .nav-link .icon-angle-right").click(function (e) {
          e.preventDefault();
          $(this).closest(".nav-item").addClass("open");
          $(this).parent().siblings(".dropdown-wrapper").addClass("show");
        });

        // Event delegation for btn-back
        $(document).on("click", "nav .btn-back", function (e) {
          e.preventDefault();
          const _ = this;
          setTimeout(() => {
            $(_)
              .closest(".dropdown-wrapper , .sub-menu, .inner-sub-menu")
              .removeClass("show");
            $(".menu-text").html("Close");
          }, 300);
        });

        // Click handler to close the menu
        $("nav .btn-close").click(function () {
          $(".alaska-nav").removeClass("open");
          $(".mobile-menu-overlay").remove();
          $(".dropdown-wrapper, .inner-sub-menu, .sub-menu").removeClass("show");
        });
      }
    })
    .resize();
  $(document).ready(function () {
    function toggleNavItem() {
      if ($(window).width() > 1280) {
        $(document).on("click", function (event) {
          // Check if the click happened outside the .alaska-menu
          if (!$(event.target).closest(".alaska-menu").length) {
            // Remove 'active' class from all nav links
            $(".alaska-menu .nav-item.has-dropdown.active").removeClass(
              "active"
            );
            $("#overlay").remove();
          }
        });
      }
    }

    // Initial check
    toggleNavItem();

    // Handle window resize
    $(window).resize(function () {
      toggleNavItem();
    });
  });

  function toggleMenuOverlay() {
    if ($(window).width() >= 1280) {
      $(".alaska-menu .nav-item.has-dropdown .nav-link")
        .off("click")
        .on("click", function (event) {
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
            $(".dropdown-wrapper").removeClass("show");
            $(this)
              .closest(".alaska-menu")
              .find(".nav-item.has-dropdown.active")
              .removeClass("active");
            $(this).parent().addClass("active");
          }
        });
    } else {
      // Remove active class and overlay if window is resized to less than 1280px
      $(".alaska-menu .nav-item.has-dropdown.active").removeClass("active");
      $("#overlay").remove();
      $(".dropdown-wrapper").removeClass("show");
    }
  }
  toggleMenuOverlay();
  $(window).resize(function () {
    toggleMenuOverlay();
  });

  // Desktop Menu Dropdown Open script End //

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
  $('.has-sub-link .icon-arrow-right').on('click', function(e) {
    e.preventDefault();
    // Close any open sub-menus except for the one that was clicked
    $(this).parent().siblings('.sub-menu').addClass('show');
});

function handleSubMenuToggle() {
  if ($(window).width() >= 1280) {
      $(".has-submenu .icon-angle-right")
          .off("click")
          .on("click", function (e) {
              e.preventDefault(); // Prevent the default action of the anchor tag

              var $link = $(this).closest("a");
              var $submenu = $link.next(".inner-sub-menu");

              // Close all open submenus except the one being clicked
              $(".inner-sub-menu").not($submenu).slideUp();
              $("a").not($link).removeClass("active");

              // Toggle the current submenu and the active class on the anchor tag
              $submenu.slideToggle();
              $link.toggleClass("active");
          });
  } else {
      // Handle submenu toggle for smaller screens
      $(".has-submenu .icon-angle-right").off("click").on("click", function(e) {
          e.preventDefault();

          var $submenu = $(this).closest("a").next(".inner-sub-menu");

          // Toggle the 'show' class on the associated submenu
          $submenu.toggleClass("show");
      });
  }
}

// Call the function on page load and window resize
$(document).ready(handleSubMenuToggle);
$(window).resize(handleSubMenuToggle);

  // Run on page load
  $(document).ready(handleSubMenuToggle);

  // Run on window resize
  $(window).resize(handleSubMenuToggle);
  
});
