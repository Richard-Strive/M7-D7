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
  const [userName, setUserName] = useState("idiot");

  const [list, setList] = useState([]);
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [sigleMsg, setSinleMsg] = useState("");

  const getPvMsg = async () => {
    try {
      const resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/messages/idiot"
      );

      if (resp.ok) {
        const messaggi = await resp.json();
        setMessages(messaggi);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userMsg = messages.filter((ms1) => ms1.from === user);

  useEffect(() => {
    socket.on("list", (list) => setList(list));
    //il primo paramtro ("list") e' un metodo e la fuzione prende il metodo stesso per ritornare qualcosa cioe la lista di users.

    socket.emit("setUsername", {
      username: userName,
    });

    getPvMsg();
    //Setta i dati
    //PER SETTARE MESSAGI VECCHI DI UN UTENTE

    socket.on("chatmessage", (msg) =>
      setMessages((messages) => messages.concat(msg))
    );
    //con questa parte di codice sto dicendo HEI SOCKET AGGIUNGI IL MIO MESSAGIO CHE INVIO ALLA LISTA DI MESSAGGI IN TEMPO REALE

    // console.log(userMsg);
    // console.log("messages--->", messages);
    socket.on("connect", () => console.log("CONNECTED BRO!!!"));
  }, [messages, list]);

  // useEffect(() => {
  //   socket.on("chatmessage", (msg) =>
  //     setMessages((messages) => messages.concat(msg))
  //   );
  //   getPvMsg();
  // }, [messages]);

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

  //
  // console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message !== "") {
      socket.emit("chatmessage", {
        to: user,
        text: message,
      });
    }

    setMessage("");

    // setMessage
    console.log("Hello it's my function");
  };

  return (
    <div className="messaging_containar">
      <div className="messaging_main">
        <div className="messaging_list_user">
          <div className="messaging_list_header">MESSAGING WITH SOME ICONS</div>
          {list.map((n) => (
            <UserMessage user={n} setUser={setUser} />
          ))}
        </div>
        <div className="current_message">
          <div className="current_message_header">
            {user}
            <br />
            <small style={{ color: "gray" }}>some time infos and an icon</small>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <div className="current_message_display">
                <div className="messages">
                  <ul>
                    {messages
                      .filter((ms1) => ms1.from === user)
                      .map((msg) => (
                        <li className={msg.from === user ? "other_user" : "me"}>
                          {msg.text}
                        </li>
                      ))}
                    {messages
                      .filter((ms1) => ms1.to === user)
                      .map((msg) => (
                        <li className={msg.to === user ? "me" : "mt-2"}>
                          {msg.text}
                        </li>
                      ))}
                  </ul>
                </div>

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
              </div>
              <Button
                variant="primary"
                type="submit"
                className="submit_message"
              >
                Primary
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messeging;
