import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./Messeging.css";
import io from "socket.io-client";
//1. Importare io da socket.io-client

const connOps = {
  transports: ["websocket"],
};
//2. Impostare connectionOptions

let socket = io("https://striveschool-api.herokuapp.com", connOps);
// creare la variabile con la connessione tramite "io" e passando l'url e la connOps. In questo modo preparimao la varibaile per la connesione.

function Messeging() {
  const [list, setList] = useState([]);
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("list", (list) => setList(list));
    //il primo paramtro ("list") e' un metodo e la fuzione prende il metodo stesso per ritornare qualcosa cioe la lista di users.

    socket.emit("setUsername", {
      username: "Richard",
    });

    socket.emit("chatmessage", {
      to: "stefanio",
      text: "I really love big boobs. lol",
    });

    console.log(list);
    socket.on("connect", () => console.log("CONNECTED BRO!!!"));
  }, [list]);

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

  const getPvMsg = async () => {
    try {
      const resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/messages/Richard"
      );

      if (resp.ok) {
        console.log(resp);
      }
    } catch (error) {}
  };

  getPvMsg();
  return (
    <div className="chat_containar">
      <Form.Group className="form_with_input">
        <Form.Control size="lg" type="text" placeholder="Large text" />
      </Form.Group>
    </div>
  );
}

export default Messeging;
