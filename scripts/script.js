const instructionbtn = document.querySelector(".options__instructions");
const instructionsModal = document.querySelector(".instructionsModal");
const modalCloseBtn = document.querySelector(".instructionsModal__closeButton");

// Open instructions modal.
instructionbtn.addEventListener("click", () => {
  instructionsModal.style.display = "flex";
});

// Close instructions modal.
modalCloseBtn.addEventListener("click", () => {
  instructionsModal.style.display = "none";
});
