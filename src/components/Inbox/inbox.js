import { useContext } from "react";
import classes from "./inbox.module.css";
import AuthContext from "../../Store/auth-context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFetchData from "../../Store-Redux/FetchData";

const Inbox = (props) => {
  const [inbox, setInbox] = useState([]);
  const navigateback=useNavigate()
  const { inboxdata } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailID = localStorage.getItem("email");
  let cleanEmail = emailID.replace(/[@.]/g, "");

  const [newdata] = useFetchData(
    `https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/ReceivedMail.json`
  );
  const showHandler = () => {
    setInbox(newdata);

    // fetch(
    //   `https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/ReceivedMail.json`,
    //   {
    //     method: "GET",
    //     headers: { "Content-Type": "application/JSON" },
    //   }
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = "Authentication failed";
    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     //console.log(data);
    //     setInbox(data)
    //   });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      showHandler();
    }, 1000);
    return () => clearInterval(interval);
  });

  const deleteHandler = (event) => {
    event.preventDefault();

    fetch(
      `https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/ReceivedMail/${event.target.id}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/JSON" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Deletion failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("email deleted successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const InboxList = [];
  for (let key in inbox) {
    const id = key;
    const { Subject, To, Description, READ } = inbox[key];
    InboxList.push(
      <ul key={id}>
        <li className={classes.list}>
          {!READ && <button className={classes.notification}>New</button>}
          Subject:{Subject} To:{To} Description:{Description}
          <button onClick={() => navigate(`/details/${id}`)} id={id}>
            See Details
          </button>
          <button onClick={deleteHandler} id={id}>
            Delete
          </button>
        </li>
      </ul>
    );
  }
  return (
    <>
      <h1 className={classes.heading}>Inbox Items</h1>
      <div className={classes.feedback}>
        <button onClick={showHandler}>Show</button>
      </div>
      <div className={classes.back}>
      <button onClick={()=>navigateback(`/`)}>Back</button>
      </div>
      {inboxdata && InboxList}
    </>
  );
};

export default Inbox;
