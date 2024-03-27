import React, {useState, useEffect} from "react";

const Friends = () => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/user/1/friends")
        .then(res => res.json())
        .then(data => {
            setFriends(data);
            console.log(data[0].username);
        }).catch(error => { console.error(error)});
        
    },[]);
    <div style={{width:'100%', height:100, backgroundColor:'greenyellow'}}>
        <div className="friends">
            <div className="">
            {friends.map((friend) => {
                return (
                    <div className="friend" key={friend.id}>
                        <div>
                        {friend.username}
                        </div>
                        <div>
                        <img src={friend.sender_avatar} width={50} height={50} alt="User Avatar" className="rounded-circle me-2" />
                        </div>
                    </div>
                    
                )
            })}
            </div>
        </div>
    </div>

}

export default Friends;