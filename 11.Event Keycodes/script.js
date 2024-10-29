const insert = document.getElementById('insert')
//상수 insert = HTML문서에서 ID가 insert인 요소를 선택

window.addEventListener('keydown', (event) => {
    //브라우저 전체창에 keydown이벤트 리스너를 추가(사용가자 키를 누르면 이 이벤트가 발생 // 이벤트 핸들러는 누른 키에대한 정보를 담고 있는 event객체를 받음 )
    //keydown이벤트 =>사용자가 키보드의 키를 눌렀을 때 발생
    //(event)라는 매개변수를 받음(뒤에 실행할 함수) 
  insert.innerHTML = `
  <div class="key">
  ${event.key ===' ' ? 'Space' : event.key} 
  <small>event.key</small>
</div>

<div class="key">
 ${event.keyCode}
  <small>event.keyCode</small>
</div>

<div class="key">
  ${event.code}
  <small>event.code</small>
</div>
  `
})
/*
박스1
event.key === ' '
사용자가 누른키가 스페이스바 인지 확인 (''=space bar)
? 앞의 조건이 true라면 다음 값을 반환 (반환값 'space')
: 조건이 false일경우 =>다른키를 누를 경우
event.key=누른키의 이름이 반환

박스2
${event.keyCode} 누른 키의 키 코드를 표시 함
=>각 키에 대한 고유한 숫자임
!!keyCode는 이제 사용이 중단될 예정속성으로 event.key를 사용하는걸 권장 ->선이 그어진 이유

박스3
${event.code}누른 키의 물리적인 위치를 나타내를 코드
*/