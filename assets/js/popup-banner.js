function createPopup() {
  const popup = document.createElement("div");
  popup.id = "referral-popup";

  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-header">
        <h2>Exclusive Offers</h2>
        <button class="close-button" onclick="closePopup()">&times;</button>
      </div>
      <div class="popup-body">
        <p>Check out these amazing tools that I personally recommend:</p>
        
        <div class="referral-links">
          <a href="https://www.gohighlevel.com/?fp_ref=jedybrown" target="_blank" class="referral-link">
            <img src="assets/img/ghl-logo.png" alt="GoHighLevel Logo" class="referral-logo">
            <div class="referral-text">
              <h3>GoHighLevel</h3>
              <p>All-in-one marketing platform to grow your business like a boss.</p>
            </div>
          </a>
          
          <a href="https://getcleva.com/refer/JEDI912" target="_blank" class="referral-link">
            <img src="assets/img/cleva-logo.png" alt="Cleva Logo" class="referral-logo">
            <div class="referral-text">
              <h3>Cleva</h3>
              <p>Get USD Card, USA Bank account and transact in Naira</p>
            </div>
          </a>

          <a href="https://www.fiverr.com/s/BRrrK31" target="_blank" class="referral-link">
            <img src="assets/img/fiverr-logo.png" alt="Cleva Logo" class="referral-logo">
            <div class="referral-text">
              <h3>Fiverr</h3>
              <p>Get your custom solution using my Fiverr Gig</p>
            </div>
          </a>


        </div>
      </div>
      <div class="popup-footer">
        <button class="popup-button" onclick="closePopup()">Continue to Site</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);
}

function showPopup() {
  if (sessionStorage.getItem("popupShown") !== "true") {
    setTimeout(() => {
      const popup = document.getElementById("referral-popup");
      popup.style.display = "flex";
      sessionStorage.setItem("popupShown", "true");
    }, 3000);
  }
}

function closePopup() {
  document.getElementById("referral-popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  createPopup();
  showPopup();
});
