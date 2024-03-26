import React, {useState, useEffect} from "react";
import UserSearch from "./UserSearch";

function Contacts({currentUser}) {
    const [convoSelected, setConvoSelected] = useState(undefined);
    //useEffect
    return (
        <div className="contacts__container">
            <h3>Contacts</h3>
            <UserSearch/>
            <div className="contacts">

                    <div className={`contact`}>
                        <div className="avatar">
                            <img src="./images/person.jpg" alt="avatar" width={50} height={50}/>
                        </div>
                        <div className="username">
                            <h3> username </h3>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Contacts;
// if conversations show "no conversations yet" else show list of previous convos