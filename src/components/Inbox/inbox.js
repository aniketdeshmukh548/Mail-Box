import { useContext } from 'react'
import classes from './inbox.module.css'
import AuthContext from '../../Store/auth-context'
import { useState } from 'react'

const Inbox=(props)=>{
    const [inbox,setInbox]=useState([])
    const {inboxdata}=useContext(AuthContext)
    const userLocalid=localStorage.getItem('localId')
    console.log(userLocalid)
    console.log(inboxdata)
    const showHandler=(event)=>{
        fetch(`https://mail-box-react-default-rtdb.firebaseio.com/MailBox/${userLocalid}.json`,{
            method:'GET',
            headers:{'Content-Type':'application/JSON'}
        }).then(res=>{
            if(res.ok){
                return (res.json())
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
             setInbox(data)
            })
    }
    const InboxList=[];
    for(let key in inbox){
        const id=key;
      const {Subject,To,Description}=inbox[key]
      InboxList.push(<ul key={id}>
        <li>
     Subject:{Subject} To:{To} Description:{Description}
     <button >Edit</button>
     <button >Delete</button>
  </li></ul>)
    }
    return(
        <>
        <h1 className={classes.heading}>Inbox Items</h1>
        <button onClick={showHandler}>Show</button>
        {inboxdata && InboxList}
        </>
    )
}

export default Inbox;