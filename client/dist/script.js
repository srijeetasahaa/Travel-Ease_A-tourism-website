//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 2000;
let timeAutoNext = 4000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// swiper slider code

var TrandingSlider = new Swiper('.card-section-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 6.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function () {
          updateBackgroundImage(this.realIndex);
        },
        init: function () {
          updateBackgroundImage(this.realIndex); // Initial load
        }
      }
  });

function updateBackgroundImage(index) {
    const allSlides = document.querySelectorAll('.swiper-slide');
    const activeSlide = allSlides[index];
  
    if (activeSlide) {
      const activeImageSrc = activeSlide.querySelector('img').src;
  
      // Update the background image of the main section
      document.querySelector('.card-main-section').style.backgroundImage = `url(${activeImageSrc})`;
      document.querySelector('.card-main-section').style.backgroundSize = 'cover';
      document.querySelector('.card-main-section').style.backgroundPosition = 'center';
    }
  }
//   for smooth scroll


document.getElementById('home').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// reponsive nagivation

const toggleBtn = document.querySelector ('.toggle-nav');
const dropDownMenu = document.querySelector ('.dropdown-menu');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    
}


// popup in review button

document.addEventListener("DOMContentLoaded", () => {
    const showPopupButton = document.getElementById("showPopupButton");
    const emailPopup = document.getElementById("emailPopup");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopupButton = document.getElementById("closePopup");
    const submitEmailButton = document.getElementById("submitEmail");
    const errorMessage = document.getElementById("errorMessage");
    const emailInput = document.getElementById("emailInput");
    
    // Show popup and overlay
    showPopupButton.addEventListener("click", (event) => {
      event.preventDefault();
      emailPopup.classList.add("open-popup");
      popupOverlay.style.display = "block";
    });
    
    // Close popup and overlay
    const closePopup = () => {
      emailPopup.classList.remove("open-popup");
      popupOverlay.style.display = "none";
      errorMessage.style.display = "none"; // Reset error message
      emailInput.value = ""; // Clear email input
    };
    
    closePopupButton.addEventListener("click", closePopup);
    
    popupOverlay.addEventListener("click", closePopup);
    
    // Handle email submission
    submitEmailButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
    
      if (email === "") {
        alert("Please enter your email.");
        return;
      }
    
      // Check email on the server
      axios
        .get(`http://localhost:3001/api/check-email/${email}`)
        .then((response) => {
          if (response.data.exists) {
            // Redirect to reviews page
            window.location.href = "http://localhost:5173/reviews";
          } else {
            // Show error message and prompt to register
            showRegisterPrompt();
          }
        })
        .catch((error) => {
          console.error("Error checking email:", error);
        });
    });
    
    // Show the "Not Registered" message and redirect to the registration page
    function showRegisterPrompt() {
      // Hide error message (if any)
      errorMessage.style.display = "none";
      
      // Update the popup with the "Not Registered" message
      emailPopup.innerHTML = `
        <h2>Email not found</h2>
        <p style="color: red;">You are not registered. Please register to give a review.</p>
        <button id="redirectToRegister">OK</button>
      `;
      
      // Show the popup again with the updated content
      emailPopup.classList.add("open-popup");
      popupOverlay.style.display = "block";
  
      // Add event listener to "OK" button
      document.getElementById("redirectToRegister").addEventListener("click", () => {
        // Redirect to the registration page
        window.location.href = "http://localhost:5173/register";
      });
    }
  });
  