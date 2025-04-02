document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const closePopup = document.getElementById("closePopup");

  // Test variable to force the pop-up to show immediately
  const test = false;

  // Checking...
  const hasVisited = localStorage.getItem("visited");

  if (test || !hasVisited) {

    const delay = test ? 0 : 30000;

    setTimeout(() => {
      popup.style.display = "block";
      overlay.style.display = "block"; 
      popup.classList.add("show");
      overlay.classList.add("show");
    }, delay);

    // Mark the user as visited
    if (!test) {
      localStorage.setItem("visited", "true");
    }
  }

  // Close the pop-up
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
    popup.classList.remove("show");
    overlay.classList.remove("show");
  });
});