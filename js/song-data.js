//设置一个全局变量，用于知道播放到哪一首歌
let songIndex = 0;

const songData = [
  {
    url: "./assets/李玖哲 - 夏天.mp3",
    cover: "http://p2.music.126.net/uJwtsPS6WOTD_YrqqvoPKg==/109951167216475692.jpg",
    coverMini:'https://p2.music.126.net/uJwtsPS6WOTD_YrqqvoPKg==/109951167216475692.jpg?param=130y130'
  },
  {
    url: "./assets/ナナツカゼ,PIKASONIC,なこたんまる - 春めく.mp3",
    cover: "http://p2.music.126.net/-Sd7hIm1AyLLTTIbBNOoow==/109951168583836413.jpg",
    coverMini: 'https://p2.music.126.net/-Sd7hIm1AyLLTTIbBNOoow==/109951168583836413.jpg?param=130y130'
  },
  {
    url: "./assets/HOYOMiX - Da Capo.mp3",
    cover: "http://p1.music.126.net/awzv1LpuBJiKTeB7roh_Aw==/109951168434956885.jpg",
    coverMini: 'http://p1.music.126.net/awzv1LpuBJiKTeB7roh_Aw==/109951168434956885.jpg?param=130y130'
  },
  {
    url: "./assets/任然 - 飞鸟和蝉 .mp3",
    cover: "//y.qq.com/music/photo_new/T002R300x300M000004C9Kg7275J7H_1.jpg?max_age=2592000",
    coverMini: '//y.qq.com/music/photo_new/T002R300x300M000004C9Kg7275J7H_1.jpg?max_age=2592000'
  },
  {
    url: "./assets/Sereno - 마지막 세계의 왈츠.mp3",
    cover: "http://p1.music.126.net/_snpBQeE96uf8XAhdYMXog==/7852712046706413.jpg",
    coverMini: 'http://p1.music.126.net/_snpBQeE96uf8XAhdYMXog==/7852712046706413.jpg?param=130y130'
  },
  {
    url: "./assets/YOASOBI - アイドル.mp3",
    cover: "http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg",
    coverMini: 'http://p1.music.126.net/mLJ_pKshFVtboLyD-4nBdA==/109951168573694568.jpg?param=130y130'
  },
  {
    url: "./assets/Islet,倚水 - 星になる (feat. 倚水).mp3",
    cover: "http://p2.music.126.net/-Q6Ll6I9Cjz7feah9Bco0Q==/109951168104955725.jpg",
    coverMini: 'http://p2.music.126.net/-Q6Ll6I9Cjz7feah9Bco0Q==/109951168104955725.jpg?param=130y130'
  },
  {
    url: "./assets/Islet,倚水 - 春を待つ (feat. 倚水).mp3",
    cover: "http://p2.music.126.net/q4y0QY6fZL-KtGOGyAsU3A==/109951165849787458.jpgg",
    coverMini: 'http://p2.music.126.net/q4y0QY6fZL-KtGOGyAsU3A==/109951165849787458.jpg?param=130y130'
  },
  {
    url: './assets/花鋏キョウ - Starry.mp3',
    cover:'http://p2.music.126.net/N2byjXKeSi1vvIdRQt2Mbw==/109951166317775107.jpg',
    coverMini: 'http://p2.music.126.net/N2byjXKeSi1vvIdRQt2Mbw==/109951166317775107.jpg?param=130y130'
  },
{
  url: './assets/HOYO MiX - 轻涟 La vaguelette .mp3',
  cover:'//y.qq.com/music/photo_new/T002R300x300M000004588aK2JRFN6_1.jpg?max_age=2592000',
  coverMini: '//y.qq.com/music/photo_new/T002R300x300M000004588aK2JRFN6_1.jpg?max_age=2592000'
},
  {
    url:'./assets/HoneyComeBear - 十夏の花.mp3',
    cover:'http://p2.music.126.net/JtyHbggTMWhtJurY9Tbm7g==/109951168646287350.jpg',
    coverMini: 'http://p2.music.126.net/JtyHbggTMWhtJurY9Tbm7g==/109951168646287350.jpg?param=130y130'
  },
  {
    url:'./assets/柏松 - 世间美好与你环环相扣.mp3',
    cover:'http://p2.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg',
    coverMini: 'http://p2.music.126.net/DK1_4sP_339o5rowMdPXdw==/109951164071024476.jpg?param=130y130'
  },
  {
    url:'./assets/温奕心 - 一路生花.mp3',
    cover:'//y.qq.com/music/photo_new/T002R300x300M000001MyK3Y47zLur_2.jpg?max_age=2592000',
    coverMini: '//y.qq.com/music/photo_new/T002R300x300M000001MyK3Y47zLur_2.jpg?max_age=2592000g'
  },
  {
    url:'./assets/The Chainsmokers,Coldplay - Something Just Like This.mp3',
    cover:'http://p2.music.126.net/7tMKza9QbB9xsiQHMmLSKw==/109951167280335904.jpg',
    coverMini: 'http://p2.music.126.net/7tMKza9QbB9xsiQHMmLSKw==/109951167280335904.jpg?param=130y130'
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
