    // 산업 카드 hover background
document.querySelectorAll(".industry-item").forEach((item) => {
  const bg = item.dataset.bg;
  if (bg) item.style.backgroundImage = `url("${bg}")`;
});

    // 포트폴리오 데이터 생성
    const createItems = (prefix, count, title) => {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    return {
      image: `${prefix}-${index}.jpg`,
      title: `${title} ${index}`,
    };
  });
};

const portfolioData = {
  mach: createItems("macpart", 36, "기계 파츠"),
  plastic: createItems("plastic", 11, "플라스틱"),
  sheet: createItems("sheet", 15, "시트메탈"),
};

const trackMap = {
  mach: document.getElementById("mach-track"),
  plastic: document.getElementById("plastic-track"),
  sheet: document.getElementById("sheet-track"),
};

const renderPortfolioTrack = (trackEl, items) => {
  trackEl.innerHTML = items
    .map(
      (item) => `
        <article class="portfolio-item">
          <div class="thumb">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
        </article>
      `
    )
    .join("");
};

Object.entries(portfolioData).forEach(([key, items]) => {
  renderPortfolioTrack(trackMap[key], items);
});

// 좌우 스크롤 버튼
document.querySelectorAll(".track-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const trackKey = button.dataset.track;
    const dir = Number(button.dataset.dir);
    const track = trackMap[trackKey];
    const scrollAmount = 435 * dir;
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
});

const machineItems = [
  {
    image: "machines1.jpg",
    name: "Zyang L2014B",
    desc: "Double Column Milling Center 78.7” X55” Capacity With 18” Rotary Table",
  },
  {
    image: "machines2.jpg",
    name: "Brother  M140X2",
    desc: "5-Axis Machining Center 8” x 15” x 12” Capacity",
  },
  {
    image: "machines3.jpg",
    name: "Matsuura MX-520",
    desc: "5-Axis Milling Center 25”x22”x20” Capacity",
  },
  {
    image: "machines4.jpg",
    name: "Fanuc α-D21MiA",
    desc: "Machining Center w/Tsudakoma 5-Axis Table",
  },
  {
    image: "machines5.jpg",
    name: "Zyang V11L",
    desc: "CNC Machining Center 43” X 23.5” Capacity w/ 5-Axis Rotary Table",
  },
  {
    image: "machines6.jpg",
    name: "HS-G3015X",
    desc: "Laser Cutting Machine - HSG LASER HS-G3015X 12,000W",
  },
  {
    image: "machines7.jpg",
    name: "Spring SPR-DX51",
    desc: "Extrude Hone Deburr Machine",
  },
  {
    image: "machines8.jpg",
    name: "Expert 22108",
    desc: "LEAD CMM with Reinshaw Head - Expert 22108, Max Work Size: 86” x 39” x 31.5”",
  },
];

const machineTabData = {
  0: "mac-list-1.jpg",
  1: "mac-list-2.jpg",
  2: "mac-list-3.jpg",
  3: "mac-list-4.jpg",
  4: "mac-list-5.jpg",
};

const machinesMainTrack = document.getElementById("machines-main-track");
const machineLargeImage = document.getElementById("machine-large-image");
const machineTabs = document.querySelectorAll(".machine-tab");

const renderMachineGallery = (trackEl, items) => {
  trackEl.innerHTML = items
    .map(
      (item) => `
        <article class="machine-card">
          <div class="machine-thumb">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />

            <div class="machine-overlay">
              <span class="machine-name">${item.name}</span>
              <p class="machine-desc">${item.desc}</p>
            </div>
          </div>
        </article>
      `
    )
    .join("");
};

renderMachineGallery(machinesMainTrack, machineItems);

machineTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabIndex = tab.dataset.tab;

    machineTabs.forEach((btn) => btn.classList.remove("is-active"));
    tab.classList.add("is-active");

    if (machineLargeImage) {
      machineLargeImage.src = machineTabData[tabIndex];
      machineLargeImage.alt = `설비 이미지 ${Number(tabIndex) + 1}`;
    }
  });
});

document.querySelectorAll(".track-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const trackKey = button.dataset.track;
    const dir = Number(button.dataset.dir);

    const trackMapExtended = {
      mach: document.getElementById("mach-track"),
      plastic: document.getElementById("plastic-track"),
      sheet: document.getElementById("sheet-track"),
      "machines-main": document.getElementById("machines-main-track"),
    };

    const track = trackMapExtended[trackKey];
    if (!track) return;

    const gap = 20;
    const cardWidth = track.firstElementChild
      ? track.firstElementChild.getBoundingClientRect().width
      : 320;

    track.scrollBy({
      left: (cardWidth + gap) * 2 * dir,
      behavior: "smooth",
    });
  });
});



const langSwitch = document.querySelector(".lang-switch");
const langOptions = document.querySelectorAll(".lang-option");
const translatableEls = document.querySelectorAll("[data-ko][data-en]");

let currentLang = "ko";

function setLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = lang;
  document.body.classList.toggle("en", lang === "en");
  document.body.classList.toggle("ko", lang === "ko");

  langOptions.forEach((el) => {
    el.classList.toggle("is-active", el.dataset.lang === lang);
  });

  translatableEls.forEach((el) => {
    const nextText = el.dataset[lang];
    const check = el.querySelector(".check");

    if (check) {
      el.innerHTML = `<span class="check">✓</span>${nextText}`;
    } else {
      el.textContent = nextText;
    }
  });
}

if (langSwitch) {
  langSwitch.addEventListener("click", () => {
    const nextLang = currentLang === "ko" ? "en" : "ko";
    setLanguage(nextLang);
  });
}

setLanguage("ko");