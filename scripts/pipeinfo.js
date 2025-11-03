document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("payment");
  const status = document.getElementById("status");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const formData = new FormData(form);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwaoOgHfX5SHq9BJxJFZmlcz_If9aZMH4vQgRo5xhzOIb4WHBlfr5XAkmSM257FRDxEXw/exec";

    fetch(scriptURL, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      status.textContent = "Payment submitted successfully!";
      status.style.color = "green";
      form.reset();
    })
    .catch(error => {
      status.textContent = "Something went wrong. Please try again.";
      status.style.color = "red";
    });
  });
});
