const axios = require('axios');

async function init() {
  const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
    headers: {
      'Authorization': 'KakaoAK 5ef5bfb475821f7a1a4a6db2f85472c1'
    },
    data: new URLSearchParams({
      'query': '아산시 배방읍 연화로 99'
    })
  });
  console.log(response.data.documents[0].x)
  console.log(response.data.documents[0].y)
}
init();