function initializeBackgroundColorUpdater() {
  const img = document.querySelector(".cover img");
  function updateColorsAndStyles() {
    setColorsFromImage(img);
    updateCachedColors();
  }
  if (img.complete && img.naturalWidth !== 0) {
    updateColorsAndStyles();
  }
  img.onload = updateColorsAndStyles;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "src") {
        updateColorsAndStyles();
      }
    });
  });
  observer.observe(img, { attributes: true, attributeFilter: ["src"] });
}

function setColorsFromImage(img) {
  const dominantColor = getDominantColorFromImage(img);
  const textColor = getTextColorBasedOnBgColor(dominantColor);

  if (dominantColor && textColor) {
    const rgbDominantColor = rgbToString(dominantColor);
    const rgbTextColor = rgbToString(textColor);
    const listItems = document.querySelectorAll(".list ul li");
    const icons = document.querySelectorAll(".icon-geci, .icon-liebiao");

    document.body.style.backgroundColor = rgbDominantColor;
    document.body.style.color = rgbTextColor;
    document.querySelector(".lrc-container").style.backgroundColor =
      rgbDominantColor;
    document.querySelector(".list").style.backgroundColor = rgbDominantColor;

    for (let li of listItems) {
      li.style.borderColor = rgbTextColor;
    }

    for (let icon of icons) {
      icon.style.color = rgbTextColor;
    }
  }
}

function rgbToString(rgbArray) {
  if (!Array.isArray(rgbArray) || rgbArray.length !== 3) {
    console.error("Invalid RGB array:", rgbArray);
    return "rgb(0,0,0)";
  }
  const [r, g, b] = rgbArray;
  return `rgb(${r}, ${g}, ${b})`;
}

function getTextColorBasedOnBgColor(bgColor) {
  if (!bgColor) return null;
  const luminance =
    0.299 * bgColor[0] + 0.587 * bgColor[1] + 0.114 * bgColor[2];
  return luminance > 186 ? [0, 0, 0] : [255, 255, 255];
}

function getDominantColorFromImage(img) {
  try {
    const colorThief = new ColorThief();
    return colorThief.getColor(img);
  } catch (e) {
    // console.error("Failed to get dominant color:", e);
    return null;
  }
}

let cachedDominantColor = null;
let cachedTextColor = null;

function updateCachedColors() {
  const img = document.querySelector(".cover img");
  cachedDominantColor = getDominantColorFromImage(img);
  cachedTextColor = getTextColorBasedOnBgColor(cachedDominantColor);
}

function updateActiveLyricColor(index, dom) {
  let li = dom.ul.querySelector(".lrc-container .lrc-active");
  if (li) {
    li.classList.remove("lrc-active");
    li.style.color = defaultLyricColor;
  }
  li = dom.ul.children[index];
  if (li && cachedTextColor) {
    li.classList.add("lrc-active");
    li.style.color = rgbToString(cachedTextColor);
  }
}

const defaultLyricColor = "#666666";
window.addEventListener("load", initializeBackgroundColorUpdater);
