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

      // Ensure event handlers are not attached multiple times
      

      // Event delegation for btn-back
      $(document)
        .off("click", "nav .btn-back")  // Remove any previous click handlers
        .on("click", "nav .btn-back", function (e) {
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
      $("nav .btn-close")
        .off("click")  // Remove any previous click handlers
        .on("click", function () {
          $(".alaska-nav").removeClass("open");
          $(".mobile-menu-overlay").remove();
          $(".dropdown-wrapper, .inner-sub-menu, .sub-menu").removeClass("show");
        });
    


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
    $(window).resize(function () {
      toggleNavItem();
    });
    

    function toggleMenuOverlay() {
      // Remove previous event handlers to avoid duplication
      $(".alaska-menu .nav-item.has-dropdown .nav-link").off("click");
    
      if ($(window).width() >= 1280) {
        $(".alaska-menu .nav-item.has-dropdown .nav-link").on("click", function (event) {
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
            $(".dropdown-wrapper").removeClass("show");
            $(this)
              .closest(".alaska-menu")
              .find(".nav-item.has-dropdown.active")
              .removeClass("active");
            $(this).parent().addClass("active");
            $(this).parent().siblings(".dropdown-wrapper").addClass("show");
          }
        });
      } else {
        // Remove active class and overlay if window is resized to less than 1280px
        $("#overlay").remove();
        $(".dropdown-wrapper").removeClass("show");
        $(".alaska-menu .nav-item.has-dropdown.active").removeClass("active");
        $(".alaska-menu .nav-item.has-dropdown .nav-link .icon-angle-right").on("click", function (e) {
          e.preventDefault();
          $(this).parent().siblings(".dropdown-wrapper").addClass("show");
        });
    
        
      }
    }
    
    // Ensure the function runs on page load and on window resize
    $(document).ready(toggleMenuOverlay);
    $(window).resize(toggleMenuOverlay);
    

  // Desktop Menu Dropdown Open script End //

  // Script for Navlink Tab scroll Start //



  // Search popup script
  $(".alaska-menu .icon-search[type=button]").click(function () {
    $(this).toggleClass("btn-close").toggleClass("icon-search");
    $(".alaska-menu .form-search").slideToggle();
    $(".alaska-menu .form-search input").focus();
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
      $('.has-sub-link .icon-angle-right').on('click', function(e) {
        e.preventDefault();
        // Close any open sub-menus except for the one that was clicked
        $(this).parent().siblings('.sub-menu').addClass('show');
    });
  }
}
handleSubMenuToggle();
$(window).resize(function () {
  handleSubMenuToggle();
  $(".alaska-nav").removeClass("open");
});

 
  
});
