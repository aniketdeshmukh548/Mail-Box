
import { useState } from 'react';
import classes from './outbox.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OutBox=()=>{
    const navigate=useNavigate()
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
            if (data !== null && data !== undefined) {
              setOutbox(data);
            }
          });
      };

      useEffect(() => {
        const interval = setInterval(() => {
          showHandler();
        }, 3000)
        return () => clearInterval(interval)
      }, );

      const values=Object.values(outbox)
      //console.log(values)
      
    return(
        <>
        <h1 className={classes.heading}>OutBox Items</h1>
      <div className={classes.feedback}>
        <button onClick={showHandler}>Show</button>
      </div>
      <div className={classes.back}>
        <button onClick={() => navigate(`/`)}>Back</button>
      </div>
      {values.length > 0 ? ( // Check if values is not empty
        values.map((val, index) => (
          <ul key={index}>
            <li className={classes.list}>
              Description: {val.Description} Subject: {val.Subject} To: {val.To}
            </li>
          </ul>
        ))
      ) : (
        <p>No emails in the outbox</p>
      )}
        </>

    )
}

export default OutBox;