const changeLrc = (i) => {
  const dom = {
    audio: document.querySelector("audio"),
    ul: document.querySelector(".lrc-container ul"),
    container: document.querySelector(".lrc-container"),
  };

  dom.ul.innerHTML = "";

  const paraseTime = (timeStr) => {
    const parts = timeStr.split(":");
    return parts[0] * 60 + +parts[1];
  };

  const paraseLrc = () => {
    const lines = lrc[i].split("\n");
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      let str = lines[i];
      const parts = str.split("]");
      const timeStr = parts[0].substring(1);

      const lyricParts = parts[1] ? parts[1].split("<br>") : [];

      let obj = {
        time: paraseTime(timeStr),
        word: lyricParts[0] || "",
      };

      if (lyricParts[1]) {
        obj.word += `<br>${lyricParts[1]}`;
      }

      result.push(obj);
    }
    return result;
  };

  const lrcData = paraseLrc();

  const findIndex = () => {
    const currentTime = dom.audio.currentTime;
    for (let i = 0; i < lrcData.length; i++) {
      if (currentTime < lrcData[i].time) {
        return i - 1;
      }
    }
    return lrcData.length - 1;
  };

  const createLrcElement = () => {
    for (let i = 0; i < lrcData.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = lrcData[i].word;
      dom.ul.appendChild(li);
    }
  };

  createLrcElement();

  let containerHeight = dom.container.clientHeight;

  const liHeightAll = dom.ul.querySelectorAll("li");

  let liHeights = [];
  let cumulativeHeights = [0]; // 累计高度的数组

  //累加目前的高度

  for (let i = 0; i < liHeightAll.length; i++) {
    liHeights.push(liHeightAll[i].clientHeight);
    cumulativeHeights.push(cumulativeHeights[i] + liHeights[i]);
  }

  let maxOffSet = dom.ul.clientHeight - containerHeight;

  const lrcContainerMarginTop = dom.ul.querySelector("li");
  const computedStyle = window.getComputedStyle(lrcContainerMarginTop);
  const marginTop = computedStyle.marginTop;
  const marginTopValue = marginTop.split("px");
  const setOffset = () => {
    let index = findIndex();
    let liHeight = cumulativeHeights[index];
    let offset =
      liHeight +
      liHeights[index] / 2 +
      (index + 6) * marginTopValue[0] -
      containerHeight / 2;

    if (offset < 0) offset = 0;
    // else if (offset > maxOffSet) offset = maxOffSet;
    dom.ul.style.transform = `translateY(-${offset}px)`;

    let li = dom.ul.querySelector(".lrc-active");
    if (li) {
      li.classList.remove("lrc-active");
      li.style.color = defaultLyricColor; // 恢复默认颜色
    }

    li = dom.ul.children[index];
    if (li) {
      li.classList.add("lrc-active");
      updateActiveLyricColor(index, dom); // 修改这里，传入 dom 而不是 li
    }

    //模糊程度不同

    document
      .querySelectorAll(".lrc-container ul li")
      .forEach((item) => item.classList.remove("lrc-active2"));
    dom.ul.children[index + 1].classList.add("lrc-active2");
  };

  dom.audio.addEventListener("timeupdate", setOffset);
};

changeLrc(songIndex);
