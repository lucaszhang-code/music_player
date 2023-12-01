function initializeBackgroundColorUpdater() {
  const img = document.querySelector(".cover img");

  function updateColorsAndStyles() {
    if (img.complete && img.naturalWidth !== 0) {
      const dominantColor = getDominantColorFromImage(img);
      const textColor = getTextColorBasedOnBgColor(dominantColor);

      if (dominantColor && textColor) {
        applyColorsToPage(dominantColor, textColor);
      }
    }
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

function applyColorsToPage(dominantColor, textColor) {
  const rgbDominantColor = rgbToString(dominantColor);
  const rgbTextColor = rgbToString(textColor);

  document.body.style.backgroundColor = rgbDominantColor;
  document.body.style.color = rgbTextColor;
  document.querySelector('.list').style.backgroundColor = rgbDominantColor;

  // Update other elements as needed
  const listItems = document.querySelectorAll(".list ul li");
  const icons = document.querySelectorAll(".icon-geci, .icon-liebiao");

  listItems.forEach(li => li.style.borderColor = rgbTextColor);
  icons.forEach(icon => icon.style.color = rgbTextColor);
}

function rgbToString(rgbArray) {
  return `rgb(${rgbArray.join(", ")})`;
}

function getTextColorBasedOnBgColor(bgColor) {
  const luminance = 0.299 * bgColor[0] + 0.587 * bgColor[1] + 0.114 * bgColor[2];
  return luminance > 186 ? [0, 0, 0] : [255, 255, 255];
}

function getDominantColorFromImage(img) {
  try {
    const colorThief = new ColorThief();
    return colorThief.getColor(img);
  } catch (e) {
    console.error("Failed to get dominant color:", e);
    return null;
  }
}

const defaultLyricColor = "#666666";

function updateActiveLyricColor(index, dom) {
  let li = dom.ul.querySelector(".lrc-active");
  if (li) {
    li.classList.remove("lrc-active");
    li.style.color = defaultLyricColor;
  }

  li = dom.ul.children[index];
  if (li) {
    li.classList.add("lrc-active");
    li.style.color = document.body.style.color;
  }
}

window.addEventListener("load", initializeBackgroundColorUpdater);
