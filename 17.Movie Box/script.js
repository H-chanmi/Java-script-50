//영화데이터를 가져와 웹 페이지에 표시하는 Java Script
/*
TMDB API를 사용하여 인기영화를 검색하고 , 사용자가 특정하는 영화를 검색 할수 있는 기능을 제공하는 script

TMDB API->영화 및 tv프로그램에 대한 정보를 제공하는 웹 API

API(Appliction Programming Interface)란?
소프트웨어 간의 상호작용을 가능하게 해주는 일련의 규칙과 도구
->API를 통해 한 애플리케이션이 다른 애플리케이션이나 서비스와 데이터를 주고받거나 기능을 호출 할 수 있음 (자세한 설명은 스크립트 끝에 작성)
*/

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

/*
const API_URL : 인기 영화를 가져오기 위한 TMDB API의 URL
const IMG_PATH : 영화 포스터 이미지를 불러오기 위한 기본 URL
const SEARCH_API : 특정 영화를 검색하기 위한 TMDB API의 URI

*/ 

const main = document.getElementById('main')
//상수main = #main(포스터 이미지가 들어갈 내용)
const form = document.getElementById('form')
//상수 form = #input박스를 감싸고 있는 폼
const search = document.getElementById('search')
//상수 search = #input박스


// 초기 영화 가져오기
getMovies(API_URL)//페이지가 로드되면 getMovies함수를 호출해 초기 인기영화를 가져옴 

//비동기 함수 (async사용)->자세한 설명 하단에 참조
async function getMovies(url) {
    const res = await fetch(url);
    //fetch(url)->URL에 대한 http요청을 보내고, 그 요청에 대한 응답을 받기 위해 Promise반환
    //응답이 준비되기 전까지 대기
    //Promise에 관한던 위쪽에 자세히
    const data = await res.json()//HTTP응답 본문을 JSON형식으로 파싱, Promise반환 ->await로 결과가 준비될때까지 대기 

    showMovies(data.results) //JSON데이터에서 영화 목록이 포함된 배열을 받아 화면에 영화 정보를 표시하게 함 
}//영화데이터 가져오기 (showMovies(data.results호출))

///가져온 영화 데이터를 DOM에 표시하기 위한 함수 실행(movies라는 매개변수를 받음)
function showMovies(movies) {
    main.innerHTML = ''//요쇼의 내용을 빈문자열로 초기화 ->이전 영화 정보가 있다면 지움

    movies.forEach((movie) => {
        //forEach메서드를 사용해 movies배열의 각 영화 객체에 대해 반복처리=각 반복에서 movie라는 변수를 사용해 현재 영화 객체를 참조 가능
        const { title, poster_path, vote_average, overview } = movie
        //movie객체에서 필요한 속성들을 추출하여 각 변수에 할당
        const movieEl = document.createElement('div')
        //새로운 div요소를 생성하여  movieEI변수에 할당 ->이 요소는 각 영화의 정보를 담을 컨테이너 역할
        movieEl.classList.add('movie')
        //css클래스추가

        //아래는 html내용 설정
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })

    /*movieEI.innerHTML = ...""; 템플릿 리터럴(백틱`)을 사용해 movieEI요소의 내부 HTML설정
    영화의 포스터,제목,평점, 개요를 표시하는 구조 작성(=문자열 안에 변수를 포함해 html구조 작성)

    <img src="${IMG_PATH + poster_path}" alt="${title}">: 포스터 이미지를 표시.
    IMG_PATH(영화 포스터 이미지를 불러오기 우이한 기본 url)와 poster_path(개별 영화의 포스터 경로/TMDB API에서 반환된 데이터 속성 ex/path/to/poster.jpg)를 결합하여 이미지 URL을 생성하고, 영화 제목을 alt 속성에 사용

    <span class="${getClassByRate(vote_average)}">${vote_average}</span>: 평점을 표시하고, getClassByRate(vote_average)를 호출하여 평점에 따라 CSS 클래스를 결정
    <span>:평점을 표시하는 인라인 요소
    ${getClassByRate(vote_average)}:평점에 따라 css 클래스 결정(green, orange, red같은 클래스 반환) -> 뒤쪽의 if문에 조건 표기
    ${vote_average}실제 평점 표시

    <div class="overview">: 영화 개요를 표시하는 섹션. 여기에는 "Overview"라는 제목과 영화 개요 내용이 포함
    //영화 개요 내용을 동적삽입 ->사용자가 영화에 대한 간단한 설명을 볼수 있게 함

    main.appendChild(movieEl) : main요소에 생성한 movieEI 요소를 추가 ==화면에 영화 정보 표시됨
    */
}

//함수 getClassByRate는 vote를 매개변수로 받아 함수 실행
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

////상수 form = #input박스를 감싸고 있는 폼 참조 ( e=event) 
//이벤트가 발생할 때,사용자가 폼을 제출할려고 할때 호출되는 콜백 함수 정의

form.addEventListener('submit', (e) => {
    e.preventDefault()//기본 폼 제출 방지
    //preventDefault=>특정 이벤트의 기본동작을 방지(폼제출,링크클릭등 기본적으로 발생하는 동작을 막고 개발자가 원하는 행동을 구현할 수 있게 해줌)
    const searchTerm = search.value
    //상수 search = #input박스에 .value는 현재 입력된 내용을 가져오는 속성 = 즉 #input박스에 입력된 텍스트를 반환
    //즉 상수 searchTerm 은 #input박스에 입력된 텍스트를 변수에 저장


    //만약 searchTerm이 존재하고 빈 문자열이 아닐때 
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        //ture값 SEARCH_API+searchTerm결합해 TMDB API호출=>해당 검색어에 대한 영화 정보 가져오고
        search.value = ''//검색어 입력 필드를 비워 다음 검색 준비

    } else {
        window.location.reload()
        //false값 페이지를 새로 고침하여 초기상태로 되돌림, 사용자가 잘못된 입력일 했을 때의 처리
    }
})
//!!!!단 해당 코드 API에서 결과가 없을때 처리하는 로직이 없음 즉 API응답이 없거나 에러가 발생했을때 처리로직이 없으니 작성해 주는게 좋음 ->해당 js는 빈공간 표시


