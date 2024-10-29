//.ripple모두 부르기
const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    //e는 이벤트 객체 클릭 이벤트에 대한 정보를 포함
    button.addEventListener('click', function (e) {
        //.page는 전체 페이지 기준
        const x = e.pageX
        //클릭한 지점의 수평좌표 ->왼쪽 가장자리 부터 클릭지점까지의 픽셀 수 
        const y = e.pageY
        //클릭한 지점의 수직좌표 ->상단 가장자리 부터 클릭지점까지의 픽셀 수 

        //!! .pageX와  .pageY는 이벤트 객체의 속성이기 때문에 이벤트 객체뒤에 붙여줌(현재 이벤트 객체 e)

        //.target.offset은 버튼기준
        const buttonTop = e.target.offsetTop
        //클릭한 버튼의 상단위치를 가져옴
        const buttonLeft = e.target.offsetLeft
        //클릭한 버튼의 좌측 위치를 가져옴

        //클릭 위치를 버튼 내부의 좌표로 변환한 값
        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        //상수circle은 span을 생성
        const circle = document.createElement('span')
        //span에  .circle클래스 주기
        circle.classList.add('circle')
        //스타일 yInside에 문자px 더하기 위해 '' 붙이기
        circle.style.top = yInside + 'px'
        //스타일 xInside에 문자px 더하기 위해 '' 붙이기
        circle.style.left = xInside + 'px'

        this.appendChild(circle)//클릭한 버튼에 원을 추가 해줌

        setTimeout(() => circle.remove(), 500)
        //0.05후에 circle 삭제 
    })
})