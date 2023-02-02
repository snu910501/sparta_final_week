const Error = require("../modules/error");


// 입력될 데이터들에 대한 유효성 검사를 실시합니다. 숫자냐 문자냐를 검사하고, 점수를 부여하는 구간에서는 1~5점만 부여하게 유효성 검사를 실시했습니다.

module.exports = reviewValidate = async (address, address_jibun, residence_type, transaction_type, deposit, monthly_payment, acreage, communication, bug, smell, floor_noise, walls_noise, town_noise, mold, parking, safe, good, bad, star, images) => {
  let checkNum = /[0-9]/;
  let checkString = /^[a-zA-Zㄱ-힣0-9-_. ]{1,500}$/
  // -_.!?
  // if (!checkString.test(good)) {
  //   const error = new Error(405, "good 형식이 일치하지 않습니다.")
  //   throw error
  // };
  // if (!checkString.test(bad)) {
  //   const error = new Error(405, "bad 형식이 일치하지 않습니다.")
  //   throw error
  // };
  if (!checkNum.test(checkNum) || star > 5 || star < 1) {
    const error = new Error(405, "stars 형식이 일치하지 않습니다.")
    throw error
  };
  if (residence_type != '원룸' && residence_type != '투룸') {
    const error = new Error(405, "residence_type 형식이 일치하지 않습니다.")
    throw error
  };

  if (transaction_type != '월세' && transaction_type != '전세') {
    const error = new Error(405, "transaction_type 형식이 일치하지 않습니다.")
    throw error
  };

  if (!checkNum.test(deposit)) {
    const error = new Error(405, "transaction_type 형식이 일치하지 않습니다.")
    throw error
  }

  if (!checkNum.test(monthly_payment)) {
    const error = new Error(405, "monthly_payment 형식이 일치하지 않습니다.")
    throw error
  }

  if (!checkNum.test(acreage)) {
    const error = new Error(405, "acreage 형식이 일치하지 않습니다.")
    throw error
  }

  if (!checkNum.test(bug) || bug > 5 || bug < 1) {
    const error = new Error(405, "bug 형식이 일치하지 않습니다.")
    throw error
  }
  // if (!checkNum.test(safe) || safe > 5 || safe < 1) {
  //   const error = new Error(405, "safe 형식이 일치하지 않습니다.")
  //   throw error
  // }
  if (!checkNum.test(communication) || communication > 5 || communication < 1) {
    const error = new Error(405, "communication 형식이 일치하지 않습니다.")
    throw error
  }
  if (!checkNum.test(floor_noise) || floor_noise > 5 || floor_noise < 1) {
    const error = new Error(405, "floor_noise 형식이 일치하지 않습니다.")
    throw error
  }
  if (!checkNum.test(walls_noise) || walls_noise > 5 || walls_noise < 1) {
    const error = new Error(405, "walls_noise 형식이 일치하지 않습니다.")
    throw error
  }
  if (!checkNum.test(town_noise) || town_noise > 5 || town_noise < 1) {
    const error = new Error(405, "town_noise 형식이 일치하지 않습니다.")
    throw error
  }
  if (!checkNum.test(mold) || mold > 5 || mold < 1) {
    const error = new Error(405, "mold 형식이 일치하지 않습니다.")
    throw error
  }
  if (!checkNum.test(parking) || parking > 5 || parking < 1) {
    const error = new Error(405, "parking 형식이 일치하지 않습니다.")
    throw error
  }
  if (images.length > 5 || images.length < 0) {
    const error = new Error(405, "images 형식이 일치하지 않습니다.")
    throw error
  }

  return true
}