window.addEventListener("load", function() {
  const form = document.getElementById('payment');
  form.addEventListener("submitbutton", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Success!");
    })
  });
});
