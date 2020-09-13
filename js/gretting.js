// quertySelector는 내가 찾은 첫번째 클래스를 가져온다
// 즉 클래스 이름이 동일한게 여러개 있다고 하더라도 맨 처음 클래스만 가져온다는거
// ex) list가 여러개 있으면 쿼리셀렉터는 그 중 첫번째 list를 가져온다는 의미
// 그러나 쿼리셀럭터올은 중복되는걸 전부 가져와서 array값에 넣어준다
// 이 말은 중복되는게 없다고 할 지라도 즉 단 한개의 값이라도 array값에 넣어주는 쓸데없는 짓을 한다.
// 그러므로 쿼리셀럭터를 잘 이용하도록 하자
// ~~byId는 id값 가져오고 tag name은 그 자체의 값을 가져온다

// 여기서 오늘 배울 가장 중요한건 local storage 라는걸 배우는게 핵심 !
// 작은 정보를 내 유저 컴퓨터에 저장하는 방법임
// 작은 자바스크립트 정보를 저장한다
// 즉 localStorage 애플리케이션 localStorage 에 저장하는 명령어다

//localStorage.setItem("nico",true) nico는 key값 true는 value값

// localStorage.getItem("nico")
// "true"
// 겟 아이템은 로컬스토러지의 밸류값을 가져오는 거다
//  value 값을 수정하면 그 수정한 값이 나온다.

//localStorage.getItem("userName")
//null
// 아무것도 없으니까 null 이라고 뜬거 null 은 마치 true,false 같은거 마치 존재하지 않다라는 의미임 undefined. cannot find

const form = document.querySelector(".js-form");
const input = document.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser";
// 이거가 핵심이다 USER_LS는 currnetUser라는 스트링값이다.
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    // console.log(currentValue);
    paintGreeting(currentValue); //여기가 좀 헷갈리는 거다
    saveName(currentValue);
}

// 여기서 event란 기본적으로 addEventListener가 가지고 있는 submit이라는 명령어가있다. (마치 클릭과같음)
// 제출하면 어떤 함수가 발생하는건데 기본적으로 submt하면 새로고침 비슷한 무언가 이벤트가 발생하는데
// 여기서 그 이벤트를 막아주기 위해서 임의의 인자값 event를 작성해주고 그걸 막아주는거
// evnet말고 다른거 작성해도 무관
// 그럼에도 불구하고 여기 부분이 존나 어렵다 ;;;; 진짜 확실한 공부가 필요합니다.

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit); //이게 기볹 동작을 막는 첫번째 조건이다.
}

function paintGreeting(text) {
    //결국은 이 text 값은 cunnretUser(변수) = localStorage.getItem(USER_LS); = 스트링값 currentUser 의 벨류값이다
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS); //currentUser라는 스트링 값(즉 변수 USER_LS)의 value를 가져온다는 의미이다. 뭐가? 변수 currentUser가
    if (currentUser === null) {
        //만약 변수가 null 즉 value값이 아무것도 없으면 아무것도 하지마라 라는의미
        //he is not
        // 결국 null 값은 key에 들어오는 currentUser의 Value값이 비어있냐 없냐를 묻는거
        // 비어있으니까 asfForName()함수를 실행해라
        askForName();
    } else {
        //she is
        paintGreeting(currentUser); //만약 변수값이  null이 아니라면? 뭐라도 있으면 paintGreeting이라는 함수를 실행하라는 거임 (currentUser라는 변수를 넣고) 여기서 근데 currentUser라는 변수값은  USER_LS의 value값 근데 USER_LS는 currentUsef라는 스트링값의 value값
    }
}

function init() {
    loadName();
}
init();
