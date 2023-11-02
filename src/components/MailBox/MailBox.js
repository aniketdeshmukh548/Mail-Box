import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from './MailBox.module.css'
import { useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../Store/auth-context";
import { useState } from "react";
const MailBox = () => {
    const {inboxdata}=useContext(AuthContext)
    const enterTO=useRef();
    const enterSub=useRef();
    const [enterDescription,setenterDescription]=useState('')
    const updateTextDescription = (event) => {
        setenterDescription(event.blocks[0].text);   
      };
    let emailID=localStorage.getItem('email');
   let cleanEmail = emailID.replace(/[@.]/g, "");
   // console.log(cleanEmail)
    const submitHandler=(event)=>{
        event.preventDefault();
        const TO=enterTO.current.value;
        const SUB=enterSub.current.value;
        const DESCRIPTION=enterDescription;
        inboxdata(TO,SUB,DESCRIPTION)
        fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${cleanEmail}/SentMail.json`,{
            method:'POST',
            body:JSON.stringify({
                To:TO,
                Subject:SUB,
                Description:DESCRIPTION,
                returnSecureToken: true,
            }),
            headers:{'Content-Type':'application/JSON'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
            else {
                return res.json().then((data) => {
                  let errorMessage = "Authentication failed";
                  throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
              console.log(data);
              console.log("mail sent successfully");
              alert("mail sent successfully")
            })
            .catch((err) => {
              alert(err.message);
            });


            let ToEmail=TO.replace(/[@.]/g, "");
            console.log(ToEmail)

            fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${ToEmail}/ReceivedMail.json`,{
            method:'POST',
            body:JSON.stringify({
                To:TO,
                Subject:SUB,
                Description:DESCRIPTION,
                READ:false,
            }),
            headers:{'Content-Type':'application/JSON'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
            else {
                return res.json().then((data) => {
                  let errorMessage = "Authentication failed";
                  throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
              console.log(data);
              //console.log("mail sent successfully");
             // alert("mail sent successfully")
            })
            .catch((err) => {
              alert(err.message);
            });
    }
  return (
    <div className={classes.composemail}>
    <form onSubmit={submitHandler}>
    <h2>Welcome To Mail Box !!!</h2>
    <div>
          <label>To:</label>
          <input
            type='email'
            id='email'
            required placeholder="Enter Email-id" ref={enterTO}
          />
        </div>
        <div>
        <label>Subject:</label>
          <input
            type='text'
            id='text'
            required placeholder="Enter Subject Line" ref={enterSub}
          />
        </div>
      <div className={classes.text}>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        required value={enterDescription} onChange={updateTextDescription}
      >
      </Editor>

      </div>
      <button type="submit">Send</button>
    </form>
    </div>
  );
};

export default MailBox;
