console.log("Home frontend javascript file");

document.addEventListener("DOMContentLoaded", function () {
  const vantaEl = document.querySelector("#vanta-bg");

  VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xc97c3d,
    backgroundColor: 0x234f3c,
    points: 10,
    maxDistance: 20,
    spacing: 15,
    showDots: true,
  });
});
