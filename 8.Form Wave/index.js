const labels = document.querySelectorAll('.form-control label')
//상수 식별자 labels는 .form-contrl label을 가져옴(email,password)

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})

/*
labels는 각각의 label에 대해 해당 내용을 반복실행
laber.innerHTML은 label.innerText가 가져온 텍스트 내용을 가지고 HTML을 설정

label.innerText 레이블의 텍스트 콘텐츠를 가저옴(email,password)의 콘텐츠를 가져옴

.split('')=>텍스트를 개별 문자로 분리하여 배열로 만듦
('e', 'm', 'a', 'i', 'l')이런 식으로 

.map((letter(=각 문자), idx) =>...)
map함수를 통해 각 문자(letter)를 <span>태그로 감싸는 작업을 함 idx는 각 문자의 인덱스를 나타내어 각 문자에 다르게 애니메이션 딜레이를 줄수 있음

<span style="transition-delay:${idx * 50}ms">${letter}</span>
각 문자를 <span>태그로 감싸고, transition-delay 속성을 사용해 인덱스에 따라 50ms씩 지연 시간을 다르게 적용함

.join('')
분리된 문자들을 다시 하나의 문자열로 함칩
('e', 'm', 'a', 'i', 'l')=>('email') 단 각 문자가 span으로 감싸진 상태의 HTML문자열이 만들어짐=>innerHTML에 넣어 레이블 텍스트를 대체
*/