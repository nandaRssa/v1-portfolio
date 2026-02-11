window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const content = document.getElementById("main-web-content");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    content.style.opacity = "1";
  }, 3500); // 3.5 detik supaya transisi neonnya berasa
});

const form = document.getElementById("form");
const result = document.getElementById("result");
const btnText = document.getElementById("btn-text");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Efek loading sederhana
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
        result.style.color = "#6ceeff"; // Warna neon blue Anda
        result.innerText = "Pesan berhasil terkirim!";
        form.reset();
      } else {
        console.log(response);
        result.style.color = "#ff4d4d";
        result.innerText = jsonResponse.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerText = "Something went wrong!";
    })
    .then(function () {
      btnText.innerText = "Send Message";
      // Notifikasi hilang otomatis setelah 5 detik
      setTimeout(() => {
        result.innerText = "";
      }, 5000);
    });
});
