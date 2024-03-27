import React, {useState, useEffect} from "react";
import './Chat.css'
import UserSearch from "./UserSearch";
import axios from 'axios';
import Friends from "./Friends";
// user params with /Chat/:userID
const Chat = () => {

    // useEffect(async()=>{
    //     if(currentUser) {
    //         const users = await axios.get('http://localhost:3001/user');
    //         const friends = await axios.get(`http://localhost:3001/user/${currentUser}/friend`);

    //     }
    // },[])
    // useEffect(() => {
    //     if(currentUser) {
    //         if (currentUser) {
    //             setCurrentUserImage(currentUser)
    //         }
    //     }
    // }, [currentUser])
 return(
    
    <div className="card mb-4 shadow-sm" style={{display:"flex", justifyContent:'center', alignItems:'center', height:1000}}>
        <div className="chat_container" >
            <div style={{borderTop: '1px solid #000', borderBottom: '1px solid #000', borderRight: '1px solid #000', borderLeft: '1px solid #000'}}>
                <UserSearch/>
            </div>
            
            
        </div>
    </div>
 );
}

/*
            <div className = "friends">
                {
                    contacts.map((contact, index) => {
                        return (
                            <div className={`friend`}>
                                
                            </div>
                        )
                    })
                }
            </div>
*/
/*
   <div></div>
        <div className="border" style={{dislay:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <div className="border" style={{height:'90%', display:'inherit' }}>Hiya</div>
            <div className="cuh" style={{height:'10%', justifyContent:'inherit'}}>
                <input type="text" placeholder='Type here...' style={{width:'90%', height: 40, alignSelf: 'center', borderRadius:100, padding: 20}}/>
            </div>
        </div>
*/
export default Chat;