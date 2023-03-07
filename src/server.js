import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("*", (req, res) => {
    res.redirect("/");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
    console.log("클라이언트가 연결되었음.");
    
    // 이벤트
    socket.on("close", () =>{
        console.log("클라이언트가 나갔음 ㅠㅠ.");
    });

    socket.on("message", (message) => {
        console.log("클라이언트로 부터의 메시지 : " + message);
    });

    socket.send('서버에서 보내보는 테스트 메시지');
});

server.listen(3000, () => {
    console.log(`Listening on http://localhost`);
});