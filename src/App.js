import logo from './logo.svg';
import './App.css';
import {Button} from "./Button";
import Stomp from "stompjs";
//import socket from "sockets";
import SockJS from "sockjs-client";
import {over} from 'stompjs';



//var url = "ws://localhost:15674/ws";
//var client = Stomp.client(url);
var stompClient = null;

function connect() {
    var socket1 = new SockJS('http://localhost:8082/gs-guide-websocket');
    stompClient = Stomp.over(socket1);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function(greeting) {
            console.log('Here');
            console.log('Message is: ' + greeting);
        });
        console.log('Here2');
    })
}


connect();

function sendName() {
  stompClient.send("/app/hello", {}, JSON.stringify("Tijana"));
  /*
  var pre = document.createElement("p");
  pre.innerHTML = stompClient.send("/app/hello", {}, JSON.stringify("Tijana")).data;

   */
  alert('Got the greeting');
}


function App() {

  return (
      <div className="App">
        <header className="App-header">

          <Button
              width="100%"
              onClick={() => sendName()}
          >
            Click here for greeting
          </Button>



        </header>
      </div>
  );
}

export default App;

