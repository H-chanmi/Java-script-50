const toggle = document.getElementById('toggle')
//상수 toggle=#toggle(=X의 버튼박스)
const nav = document.getElementById('nav')
//상수 nav =#nav(ul의 네비 박스 )

toggle.addEventListener('click', () => nav.classList.toggle('active'))

//토글에 클릭이벤트가 일어나면 =>네비의 .active를 끄고 킴