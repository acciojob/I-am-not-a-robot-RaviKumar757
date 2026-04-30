//your code here
const grid = document.getElementById("grid");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

let selected = [];
let images = [];

// ✅ 5 unique images
const baseImages = [
  "https://picsum.photos/id/101/200",
  "https://picsum.photos/id/102/200",
  "https://picsum.photos/id/103/200",
  "https://picsum.photos/id/104/200",
  "https://picsum.photos/id/105/200"
];

// ✅ shuffle function
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ✅ setup images
function loadImages() {
  grid.innerHTML = "";
  selected = [];
  para.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  let temp = [...baseImages];

  // pick random duplicate
  let randomIndex = Math.floor(Math.random() * temp.length);
  temp.push(temp[randomIndex]);

  images = shuffle(temp);

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.id = src;

    img.addEventListener("click", () => handleClick(img));
    grid.appendChild(img);
  });
}

// ✅ handle click
function handleClick(img) {
  if (selected.includes(img)) return;
  if (selected.length === 2) return;

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// ✅ reset
resetBtn.addEventListener("click", () => {
  loadImages();
});

// ✅ verify
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected[0].dataset.id === selected[1].dataset.id) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// initial load
loadImages();