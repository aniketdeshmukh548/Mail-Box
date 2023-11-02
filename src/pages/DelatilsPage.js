import { useEffect } from "react";
import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

const Details=(props)=>{

    const navigate=useNavigate()
    const params=useParams()
   // console.log(params)
    const id=params.id
   // console.log(id)
    const emailID=localStorage.getItem('email')
  let cleanEmail = emailID.replace(/[@.]/g, "");

  const [details,setDetails]=useState('')
    const seeDetails=(params)=>{
        fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/ReceivedMail/${id}.json`,{
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
          setDetails(data)
        });

        fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/ReceivedMail/${id}.json`,{
          method: "PATCH",
          body:JSON.stringify({
            READ:true
          }),
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
      }
      useEffect(()=>{
        seeDetails()
      },)
    return(
        <>
        <h2>Details</h2>
        <p>Description:{details.Description}</p>
        <p>TO:{details.To}</p>
        <p>Subject:{details.Subject}</p>
        <div>
            <button onClick={()=>navigate(`/inbox`)}>Back</button>
        </div>
        </>
    
    )
}

export default Details;