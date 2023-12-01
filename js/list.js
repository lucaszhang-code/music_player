let listItems = document.querySelectorAll(".list ul li");
const listUL = document.querySelector(".list ul");


const renderList= ()=> {
  // 更新列表的代码，这取决于你的HTML结构
  listUL.innerHTML = songData
      .map((item, index) => {
        if (index == songIndex) {
          return '';
        }
        return `
      <li>
        <span><img src="${songData[index].coverMini}" /><div><div class="filename">${filesName(index)}</div><div>${filesSinger(index)}</div></div></span>
         <span><i data-id="${index}" class="iconfont icon-bofang"></i></span>
        </li>
      `;
      })
      .join(" ");
}

const playNow=document.querySelector('.playNow');
const playNowSongName=document.querySelector('.playNowSongName');
const playNowSinger=document.querySelector('.playNowSinger');
const songNow=(songIndex)=>{
  playNow.firstElementChild.src=songData[songIndex].coverMini;
  playNowSongName.innerHTML=filesName(songIndex);
  playNowSinger.innerHTML=filesSinger(songIndex);
}


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

    songNow(id);

    bgImage(id)
    textScroll()
    songIndex = id;
  }
});

list.addEventListener('touchmove', function(event) {
  event.stopPropagation();
}, false);

