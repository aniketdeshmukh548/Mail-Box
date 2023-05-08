
import { useState } from 'react';
import classes from './outbox.module.css'

const OutBox=()=>{
    const [outbox,setOutbox]=useState('')
    let emailID=localStorage.getItem('email');
   let cleanEmail = emailID.replace(/[@.]/g, "");
    const showHandler = (event) => {
        fetch(
          `https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/SentMail.json`,
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
            setOutbox(data)
          });
      };
      console.log(outbox)
    return(
        <>
        <h1 className={classes.heading}>OutBox Items</h1>
        <div className={classes.feedback}>
        <button onClick={showHandler}>Show</button>
      </div>
        {outbox.data}
        </>

    )
}

export default OutBox;