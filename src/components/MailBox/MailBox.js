import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from './MailBox.module.css'
import { useRef } from "react";
const MailBox = () => {
    const enterTO=useRef();
    const enterSub=useRef();
    const userLocalid=localStorage.getItem('localId');
    console.log(userLocalid)
    const submitHandler=(event)=>{
        event.preventDefault();
        const TO=enterTO.current.value;
        const SUB=enterSub.current.value;
        fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${userLocalid}.json`,{
            method:'POST',
            body:JSON.stringify({
                To:TO,
                Subject:SUB,
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
        required
      />
      </div>
      <button type="submit">Send</button>
    </form>
    </div>
  );
};

export default MailBox;
