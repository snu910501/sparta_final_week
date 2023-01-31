//후기 원룸의 좌표값
const lat = 37.4341;
const lng = 127.1345;

// 대한민국 남서 북동 좌표
const koreaNeLat = 38.2501;
const koreaNeLng = 129.3232;
const koreaSwLat = 34.3689;
const koreaSwLng = 126.1412;

const zoomLevelThreeLat = 0.0005;
const zoomLevelThreeLng = 0.0007;
const zoomLevelFourLat = 0.0040;
const zoomLevelFourLng = 0.0056;

let zoomLevelThreeSwLng = 0;
let zoomLevelThreeSwLat = 0;
let zoomLevelThreeNeLat = 0;
let zoomLevelThreeNeLng = 0;

let zoomLevelFourSwLng = 0;
let zoomLevelFourSwLat = 0;
let zoomLevelFourNeLat = 0;
let zoomLevelFourNeLng = 0;

// for문을 이진트리로바궈서 속도를 높여보자

console.time()

for (let i = koreaSwLat; i < koreaNeLat; i += zoomLevelThreeLat) {
  if (lat >= i && lat <= zoomLevelThreeLat + i) {
    zoomLevelThreeSwLat = i;
    zoomLevelThreeNeLat = zoomLevelThreeLat + i;
    break
  }
}


for (let i = koreaSwLng; i < koreaNeLng; i += zoomLevelThreeLng) {
  if (lng >= i && lng <= zoomLevelThreeLng + i) {
    zoomLevelThreeSwLng = i;
    zoomLevelThreeNeLng = zoomLevelThreeLng + i;
    break
  }
}

console.timeEnd()

///////////////////////////////////

// console.time()

// const low = koreaSwLat;
// const high = koreaNeLat;
// const mid = Math.floor((low + high) / 2)


// console.time()

// while (lat >= mid && lat <= mid + zoomLevelThreeLat) {
//   if (lat < mid) {
//     high = mid - zoomLevelThreeLat;
//   } else {
//     high = mid + zoomLevelFourLat;
//   }
// }

// console.timeEnd();