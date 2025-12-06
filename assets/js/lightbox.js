// Simple image lightbox for elements with class "lb-img"
document.addEventListener("click", function (e) {
  if (e.target.classList && e.target.classList.contains("lb-img")) {
    openLightbox(e.target.getAttribute("src"));
  }
});

function openLightbox(src) {
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<img src="' + src + '"><span class="close">×</span>';
  document.body.appendChild(lb);

  lb.addEventListener("click", function (e) {
    if (e.target.classList.contains("close") || e.target === lb) {
      lb.remove();
    }
  });
}
