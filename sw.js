// 定义要缓存的文件列表
const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "./assets/李玖哲 - 夏天.mp3",
  "./image/夏天-李玖哲.jpg",
  "./image-mini/夏天-李玖哲.jpg",
  "./assets/ナナツカゼ,PIKASONIC,なこたんまる - 春めく.mp3",
  "./image/春めく.jpg",
  "./image-mini/春めく.jpg",
  "./assets/HOYOMiX - Da Capo.mp3",
  "./image/Da Capo.jpg",
  "./image-mini/Da Capo.jpg",
  "./assets/任然 - 飞鸟和蝉 .mp3",
  "./image/飞鸟和蝉.jpg",
  "./image-mini/飞鸟和蝉.jpg",
  "./assets/FIFTY FIFTY - Cupid.mp3",
  "./image/Cupid.jpg",
  "./image-mini/Cupid.jpg",
  "./assets/Sereno - 마지막 세계의 왈츠.mp3",
  "./image/마지막 세계의 왈츠.jpg",
  "./image-mini/마지막 세계의 왈츠.jpg",
  "./assets/YOASOBI - アイドル.mp3",
  "./image/アイドル.jpg",
  "./image-mini/アイドル.jpg",
  "./assets/花玲,张安琪,沐霏 - 我不曾忘记.mp3",
  "./image/我不曾忘记.jpg",
  "./image-mini/我不曾忘记.jpg",
  "./assets/YOASOBI - 祝福.mp3",
  "./image/祝福.jpg",
  "./image-mini/祝福.jpg",
  "./assets/Islet,倚水 - 星になる (feat. 倚水).mp3",
  "./image/星になる (feat. 倚水) .jpg",
  "./image-mini/星になる (feat. 倚水) .jpg",
  "./assets/Islet,倚水 - 春を待つ (feat. 倚水).mp3",
  "./image/春を待つ(feat. 倚水).jpg",
  "./image-mini/春を待つ(feat. 倚水).jpg",
  "./assets/花鋏キョウ - Starry.mp3",
  "./image/starry.jpg",
  "./image-mini/starry.jpg",
  "./assets/HOYO MiX - 轻涟 La vaguelette .mp3",
  "./image/轻涟 La vaguelette.jpg",
  "./image-mini/轻涟 La vaguelette.jpg",
  "./assets/HoneyComeBear - 十夏の花.mp3",
  "./image/十夏の花.jpg",
  "./image-mini/十夏の花.jpg",
];

// 在 install 事件中缓存这些文件
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 在 fetch 事件中返回缓存的文件，或者向服务器请求新的文件
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 如果缓存中有这个文件，就返回缓存的文件
      if (response) {
        return response;
      }
      // 否则，向服务器请求新的文件
      return fetch(event.request);
    })
  );
});
