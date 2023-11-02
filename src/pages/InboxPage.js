import { useState } from "react"
import Inbox from "../components/Inbox/inbox"


const InboxPage=()=>{
    const [setInput]=useState(null)
    const showHandler=(obj)=>{
        setInput(obj)
    }
    return(
        <Inbox onShow={showHandler}/>
    )
}

export default InboxPage;