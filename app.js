const btnsFilter = document.querySelectorAll(".btns button");
const titleEl = document.querySelector(".filter_applicate");
const precent = document.querySelector(".percent");
const inputRange = document.querySelector(".inp input");
const image = document.querySelector(".image img");
const btnsLip = document.querySelectorAll(".buttons_lip i");
const refreshBtn = document.querySelector(".refresh");
const chooseBtn = document.querySelector(".choose");
const fileEl = document.querySelector(".file");
const saveBtn = document.querySelector(".save");

// console.log(btnsLip);
let brightness = 0,
  saturate = 0,
  invert = 0,
  grayscale = 0;
let rotateleft = 90,
  fliped = 1;

refreshBtn.addEventListener("click", () => {
  image.style.filter = ` brightness(100%) saturate(100%) invert(0%) grayscale(0%)`;
  image.style.transform = ` scale(1, 1)`;
});

btnsFilter.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active");
    btn.classList.add("active");
    titleEl.innerText = btn.id;
  });
});

inputRange.addEventListener("input", (e) => {
  precent.innerText = e.target.value + "%";
  if (titleEl.innerText === "saturate") {
    // image.style.filter = `saturate(${inputRange.value}%)`;
    // inputRange.min = "0";
    // inputRange.max = "200";
    // inputRange.step = "1";
    saturate = inputRange.value;
  } else if (titleEl.innerText === "grayscale") {
    // image.style.filter = `grayscale(${inputRange.value}%)`;
    // inputRange.min = "0";
    // inputRange.max = "100";
    // inputRange.step = "1";
    grayscale = inputRange.value;
  } else if (titleEl.innerText === "inversion") {
    // image.style.filter = `invert(${inputRange.value}%)`;
    // inputRange.min = "0";
    // inputRange.max = "100";
    // inputRange.step = "1";
    invert = inputRange.value;
  } else {
    // image.style.filter = `brightness(${Math.floor(inputRange.value)}%)`;
    // inputRange.min = "0";
    // inputRange.max = "100";
    // inputRange.step = "1";
    brightness = inputRange.value;
  }

  image.style.filter = `grayscale(${grayscale}%) invert(${invert}%) saturate(${saturate}%) brightness(${brightness}%)`;
});

const flip = (e) => {
  if (e.target.id == "left") {
    image.style.transform = `rotate(${(rotateleft += 90)}deg)`;
    rotateleft > 360 ? (rotateleft = 90) : rotateleft;
  } else if (e.target.id == "right") {
    image.style.transform = `rotate(${(rotateleft -= 90)}deg)`;
    rotateleft < -360 ? (rotateleft = -90) : rotateleft;
    console.log(rotateleft);
  } else if (e.target.id === "simple") {
    fliped = fliped === 1 ? 0.5 : 1;
    image.style.transform = `scale(${fliped}, 1)`;
  } else {
    fliped = fliped === 1 ? 0.5 : 1;
    image.style.transform = `scale(1, ${fliped})`;
    console.log(fliped);
  }
};

btnsLip.forEach((icon) => {
  icon.addEventListener("click", flip);
});

fileEl.addEventListener("change", () => {
  let file = fileEl.files[0];
  if (!file) return;
  image.src = URL.createObjectURL(file);
});

chooseBtn.addEventListener("click", () => fileEl.click());

saveBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.clientWidth;
  canvas.height = image.clientHeight;
  ctx.filter = `brightness(${brightness}%) grayscale(${brightness}%) invert(${brightness}%) saturate(${brightness}%)`;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.rotate(rotateleft);
  ctx.scale(fliped, fliped);

  const link = document.createElement("a");
  link.download = Date.now();
  link.href = canvas.toDataURL();
  link.click();
});
