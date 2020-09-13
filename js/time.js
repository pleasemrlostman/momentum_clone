const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
    // 이렇게만 했을 경우 시간, 분, 초가 십의자리가 아닐경우 한자리로만 뜬다
    // 우리는 그걸 두자리로 만들어주기 위해서 ternary operator(삼항연산자)를 사용해 준다. 혹인 작은if
    // ? 는 true를 의미하고 : 는 거짓을 의미한다.
}

// setInterval(함수명,실행할 시간 간격)

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();
