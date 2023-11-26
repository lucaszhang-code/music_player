//设置一个全局变量，用于知道播放到哪一首歌
let songIndex = 0;

const songData = [
  {
    url: "./assets/李玖哲 - 夏天.mp3",
    cover: "./image/夏天-李玖哲.jpg",
  },
  {
    url: "./assets/ナナツカゼ,PIKASONIC,なこたんまる - 春めく.mp3",
    cover: "./image/春めく.jpg",
  },
  {
    url: "./assets/HOYOMiX - Da Capo.mp3",
    cover: "./image/Da Capo.jpg",
  },
  {
    url: "./assets/任然 - 飞鸟和蝉 .mp3",
    cover: "./image/飞鸟和蝉.jpg",
  },
  {
    url: "./assets/FIFTY FIFTY - Cupid.mp3",
    cover: "./image/Cupid.jpg",
  },
  {
    url: "./assets/Sereno - 마지막 세계의 왈츠.mp3",
    cover: "./image/마지막 세계의 왈츠.jpg",
  },
  {
    url: "./assets/YOASOBI - アイドル.mp3",
    cover: "./image/アイドル.jpg",
  },
  {
    url: "./assets/花玲,张安琪,沐霏 - 我不曾忘记.mp3",
    cover: "./image/我不曾忘记.jpg",
  },
  {
    url: "./assets/YOASOBI - 祝福.mp3",
    cover: "./image/祝福.jpg",
  },
  {
    url: "./assets/Islet,倚水 - 星になる (feat. 倚水).mp3",
    cover: "./image/星になる (feat. 倚水) .jpg",
  },
  {
    url: "./assets/Islet,倚水 - 春を待つ (feat. 倚水).mp3",
    cover: "./image/春を待つ(feat. 倚水).jpg",
  },
  {
    url: './assets/花鋏キョウ - Starry.mp3',
    cover:'./image/starry.jpg'
  },
{
  url: './assets/HOYO MiX - 轻涟 La vaguelette .mp3',
  cover:'./image/轻涟 La vaguelette.jpg'
},
  {
    url:'./assets/HoneyComeBear - 十夏の花.mp3',
    cover:'./image/十夏の花.jpg'
  }
];

//读取文件的歌曲名称
const filesName = (i) => {
  const fileURL = songData[i].url;
  const fileDate = fileURL.split("/");
  const fileSinger = fileDate[2].split("-");
  const fileName = fileSinger[1].split(".");

  const selecttIndex = fileName.length - 1;
  const rightArr = fileName.slice(0, selecttIndex);

  return rightArr.join(".");
};

//读取文件的演奏家名称
const filesSinger = (i) => {
  const fileURL = songData[i].url;
  const fileDate = fileURL.split("/");
  const fileSinger = fileDate[2].split("-");

  return fileSinger[0];
};
