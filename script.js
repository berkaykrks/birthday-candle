document.addEventListener("DOMContentLoaded", () => {
  const flame = document.getElementById("flame");
  const instruction = document.getElementById("instruction");
  let extinguishing = false;

  function updateInstruction() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      instruction.innerText = "🔥 Muma dokun veya telefonu salla!";
    } else if (screenWidth < 1024) {
      instruction.innerText = "💻 Fare ile mumu söndürmeye çalış!";
    } else {
      instruction.innerText = "🖥 Fare ile mumu söndür!";
    }
  }

  updateInstruction();
  window.addEventListener("resize", updateInstruction);

  function extinguish() {
    if (extinguishing) return;
    extinguishing = true;

    instruction.style.display = "none";

    let opacity = 1;
    const interval = setInterval(() => {
      opacity -= 0.05;
      flame.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(interval);
        window.location.href = "birthday.html";
      }
    }, 100);
  }

  if (flame) {
    flame.addEventListener("mouseenter", extinguish);
    flame.addEventListener("click", extinguish);
    flame.addEventListener("touchstart", extinguish);
  }

  let lastShakeTime = 0;
  window.addEventListener("devicemotion", (event) => {
    const acceleration = event.accelerationIncludingGravity;
    const totalAcceleration = Math.sqrt(
      acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
    );

    const now = Date.now();
    if (totalAcceleration > 20 && now - lastShakeTime > 1000) {
      lastShakeTime = now;
      extinguish();
    }
  });
});
