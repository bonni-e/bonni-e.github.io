// 바닐라 JS 과정 프로젝트를 완료하고 Github Pages를 이용해 배포하세요.
// ㄴ 제출하실때 깃헙.io 포멧으로 제출 부탁드립니다!
// https://bonni-e.github.io/momentum/

// 실시간 시계                      [O]
// 로컬 스토리지를 사용한 로그인        [O]
// 로컬 스토리지를 사용한 투두리스트     [O]
// 랜덤 배경 이미지                  [O]
// 날씨와 위치(geolocation)         [X]
// 여러분의 CSS 실력을 뽐내주세요💖

let currentTime = 0;

const body = document.querySelector("body");
const root = document.getElementById("root");
const time = document.querySelector("#time");
const message = document.querySelector("#message");

// 1. clock 
setTimePerSecond();
const setTime = setInterval(setTimePerSecond, 1000);

function setTimePerSecond() {
    const now = new Date();
    // console.log(now.toLocaleString('ko-KR'));

    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    const str = `${h < 10 ? `0${h}` : `${h}`}:${m < 10 ? `0${m}` : `${m}`}:${s < 10 ? `0${s}` : `${s}`}`;

    time.innerText = str;
    currentTime = h;

    // 2. random background
    const backgroundState = localStorage.getItem("background");
    if (backgroundState === null || parseInt(backgroundState) === s) {
        setBackground();
        // localStorage.setItem("background", currentTime);
        localStorage.setItem("background", s);
    }
}

function setBackground() {
    const random = Math.floor(Math.random() * 10) + 1;
    body.setAttribute("style", `background-image : url('src/images/bg-${random}.jpeg')`);
}

// 3. login
const username = window.localStorage.getItem("username");

if (username !== null) {
    root.setAttribute("style", "display: block");

    let state = "";
    if (currentTime >= 4 && currentTime < 12) {
        state = "morning";
    }
    else if (currentTime >= 12 && currentTime < 18) {
        state = "afternoon";
    }
    else if (currentTime >= 18 && currentTime < 21) {
        state = "evening";
    }
    else {
        state = "night";
    }

    const welcomeStr = `Good ${state}, ${username}.`;
    message.innerText = welcomeStr;
}
else {
    const form = document.createElement("form");
    const h1 = document.createElement("h1");
    const input = document.createElement("input");
    const button = document.createElement("button");

    h1.innerText = "Hello, What's your name?"
    input.type = "text";
    input.id = "name"
    button.innerText = "Continue >";

    form.append(h1);
    form.append(input);
    form.append(button);

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = input.value;

        if (name !== "") {
            localStorage.setItem("username", name);
            location.reload();
        }
    });

    body.append(form);
}

// 4. todo list
const todoForm = document.querySelector(".todo-form");
const form = todoForm.querySelector("form");
const todoText = document.querySelector(".todo-text");
todoText.setAttribute("style", "display : none");

let todo = localStorage.getItem("todo");

if(todo !== null) {
    todoForm.setAttribute("style", "display : none");
    todoText.setAttribute("style", "display : block");
    todoText.querySelector("span").innerText = todo;
}

form.addEventListener("submit", e => {
    e.preventDefault();
    todo = form.querySelector("#todo").value;

    if (todo !== "") {
        todoForm.setAttribute("style", "display : none");
        todoText.setAttribute("style", "display : block");
        todoText.querySelector("span").innerText = todo;

        localStorage.setItem("todo", todo);
    }
})