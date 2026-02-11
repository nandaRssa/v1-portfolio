/*LOADING SCREEN*/
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const content = document.getElementById("main-web-content");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    content.style.opacity = "1";
  }, 3500);
});
/* NAVBAR & HAMBURGER - PREMIUM VERSION */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    console.log(
      "Menu Status:",
      navLinks.classList.contains("active") ? "Open" : "Closed",
    );
  });

  document.querySelectorAll("#nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}
/*FORM CONTACT*/
const form = document.getElementById("form");
const result = document.getElementById("result");
const btnText = document.getElementById("btn-text");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    btnText.innerText = "Sending...";
    result.style.color = "#ffffff";
    result.innerText = "Please wait...";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status == 200) {
          result.style.color = "#6ceeff";
          result.innerText = "Pesan berhasil terkirim!";
          form.reset();
        } else {
          result.style.color = "#ff4d4d";
          result.innerText = jsonResponse.message;
        }
      })
      .catch((error) => {
        result.innerText = "Something went wrong!";
      })
      .then(function () {
        btnText.innerText = "Send Message";
        setTimeout(() => {
          result.innerText = "";
        }, 5000);
      });
  });
}
