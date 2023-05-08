import { useContext, useEffect } from "react";
import classes from "./inbox.module.css";
import AuthContext from "../../Store/auth-context";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SeenUnseenAction } from "../../Store-Redux/seenUnseenSlice";

const Inbox = (props) => {
  const [inbox, setInbox] = useState([]);
  const [unseen,setUnseen]=useState()
  const { inboxdata } = useContext(AuthContext);
  const userLocalid = localStorage.getItem("localId");
  const msgId=localStorage.getItem('Key')
  const dispatch=useDispatch();
  console.log(userLocalid);
  console.log(inboxdata);

  useEffect(()=>{
    if(props.seen==='seen'){
      dispatch(SeenUnseenAction.Seen());
    }
    else{
      dispatch(SeenUnseenAction.Unseen());
    }
  },[dispatch])

  const showHandler = (event) => {
    fetch(
      `https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${userLocalid}.json`,
      {
        method: "GET",
        headers: { "Content-Type": "application/JSON" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setInbox(data);
      });
  };
  const seeDetails=(event)=>{
    event.preventDefault()
    fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${userLocalid}/${event.target.id}.json`,{
      method: "GET",
      headers: { "Content-Type": "application/JSON" },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      console.log(data);
    });
  }
  const deleteHandler=(event)=>{
       event.preventDefault();

        fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${userLocalid}/${event.target.id}.json`,{
            method:'DELETE',
            headers:{'Content-Type':'application/JSON'}
        }).then(res=>{
            if(res.ok){
                return (res.json())
            }
            else {
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
    }
  const InboxList = [];
  for (let key in inbox) {
    const id = key;
    const { Subject, To, Description } = inbox[key];
    InboxList.push(
      <ul key={id}>
        <li className={classes.list}>
          Subject:{Subject} To:{To} Description:{Description}
          <button onClick={seeDetails} id={id}>See Details</button>
          <button onClick={deleteHandler} id={id}>Delete</button>
        </li>
      </ul>
    );
  }
  return (
    <>
      <h1 className={classes.heading}>Inbox Items<p>0</p></h1>
      <div className={classes.feedback}>
        <button onClick={showHandler}>Show</button>
      </div>
      {inboxdata && InboxList}
    </>
  );
};

export default Inbox;
