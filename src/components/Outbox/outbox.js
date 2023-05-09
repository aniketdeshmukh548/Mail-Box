
import { useState } from 'react';
import classes from './outbox.module.css'
import { useEffect } from 'react';

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
           // console.log(data);
           setOutbox(data)
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
      {values.map(val=><ul key={outbox.id}>
        <li className={classes.list}>Description:{val.Description} Subject:{val.Subject} To:{val.To}</li>
      </ul>)}
        </>

    )
}

export default OutBox;