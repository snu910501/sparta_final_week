const axios = require('axios');

module.exports = clustering = async (address) => {

  const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
    headers: {
      'Authorization': 'KakaoAK 5ef5bfb475821f7a1a4a6db2f85472c1'
    },
    data: new URLSearchParams({
      'query': address
    })
  });

  //후기 원룸의 좌표값
  const lat = (Number(response.data.documents[0].y)).toFixed(5);
  const lng = (Number(response.data.documents[0].x)).toFixed(5);

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
  for (let i = koreaSwLat; i < koreaNeLat; i += zoomLevelFourLat) {
    if (lat >= i && lat <= zoomLevelFourLat + i) {
      zoomLevelFourSwLat = i;
      zoomLevelFourNeLat = zoomLevelFourLat + i;
      break
    }
  }


  for (let i = koreaSwLng; i < koreaNeLng; i += zoomLevelFourLng) {
    if (lng >= i && lng <= zoomLevelFourLng + i) {
      zoomLevelFourSwLng = i;
      zoomLevelFourNeLng = zoomLevelFourLng + i;
      break
    }
  }
  return {
    lat: response.data.documents[0].y,
    lng: response.data.documents[0].x,
    zoomLevelThreeSwLng,
    zoomLevelThreeSwLat,
    zoomLevelThreeNeLat,
    zoomLevelThreeNeLng,

    zoomLevelFourSwLng,
    zoomLevelFourSwLat,
    zoomLevelFourNeLat,
    zoomLevelFourNeLng,
  }
}
