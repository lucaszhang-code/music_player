//设置一个全局变量，用于知道播放到哪一首歌
let songIndex = 0;

const songData = [
  {
    url:'./assets/林俊杰 - 美人鱼.mp3',
    cover: "http://p2.music.126.net/_0OAhWhIbg-nOP-6e4o-SA==/109951168111265583.jpg",
    coverMini:"http://p2.music.126.net/_0OAhWhIbg-nOP-6e4o-SA==/109951168111265583.jpg?param=130y130"
  },
  {
    url: "./assets/李玖哲 - 夏天.mp3",
    cover: "http://p2.music.126.net/uJwtsPS6WOTD_YrqqvoPKg==/109951167216475692.jpg",
    coverMini:'https://p2.music.126.net/uJwtsPS6WOTD_YrqqvoPKg==/109951167216475692.jpg?param=130y130'
  },
  {
    url: "./assets/任然 - 飞鸟和蝉 .mp3",
    cover: "//y.qq.com/music/photo_new/T002R300x300M000004C9Kg7275J7H_1.jpg?max_age=2592000",
    coverMini: '//y.qq.com/music/photo_new/T002R300x300M000004C9Kg7275J7H_1.jpg?max_age=2592000'
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
  },
  {
    url:'./assets/周杰伦 - 晴天.mp3',
    cover:'//y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_4.jpg?max_age=2592000',
    coverMini: `//y.qq.com/music/photo_new/T002R300x300M000000MkMni19ClKG_4.jpg?max_age=2592000`
  },
  {
    url:'./assets/周杰伦 - 七里香.mp3',
    cover:'//y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000',
    coverMini: '//y.qq.com/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000'
  },
  {
    url:'./assets/NEEDY GIRL OVERDOSE,KOTOKO,Aiobahn - INTERNET OVERDOSE.mp3',
    cover:'http://p2.music.126.net/CN5bP6hxB2TXmyMgAPKqHA==/109951165925710451.jpg',
    coverMini: 'http://p2.music.126.net/CN5bP6hxB2TXmyMgAPKqHA==/109951165925710451.jpg?param=130y130'
  },
  {
    url:'./assets/NEEDY GIRL OVERDOSE ,KOTOKO ,Aiobahn - 月虹蝶 .mp3',
    cover: 'https://p2.music.126.net/7Fmj91RWcQHbLm0MP4e6zg==/109951169272996742.jpg',
    coverMini: 'http://p2.music.126.net/7Fmj91RWcQHbLm0MP4e6zg==/109951169272996742.jpg?param=140y140'
  },
  {
    url:'./assets/Shiggy Jr. - サマータイムラブ.mp3',
    cover: 'https://p2.music.126.net/9SEnfKIvSPpXYdu_mM_azw==/7960464185727595.jpg',
    coverMini: 'https://p2.music.126.net/9SEnfKIvSPpXYdu_mM_azw==/7960464185727595.jpg?param=130y130'
  },
  {
    url:'./assets/知更鸟,HOYOMiX,Chevy - 希望有羽毛和翅膀.mp3',
    cover:'https://p2.music.126.net/aR4BlDNkA84tFbg8bBpriA==/109951169585655912.jpg',
    coverMini:'https://p2.music.126.net/aR4BlDNkA84tFbg8bBpriA==/109951169585655912.jpg?param=130y130'
  },
  {
    url:'./assets/Aimer - Refrain.mp3',
    cover: 'https://p1.music.126.net/wAxnnUZnkN7Soqf7nhjThQ==/109951166663296887.jpg',
    coverMini: 'https://p1.music.126.net/wAxnnUZnkN7Soqf7nhjThQ==/109951166663296887.jpg?param=130y130'
  },
  {
    url:'./assets/Aimer - End of All.mp3',
    cover: 'https://p1.music.126.net/uoRbMR8CMu16-a_sxczMVA==/109951169629655590.jpg',
    coverMini: 'https://p1.music.126.net/uoRbMR8CMu16-a_sxczMVA==/109951169629655590.jpg?param=130y130'
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
