document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resource-form");
  const messageBox = document.getElementById("form-message");
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    messageBox.textContent = "";
    messageBox.className = "message-box";
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        messageBox.classList.add("text-success");
        messageBox.textContent =
          "✅ Success! Check your inbox for the download link.";
        form.reset();
      } else {
        messageBox.classList.add("text-danger");
        messageBox.textContent = "⚠️ Error submitting form. Try again later.";
      }
    } catch (error) {
      console.error(error);
      messageBox.classList.add("text-danger");
      messageBox.textContent = "🚫 Network issue. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
