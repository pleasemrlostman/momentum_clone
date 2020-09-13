const body = document.querySelector("body");

const IMG_NUMBER = 5;

// function handleImgLoad() {
//     console.log("finished loading");
// }
// 이건 내가 API에서 일 하 고 있을 때 중요하다. 지금은 그렇게 중요하지 않다.

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    // body.appendChild(image);
    body.prepend(image);

    //prepand는 맨 위로가고, appendChild는 맨 아래로 가는 차이점이 있다.

    // image.addEventListener("loaded", handleImgLoad);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();

//Math.random() * 5
//콘솔창에서 임의로 0~5 사이의 숫자를 생성해 낸다.
//Math.floor() 는 소수점 그대로 버리고
//Math.ceil() 는 소수점 버리고 1의자리 올린다
// Math.floor(Math.random() * 5) 0~5자리 자연수만 출력한다