/*
API----------------------------------------

주요기능

1.데이터 접근 : 다른 시스템이나 데이터베이스에서 정보를 가저오거나 보낼 수 있다.
(ex TMDB API를 사용하면 영화 정보를 검색하거나 받아올 수 있다.)

2.기능 호출 : 특정기능을 호출하여 사용할 수 있다. 
(EX:결세 시스템 API를 통해 결제 처리를 할 수 있다.)

3.통합 : 서로 다른 애플리케이션이나 서비스를 통합하여 더 복잡한 시스템을 구성할수 있다. 
(Ex : 소셜 미디어 API를 사용해 사용자가 로그인하거나 콘텐츠를 공유 할 수 있게 함)

API의 종류
1.웹 API : HTTP를 통해 요청하고 응답하는 API로 주로 RESTful또는 GraphQL형식으로 제공 (스크립트의 fetch함수를 사용에 API URL에 요청했음 = 즉 이번 스크립트의 API는 웹 API임)

2.라이브러리 API : 특정 프로그래밍 언어에서 제공하는 라이브러리의 기능을 사용할수 있게 해주는 API

3.운영체제 API : 운영 체제의 기능에 접근할 수 있는 API로 파일 시스템이나 네트워크와 같은 기능을 호출할 수 있다. 

요약
API는 소프트웨어 간의 상호작용을 간편하게 해주는 도구
개발자들이 다른 시스템의데이터를 활용하거나 기능을 통합하여 더 강력한 애플리케이션을 만들수 있도록 돕는다. 

*/ 

/*--------------------------------------------
비동기 함수(Asynchronous Function)
일반적으로 시간이 오래 걸리는 작업을 수행할때 다른 코드의 실행을 막지 않고 동시에 진행할 수 있도록 해주는 함수 

async 키워드로 함수를 정의 -> await키워드로 비동기 작업이 완료될때 까지 기다릴수 있게 만듦 
*/ 

/*--------------------------------------------
Promise->비동기 작업의 결과를 나중에 사용할 수 있도록 하는 객체를 반환
====비동기 작업의 완료 여부를 나타내는 중요한 개념

Promise의 세가지 상태
1.대기(pending) : 비동기 작업이 아직 완료되지 않은 상태
2.이행(fulfilled) : 비동기 작업이 성공적으로 완료된 상태
3.거부(rejected) : 비동기 작업이 실패한 상태

결과처리 : Promise는 비동기 작업이 완료된 후 결과를 처리할 수 있는 방법 제공
.then() 메서드를 상용해 이행된 결과를 처리하고, .catch()매서드를 사용해 거부된 경우의 에러를 처리 가능

코드에서의 Promise
async function getMovies(url) {
    const res = await fetch(url); // fetch()는 Promise를 반환
    const data = await res.json(); // res.json()도 Promise를 반환

    showMovies(data.results);
}

1.fetch(url) : Url에 대한 http요청 보내고 응답을 받기 위한 promise반환 대기
2.await키워드로 promise가 이행될때까지 대기 res변수에 응답이 준비된 후 Response객체가 할당
3res.json()메서드는 응답 본문을 json형식으로 파싱하는 promise반환 ->다시 한번 await를 사용하여 데이터가 준비될때까지 기다림

promise의 장점
비동기 코드작성 ->작업의 결과를 쉽게 다룰수 있음 코드가 깔끔해지고 가독성이 좋아짐

체이닝->여겨개의 비동기 작업을 연속적으로 처리가능, 각각의 작업이 완료된 후 다음 작업을 수행 할 수 있음
*/


/*--------------------------------------------
JSON(JacaScript Object Notation)
데이터를 구조화하는 형식

1.구조화된 데이터 : 복잡한 데이터를 간단하게 구조화 시킴

2.언어 독립성 : 다양한 프로그래밍 언어 지원
3.가독성 : 사람에게도 읽기 쉬운 형식 ->디버깅이나 데이터 분석에 유리 

json예시
{
    "name": "홍길동",
    "age": 30,
    "isStudent": false,
    "courses": ["수학", "과학", "영어"],
    "address": {
        "city": "서울",
        "zipCode": "12345"
    }
}

객체 : {}로 감싸진 키-값 쌍의 집합
{"name": "홍길동", "age": 30}

배열 : []로 감싸진 값을 목록
"courses": ["수학", "과학", "영어"]

키: 문자열 형태로 표현 -> 따움표로 감싸짐
값 : 문자열,숫자,불리언 등 다양한 데이터 타임 가능

JSON사용 사례
1.API통신
웹 애플리 케이션과 서버간 데이터 전송에 자주 사용
2.데이터 저장 : 간단한 데이터 구조를 파일로 저장

JSON 문자열을 객체로 변환: JSON.parse()
const jsonString = '{"name": "홍길동", "age": 30}';
const obj = JSON.parse(jsonString);

객체를 JSON 문자열로 변환: JSON.stringify()const obj = { name: "홍길동", age: 30 };
const jsonString = JSON.stringify(obj);
*/