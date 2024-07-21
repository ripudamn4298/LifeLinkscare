document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelector('.navbar_menu');
  const hamburger = document.querySelector('.navbar_toggle');
  let isMenuOpen = false;

  if (menuLinks && hamburger) {
    hamburger.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from propagating
      
      isMenuOpen = !isMenuOpen; // Toggle the menu state
      
      hamburger.classList.toggle("active", isMenuOpen);
      menuLinks.classList.toggle("active", isMenuOpen);
//       This is equivalent to:
// javascriptCopyif (isMenuOpen) {
//   hamburger.classList.add("active");
//   menuLinks.classList.add("active");
// } else {
//   hamburger.classList.remove("active");
//   menuLinks.classList.remove("active");
// }
      console.log('Menu Links Active:', isMenuOpen);
    });

    // Close the menu when clicking outside or on the cross
    document.addEventListener('click', (event) => {
      if (isMenuOpen && !menuLinks.contains(event.target) && !hamburger.contains(event.target)) {
        isMenuOpen = false;
        hamburger.classList.remove("active");
        menuLinks.classList.remove("active");
        console.log('Menu Links Active:', isMenuOpen);
      }
    });
  }
  
  
  

  else {
    console.error('Menu or Hamburger element not found');
  }

  // Handle navbar links

  document.querySelectorAll('.navbar_links').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for internal links
      if (!this.getAttribute('href').includes('.html')) {
        e.preventDefault();
        
        // Smooth scrolling code for internal links
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Optional: Update URL without page reload
          history.pushState(null, '', this.getAttribute('href'));
        }
      }
    });
  });


  // Smooth scroll by Explore button
  const mainBtn = document.querySelector('.main__btn');
  if (mainBtn) {
    mainBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const servicesSection = document.querySelector('#services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  
  


  // Handle Dropdowns on About page
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  if(dropdownToggles.length > 0){
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
          const dropdownItem = this.closest('.dropdown-item');
          const dropdownContent = dropdownItem.querySelector('.dropdown-content');
          
          // Close other open dropdowns
          dropdownToggles.forEach(otherToggle => {
              if (otherToggle !== toggle) {
                  const otherItem = otherToggle.closest('.dropdown-item');
                  const otherContent = otherItem.querySelector('.dropdown-content');
                  otherItem.classList.remove('active');
                  otherContent.style.maxHeight = null;
                  otherContent.style.padding = null;
              }
          });
          
          // Toggle current dropdown
          dropdownItem.classList.toggle('active');
          if (dropdownItem.classList.contains('active')) {
              dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 30 + "px"; // 30px for padding
              dropdownContent.style.padding = "15px";
          } else {
              dropdownContent.style.maxHeight = null;
              dropdownContent.style.padding = null;
          }
      });
  });

}  
    


  

  // Handle loader visibility
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";

      setTimeout(() => {
        loader.remove();
      }, 500); // Remove the loader from the DOM after the fade-out transition
    }, 1000); // Adjust this delay as needed
  }
});
