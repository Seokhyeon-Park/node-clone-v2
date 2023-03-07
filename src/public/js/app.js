const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

// 이벤트
socket.addEventListener("open", () => {
    console.log("서버에 연결되었음.");
});

socket.addEventListener("message", (message) => {
    console.log("서버로 부터의 메시지 : ", message);
});

socket.addEventListener("close", () => {
    console.log("서버가 종료됨.")
});

setTimeout(() => {
    socket.send("클라이언트에서 보내보는 테스트 메시지");
}, 1000);

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    // input의 데이터를 submit 했을 때, 서버로 메시지 전송
    socket.send(input.value);
});