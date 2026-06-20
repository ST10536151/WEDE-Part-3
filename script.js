document.addEventListener("DOMContentLoaded", function () {
  highlightActiveNavLink();
  setupGallery();
  setupVideo();
  setupEnquiryValidation();
  setupContactValidation();
});

function highlightActiveNavLink() {
  var currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") {
    currentPage = "index.html";
  }

  var navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupVideo() {
  var wrapper = document.getElementById("video-wrapper");
  if (!wrapper) {
    return;
  }

  wrapper.addEventListener("click", function () {
    var videoId = "hwJW6B86Slk";
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + videoId + "?autoplay=1");
    iframe.setAttribute("title", "A high-res 360 shot of Constitution Hill");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay; encrypted-media");

    wrapper.innerHTML = "";
    wrapper.appendChild(iframe);
  });
}

function setupGallery() {
  var gallery = document.querySelector(".gallery");
  if (!gallery) {
    return;
  }

  var images = gallery.querySelectorAll(".gallery-slide");
  var prevButton = gallery.querySelector(".gallery-prev");
  var nextButton = gallery.querySelector(".gallery-next");
  var dotsContainer = gallery.querySelector(".gallery-dots");
  var currentIndex = 0;

  images.forEach(function (image, index) {
    var dot = document.createElement("span");
    dot.classList.add("gallery-dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", function () {
      showSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  var dots = dotsContainer.querySelectorAll(".gallery-dot");

  function showSlide(index) {
    images[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");

    currentIndex = (index + images.length) % images.length;

    images[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  prevButton.addEventListener("click", function () {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    showSlide(currentIndex + 1);
  });

  setInterval(function () {
    showSlide(currentIndex + 1);
  }, 5000);
}

function setupEnquiryValidation() {
  var form = document.querySelector(".enquiry-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    var isValid = true;

    var fullname = document.getElementById("fullname");
    var email = document.getElementById("email");
    var visitDate = document.getElementById("visit-date");
    var visitors = document.getElementById("visitors");

    clearError(fullname);
    clearError(email);
    clearError(visitDate);
    clearError(visitors);

    if (fullname.value.trim() === "") {
      showError(fullname, "Please enter your full name.");
      isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }

    if (visitDate.value === "") {
      showError(visitDate, "Please choose a preferred visit date.");
      isValid = false;
    } else {
      var chosenDate = new Date(visitDate.value);
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      if (chosenDate < today) {
        showError(visitDate, "Please choose a date that has not already passed.");
        isValid = false;
      }
    }

    var visitorCount = Number(visitors.value);
    if (!visitors.value || visitorCount < 1 || visitorCount > 100) {
      showError(visitors, "Number of visitors must be between 1 and 100.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
}

function setupContactValidation() {
  var form = document.querySelector(".contact-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    var isValid = true;

    var name = document.getElementById("c-name");
    var email = document.getElementById("c-email");
    var message = document.getElementById("message");

    clearError(name);
    clearError(email);
    clearError(message);

    if (name.value.trim() === "") {
      showError(name, "Please enter your name.");
      isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }

    if (message.value.trim().length < 10) {
      showError(message, "Your message should be at least 10 characters long.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
}

function isValidEmail(value) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function showError(field, message) {
  field.classList.add("input-error");

  var errorText = document.createElement("span");
  errorText.classList.add("error-message");
  errorText.textContent = message;

  field.insertAdjacentElement("afterend", errorText);
}

function clearError(field) {
  field.classList.remove("input-error");

  var next = field.nextElementSibling;
  if (next && next.classList.contains("error-message")) {
    next.remove();
  }
}