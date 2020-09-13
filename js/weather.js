const weather = document.querySelector(".js-weather");

const API_KEY = "917c536e07e067df2beba51f31ea293a";

const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

//데이터를 얻는 방법은 간단하다, fetch를 사용해주면 된다
//fetch안에는 가져올 데이터가 들어가면된다, 이런식으로 앞에  https:// 넣어주고
// *주의  따옴표가아닌 (``)백스틱을 넣어줄 것
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) { //내가 이 부분이 이해가 잘 안간다.
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude,
    };
    saveCoords(coordsObj);

    getWeather(latitude, longitude);
} // 나는 이 인자쓰는게 이해가 존나 안가네 왜 내가 저 임의의 값을 정해주는거지 시발 ?
function handleGeoError() {
    console.log("Can't access geo location");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
} //navigator api를 사용할 것이다. navigaor,window,document 등등등 기본적으로 js에 들어있는 것 들이다.
//geolocation은 오브젝트라서 다양한 메소드들이 있다.
//두가지 인자값을 가지는데  첫번째 requirement에는 함수고 좌표를 가져오는데 성공했을 때 처리하는 함수.
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        // getWeather()
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();

//API는 다른 서버로 부터 손쉽게 데이터를 가져올 수 있는 수단

//그러니까 우리가 weather 저 사이트로가서 정보를 가져왔는데
//가져오는거 까지야 그렇다 하지만 최신화할려면 새로고침을 눌러줫어여했다.
//하지만 자바스크립트가 강력해진이유가
//웹사이트를 통해 리퀘스트를 보내고 응답을 통해서 데이터를 얻어 낼 수 있는데
//가져온 데이터를 refresh(새로고침) 없이도 내 웹사이트에 적용할 수 있기 때문이다
//우리가 이메일 확인할때 실시간으로 새로고침하지 않아도 왔다는걸 알 수 있기 때문이다.
