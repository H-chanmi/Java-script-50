//%는 표시글자, 백그라운드 객체를 상수로 저장
const loadText = document.querySelector('.loadingText');
const bg = document.querySelector('.bg');

let load = 0; //초기값 0
let int = setInterval(blurring,30);

//함수시작
function blurring(){
    load++;
    console.log(load);
//조건문
if (load >99){ //load숫자가 100이상이면 실행 중지
    clearInterval(int);
}

//실행할 것들 `백틱으로 묶어준다
loadText.textContent = `${load}%`; //0>>100까지 숫자 올라감

loadText.style.opacity = scale(load, 0, 100, 1, 0); //숫자 사라지게 하기 (0-100) =>)(1,0)


bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`

}//function  bluring 끝

// 블러필터 로딩 
//scale함수
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }