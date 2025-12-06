// Dark mode theme toggle
(function () {
  const body = document.body;
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  const stored = localStorage.getItem("fhfcTheme");
  if (stored === "dark") {
    body.classList.add("dark-mode");
  }

  toggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    localStorage.setItem("fhfcTheme", body.classList.contains("dark-mode") ? "dark" : "light");
  });
})();
