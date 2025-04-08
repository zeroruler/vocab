let englishHidden = false;
let koreanHidden = false;
let wordPairs = [];

async function loadWords() {
  const response = await fetch("words.txt");
  const text = await response.text();
  const lines = text.trim().split("\n");

  wordPairs = lines
    .map((line) => line.split(":").map((x) => x.trim()))
    .filter((pair) => pair.length === 2);

  renderWords();
}

function renderWords() {
  const list = document.getElementById("word-list");
  list.innerHTML = "";

  wordPairs.forEach(([eng, kor]) => {
    const li = document.createElement("li");

    const engSpan = document.createElement("span");
    engSpan.textContent = eng;
    engSpan.classList.add("eng");

    const korSpan = document.createElement("span");
    korSpan.textContent = kor;
    korSpan.classList.add("kor");

    li.appendChild(engSpan);
    li.appendChild(korSpan);
    list.appendChild(li);
  });

  applyHiding();
}

function toggleEnglish() {
  englishHidden = !englishHidden;
  applyHiding();

  const engBtn = document.getElementById("toggle-eng-btn");
  engBtn.textContent = englishHidden
    ? "Englisch anzeigen"
    : "Englisch ausblenden";
}

function toggleKorean() {
  koreanHidden = !koreanHidden;
  applyHiding();

  const korBtn = document.getElementById("toggle-kor-btn");
  korBtn.textContent = koreanHidden
    ? "Koreanisch anzeigen"
    : "Koreanisch ausblenden";
}

function applyHiding() {
  document.querySelectorAll(".eng").forEach((el) => {
    el.classList.toggle("hidden", englishHidden);
  });
  document.querySelectorAll(".kor").forEach((el) => {
    el.classList.toggle("hidden", koreanHidden);
  });
}

loadWords();
