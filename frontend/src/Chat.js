import React from "react";
import './Chat.css'
const Chat = () => {
 return(
    <div className="card mb-4 shadow-sm" style={{display:"flex", justifyContent:'center', alignItems:'center', height:1000}}>
        <div className="chat_container" >
            <div></div>
        <div className="border" style={{dislay:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <div className="border" style={{height:'90%', display:'inherit' }}>Hiya</div>
            <div className="cuh" style={{height:'10%', justifyContent:'inherit'}}>
                <input type="text" placeholder='Type here...' style={{width:'90%', height: 40, alignSelf: 'center', borderRadius:100, padding: 20}}/>
            </div>
        </div>
        </div>
    </div>
 );
}

export default Chat;