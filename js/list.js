let listItems = document.querySelectorAll(".list ul li");
const listUL = document.querySelector(".list ul");

const listLi = songData
  .map((item, index) => {
    return `
    <li>
      <span>${index + 1}.${filesName(index)}——${filesSinger(index)}</span>
       <span><i data-id="${index}" class="iconfont icon-bofang"></i></span>
      </li>
    `;
  })
  .join(" ");

listUL.innerHTML = listLi;
const listItem = document.querySelectorAll(".list ul i");

//更新图标状态
const updateList = (id) => {
  listItem.forEach((item) => {
    item.classList.remove("icon-bofangzhong");
    item.classList.add("icon-bofang");
    listItem[id].classList.remove("icon-bofang");
    listItem[id].classList.add("icon-bofangzhong");
  });
};

const audioPause = (id) => {
  listItem.forEach((item) => {
    item.classList.remove("icon-bofangzhong");
    item.classList.add("icon-bofang");
    listItem[id].classList.remove("icon-bofangzhong");
    listItem[id].classList.add("icon-bofang");
  });
};

//选定指定歌曲
list.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    let id = e.target.dataset.id;
    changeSong(id);
    audio.play();
    songPlay();
    //修改歌词
    changeLrc(id);
    //更新图标状态
    updateList(id);

    updateCachedColors();

    songIndex = id;
  }
});
