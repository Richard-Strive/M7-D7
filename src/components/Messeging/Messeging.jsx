import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./Messeging.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CreateIcon from "@material-ui/icons/Create";
import io from "socket.io-client";
import UserMessage from "./subComponentM/UserMessage";
//1. Importare io da socket.io-client

const connOps = {
  transports: ["websocket"],
};
//2. Impostare connectionOptions

let socket = io("https://striveschool-api.herokuapp.com", connOps);
// creare la variabile con la connessione tramite "io" e passando l'url e la connOps. In questo modo preparimao la varibaile per la connesione.

function Messeging() {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   socket.on("list", (list) => setList(list));
  //   //il primo paramtro ("list") e' un metodo e la fuzione prende il metodo stesso per ritornare qualcosa cioe la lista di users.

  //   // socket.emit("setUsername", {
  //   //   username: "scaredasfuck",
  //   // });

  //   // socket.emit("chatmessage", {
  //   //   to: "vaneCat",
  //   //   text: "HEY VANESSA. IT'S ME!!",
  //   // });

  //   socket.on("connect", () => console.log("CONNECTED BRO!!!"));
  // }, []);

  /**
   * 
   * 1 THE FIRST PARAMETER IT'S THE METHOD AND THE SECOND ONE IT'S THE PAYLOAD OR THE THING WE ARE SENDING, IF NEEDED
   * socket.emit("setUsername", {
   * username:
   * })
   *socket.emit("chatmessage",{
     to:"abul",
     text:"i think i really love big boobs. Lol"
    })
    * 
    * 
    */
  // console.log(list);

  // const getPvMsg = async () => {
  //   try {
  //     const resp = await fetch(
  //       "https://striveschool-api.herokuapp.com/api/messages/Richard"
  //     );

  //     if (resp.ok) {
  //       const data = await resp.json();
  //       setData(data);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  //
  // console.log(data);
  // getPvMsg();

  const handleSubmit = (e, user, message) => {
    socket.emit("chatmessage", {
      to: user,
      text: message,
    });
    e.preventDefault();
  };

  return (
    <div className="messaging_containar">
      <div className="messaging_main">
        <div className="messaging_list_user">
          <div className="messaging_list_header">MESSAGING WITH SOME ICONS</div>
          {list.map((n) => (
            <UserMessage onClick={() => console.log("Hello")} />
          ))}
        </div>
        <div className="current_message">
          <div className="current_message_header">
            {" "}
            SELECTED USER MESSAGE <br />
            <small style={{ color: "gray" }}>some time infos and an icon</small>
            <div className="current_message_display">
              <div className="messages">somehing</div>

              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    className="the_current_input"
                    as="textarea"
                    rows={3}
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <Button variant="primary" type="submit" className="submit_message">
            Primary
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Messeging;
