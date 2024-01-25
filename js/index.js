const visionTip=document.querySelector('.vision-tip');
const tipClose=document.querySelector('#tip-close');
tipClose.addEventListener('click',()=>{
  visionTip.classList.add('visionTip-active1')
  setTimeout(()=>visionTip.classList.add('visionTip-active2'),500)
})

const audio = document.querySelector("audio");
const playButton = document.querySelector("#playButton");
const coverImg = document.querySelector(".container .cover img");
const cover = document.querySelector(".container .cover");

//文字长度超过父元素，文字滚动
const songInfo=document.querySelector('.song-info')
const playNowInfo=document.querySelector('.playNow-info')
const textScroll=()=>{
  if(songName.offsetWidth>songInfo.offsetWidth){
    songName.style.animation = 'scrollText 10s linear infinite';
  }
  else songName.style.animation=``

  if(songSinger.offsetWidth>songInfo.offsetWidth){
    songSinger.style.animation = 'scrollText 10s linear infinite';
  }
  else songSinger.style.animation=``

  if(playNowSongName.offsetWidth>playNowInfo.offsetWidth){
    playNowSongName.style.animation = 'scrollText 10s linear infinite';
  }
  else playNowSongName.style.animation = '';

  if(playNowSinger.offsetWidth>playNowInfo.offsetWidth){
    playNowSinger.style.animation = 'scrollText 10s linear infinite';
  }
  else playNowSinger.style.animation = '';
}

//播放模块
playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.classList.remove("icon-bofang2");
    playButton.classList.add("icon-a-zanting1");
    coverImg.classList.add("cover-active");
    updateList(songIndex);
  } else {
    audio.pause();
    playButton.classList.remove("icon-a-zanting1");
    playButton.classList.add("icon-bofang2");
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
  renderList();
  songNow(songIndex);
  bgImage(songIndex)
  textScroll()
});

//将背景颜色替换为背景图片
const bgImage=(songIndex)=>{
  document.body.style.backgroundImage=`url(${songData[songIndex].coverMini})`
  console.log(songData[songIndex].coverMini)
}

audio.addEventListener("timeupdate", () => {
  nowTime.innerHTML = timeChange(audio.currentTime);
  bgImage(songIndex)


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
const containerInfo = document.querySelector(".container-info");
const songinfo = document.querySelector(".container .song-info");
const containerControl = document.querySelector(
    ".container .container-control"
);

// 把lrcbtn清除操作写成一个函数
const removeLrcContainer = () => {
  lrcBtn.classList.remove("lrcBtn-active");
  lrcContainer.classList.remove("lrcContainer-active");
  cover.classList.remove("info-active");
  songinfo.classList.remove("songinfo-active");
  flag = false;
};

let flag = false;
console.log(flag);

lrcBtn.addEventListener("click", () => {
  if (!document.querySelector(".container .lrcBtn-active")) {
    lrcBtn.classList.add("lrcBtn-active");
    lrcContainer.classList.add("lrcContainer-active");
    //移动端页面
    cover.classList.add("info-active");
    console.log(songSinger.offsetWidth,songInfo.offsetWidth)

    songinfo.classList.add("songinfo-active");
    flag = true;
    console.log(flag);
  } else {
    removeLrcContainer();

    console.log(flag);
  }
  controlDisplay(flag)
});

//点击coverimg也能回到主页面,这个地方实在没办法调用两个函数，只能照抄了
coverImg.addEventListener("click", ()=>{
  lrcBtn.classList.remove("lrcBtn-active");
  lrcContainer.classList.remove("lrcContainer-active");
  cover.classList.remove("info-active");
  songinfo.classList.remove("songinfo-active");
  flag = false;
  controlDisplay(flag)
});

//点击歌曲列表展开歌曲列表
const list = document.querySelector(".list");
const listBtn = document.querySelector(".container .icon-liebiao");
listBtn.addEventListener("click", () => {
  if (!document.querySelector(".container .listBtn-active")) {
    list.classList.add("list-active");
    listBtn.classList.add("listBtn-active");
    container.classList.add('container-active')
  } else {
    list.classList.remove("list-active");
    listBtn.classList.remove("listBtn-active");
    container.classList.remove('container-active')
  }
});

let currentFlagState = flag; // 初始化为初始的flag值

const controlDisplay = (newFlag) => {
  if (currentFlagState !== newFlag) {
    currentFlagState = newFlag;

    if (newFlag) {
      container.addEventListener('touchstart', touchStartHandler);
      container.addEventListener('touchend', touchEndHandler);
      touchEndHandler()
    } else {
      container.removeEventListener('touchstart', touchStartHandler);
      container.removeEventListener('touchend', touchEndHandler);

      clearTimeout(timeoutId);
      containerControl.classList.remove('control-active');
    }
  }
};

let timeoutId;
const touchStartHandler = () => {
  console.log('start');
  clearTimeout(timeoutId);
  containerControl.classList.remove('control-active');
};

const touchEndHandler = () => {
  console.log('end');
  timeoutId = setTimeout(()=>
      containerControl.classList.add('control-active'),5000) ; // 假设这是设置新定时器的函数
};


// 在flag值改变时调用controlDisplay
// 例如，在某个事件或条件改变flag时调用controlDisplay(flag)

//点击歌曲列表关闭图标关闭歌词界面
const closeListBtn = document.querySelector("#list-close");

closeListBtn.addEventListener("click", () => {
  list.classList.remove("list-active");
  listBtn.classList.remove("listBtn-active");
  container.classList.remove('container-active')
});

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
    playButton.classList.remove("icon-bofang2");
    playButton.classList.add("icon-a-zanting1");
    coverImg.classList.add("cover-active");
  } else {
    playButton.classList.remove("icon-a-zanting1g");
    playButton.classList.add("icon-bofang2");
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

  renderList(songIndex);
  songNow(songIndex);

  bgImage(songIndex)

  // updateBackgroundColorFromCover();
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

  renderList(songIndex);
  songNow(songIndex);

  bgImage(songIndex)
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


