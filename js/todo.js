const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = []; //비어있는 array로 만들어 준다
// 그리고 할 일을 생성했을 때 그게 이 toDos Array에 추가되도록 할거다

// 맨 처음에 이 toDos 리스트 값은 비어있으니까 id값은 1이다

//filter는 array의 모든 아이템을 통해 함수를 실행하고 , true인 아이템들만 가지고 새로운 array를 만들고

function deleteToDo(event) {
    // console.dir(event.target);
    // dir는 그 엘리먼트값의 여러 속성들을 보여준다, 여기서 부모가 뭔지 찾는다
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
//자바스크립트는 local storage에 있는 모든 데이터를 string로 저장하려고 한다.
//그래서 우리는 object가 string이 되도록 해야하낟
//그러므로 유용한 명령어인 JSON.stringify를 사용한다
// JSON은 Javascript Object Notation 의 줄임말 , 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능인 셈
// 그래서  string을 object로 바꿔 줄 수 도 잇고 object를 string으로 바꿔 줄 수 도 있다.

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    const span = document.createElement("span");
    span.innerText = text;
    const newId = toDos.length + 1;
    delBtn.addEventListener("click", deleteToDo);
    li.appendChild(delBtn); // btn을 li안에 넣는다
    li.appendChild(span); // span을 li안에 넣는다
    li.id = newId;
    // 무언가를 그의 father element 안에 넣는 것
    toDoList.appendChild(li);

    // 무언가를 입력하고 enter를 눌렀을 때
    //li를 생성하고
    // delBtn을 생헝하고 span을 생성하고
    // 생성된 span과 btn을 li안에 append(삽입) 집어넣고 , 마지막으로  li를 ul에 append 하는것 이다.

    const toDoObj = {
        text: text, //text라는 key에 text가 올 것이고
        id: newId, // 즉 여기서 toDos.length의 값은 일단 0이다  /
        // 그냥 toDos.length값을 넣었으면 처음 값이 0이라서 0으로 될것이다. 하지만 +1을 함으로서 첫 시작이 1로된다
        // lenth를 쓰면  array의 길이가 어느정도인지 알 수 있다.
    };
    // 애초에 새로운 오브젝트를 만들어 주는것이다

    toDos.push(toDoObj);
    saveToDos();
    //push 안 이후로 호출을 하도록 하자, 만약 이거하기전에 호출하면
}

// 왜 toDo를 이런식으로 저장하는거야 라는 거에 대한 다답은  local storage에도  투두를 저장해둬야 하기 때문이다.

function handleSubmit(evnet) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
        //forEach는 기본적으로 함수를 실행하는데 array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 주는 것 이다.
        //아래처럼 함수를 호출하는게 아니라 바로 함수를 만드는 것
    } else {
    }
}

function init() {
    loadToDos(); //뭔가를 load 해야하는데 그건 로컬 스트로지에서 온거
    toDoForm.addEventListener("submit", handleSubmit);
}
init();
