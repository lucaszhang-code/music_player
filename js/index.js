// 强制刷新页面
function forceReload() {
  window.location.reload(true);
}

const audio = document.querySelector("audio");
const playButton = document.querySelector("#playButton");
const coverImg = document.querySelector(".container .cover img");
const cover = document.querySelector(".container .cover");

//播放模块
playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.classList.remove("icon-bofang");
    playButton.classList.add("icon-zanting");
    coverImg.classList.add("cover-active");
    updateList(songIndex);
  } else {
    audio.pause();
    playButton.classList.remove("icon-zanting");
    playButton.classList.add("icon-bofang");
    cover.style.boxShadow = `none`;
    coverImg.classList.remove("cover-active");
    audioPause(songIndex);
  }
});

const nowTime = document.querySelector(".container .now-time");
const endTime = document.querySelector(".container .end-time");

//进度条
const barNow = document.querySelector(".bar .bar-now");

const songModel = document.querySelector(".other .songModel");

// 监听loadedmetadata事件来设置总时间
audio.addEventListener("loadedmetadata", () => {
  endTime.innerHTML = timeChange(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  nowTime.innerHTML = timeChange(audio.currentTime);

  // 仅当audio.duration不是NaN时才更新进度条和其他内容
  if (!isNaN(audio.duration)) {
    let value = (audio.currentTime / audio.duration) * 100;
    barNow.style.width = value + "%";

    // 使用一个阈值来检查音频是否已经结束
    let isAudioEnd = audio.currentTime / audio.duration >= 0.99;

    if (isAudioEnd) {
      if (songModel.firstElementChild.classList.contains("icon-danquxunhuan")) {
        audio.currentTime = 0;
        audio.play();
      } else if (
        songModel.firstElementChild.classList.contains("icon-shunxubofang")
      ) {
        nextSong.click();
        audio.play();
      }
    }
  }
});

//转换时间
const timeChange = (time) => {
  let minute = parseInt(time / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = parseInt(time % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//选定进度条时间
const bar = document.querySelector(".container .bar");
const barWidth = bar.clientWidth;
console.log(bar.offsetLeft);
bar.addEventListener("click", (e) => {
  let clickX = e.offsetX;
  let value = (clickX / barWidth) * 100;
  barNow.style.width = value + "%";
  audio.currentTime = (audio.duration * clickX) / barWidth;
});

//点击歌词按钮展开歌词
const lrcBtn = document.querySelector(".container .icon-geci");
const lrcContainer = document.querySelector(".lrc-container");
const lrcWidth = lrcContainer.clientWidth;
const container = document.querySelector(".container");

lrcBtn.addEventListener("click", () => {
  if (!document.querySelector(".container .lrcBtn-active")) {
    lrcBtn.classList.add("lrcBtn-active");
    lrcContainer.classList.add("lrcContainer-active");
  } else {
    lrcBtn.classList.remove("lrcBtn-active");
    lrcContainer.classList.remove("lrcContainer-active");
  }
});

//点击歌词关闭图标关闭歌词界面
const closeLrcBtn=document.querySelector('#close-lrc')
closeLrcBtn.addEventListener('click',()=>{
  lrcBtn.classList.remove("lrcBtn-active");
  lrcContainer.classList.remove("lrcContainer-active");
})

//点击歌曲列表展开歌曲列表
const list = document.querySelector(".list");
const listBtn = document.querySelector(".container .icon-liebiao");
listBtn.addEventListener("click", () => {
  if (!document.querySelector(".container .listBtn-active")) {
    list.classList.add("list-active");
    listBtn.classList.add("listBtn-active");
  } else {
    list.classList.remove("list-active");
    listBtn.classList.remove("listBtn-active");
  }
});

//点击歌曲列表关闭图标关闭歌词界面
const closeListBtn=document.querySelector('#list-close')
closeListBtn.addEventListener('click',()=>{
  list.classList.remove("list-active");
  listBtn.classList.remove("listBtn-active");
})

//把songData的数据填入相应的位置

const songName = document.querySelector(".song-name");
const songSinger = document.querySelector(".song-singer");

const changeSong = (i) => {
  songName.innerHTML = filesName(i) || "未知";
  songSinger.innerHTML = filesSinger(i) || "未知";
  coverImg.src = songData[i].cover;
  audio.src = songData[i].url;
};
changeSong(songIndex);

//判断音乐是否在播放
const songPlay = () => {
  if (audio.play) {
    playButton.classList.remove("icon-bofang");
    playButton.classList.add("icon-zanting");
    coverImg.classList.add("cover-active");
    setTimeout(() => {
      cover.style.boxShadow = ` 0px 0px 2px 2px rgb(160, 160, 160)`;
    }, 500);
  } else {
    playButton.classList.remove("icon-zanting");
    playButton.classList.add("icon-bofang");
    cover.style.boxShadow = `none`;
    coverImg.classList.remove("cover-active");
  }
};

//下一首
const nextSong = document.querySelector("#xiayishou");
nextSong.addEventListener("click", () => {
  songIndex++;
  if (songIndex === songData.length) songIndex = 0;
  changeSong(songIndex);
  audio.play();
  songPlay();
  //修改歌词
  changeLrc(songIndex);
  //更新图标状态
  if (audio.paused === false) updateList(songIndex);

  updateBackgroundColorFromCover();
});

//上一首
const prevSong = document.querySelector("#shangyishou");
prevSong.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) songIndex = songData.length - 1;
  changeSong(songIndex);
  audio.play();
  songPlay();
  //修改歌词
  changeLrc(songIndex);
  if (audio.paused === false) updateList(songIndex);

  updateBackgroundColorFromCover();
});

//静音
const volumeBtn = document.querySelector(".other .volume");
volumeBtn.addEventListener("click", () => {
  if (volumeBtn.firstElementChild.classList.contains("icon-shengyin_shiti")) {
    audio.volume = 0;
    volumeBtn.firstElementChild.classList.remove("icon-shengyin_shiti");
    volumeBtn.firstElementChild.classList.add("icon-jingyin");
  } else {
    audio.volume = 1;
    volumeBtn.firstElementChild.classList.remove("icon-jingyin");
    volumeBtn.firstElementChild.classList.add("icon-shengyin_shiti");
  }
});

//单曲循环or顺序播放
songModel.addEventListener("click", () => {
  if (songModel.firstElementChild.classList.contains("icon-danquxunhuan")) {
    songModel.firstElementChild.classList.remove("icon-danquxunhuan");
    songModel.firstElementChild.classList.add("icon-shunxubofang");
  } else {
    songModel.firstElementChild.classList.remove("icon-shunxubofang");
    songModel.firstElementChild.classList.add("icon-danquxunhuan");
  }
});


