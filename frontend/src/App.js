import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './BearHeader';
import CommunityCard from './CommunityCard';
import ForumCard from './ForumCard';
import ThreadCard from './ThreadCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackButton from './BackButton';
import Thread from './Thread';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './Chat'
const App = () => {

    const [communities, setCommunities] = useState(["blah, bleh, bloh "]);

    // useEffect(() => {
    //     axios.get('http://localhost:3001/user')
    //         .then(response => {
    //             console.log(response.data);
    //             setCommunities(response.data);
    //         })
    //         .catch(error => {
    //             // Handle error
    //             console.log('Error fetching communities data:', error);
    //         });
    // }, []);

    console.log(communities);

    // const communities = [
    //     {id: 0, name: "Test", description: "test"}
    // ];


    const userActivity = [
        { forum: "Forum One", time: "2 hours ago" },
        { forum: "Forum Two", time: "3 days ago" },
    ];

    const ForumActivity = [
        { forum: "Thread One", time: "2 hours ago" },
        { forum: "Thread Two", time: "3 days ago" },
    ];

    const threads = [
        { name: "Thread Name 1", userName: "3p1cUser140", threadDate: "Feb 14, 2024", lastPostDate: "4 days ago" },
        { name: "Thread Name 2", userName: "3p1cUser140", threadDate: "Feb 15, 2024", lastPostDate: "5 days ago" },
    ];



    return (
        <Router>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4>Popular Communities</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <CommunityCard
                                            // id={communities[0].id}
                                            name={communities[0].name}
                                            description={communities[0].description}
                                            subscribed={4}
                                            threads={138}
                                            userActivity={userActivity}
                                        />
                                        <CommunityCard
                                            name="Community Name"
                                            description="Add a short description about your community here"
                                            subscribed={4}
                                            threads={138}
                                            userActivity={userActivity}
                                        />
                                        <CommunityCard
                                            name="Community Name"
                                            description="Add a short description about your community here"
                                            subscribed={4}
                                            threads={138}
                                            userActivity={userActivity}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4>Newest Communities</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <CommunityCard
                                            name="Community Name"
                                            description="Add a short description about your community here"
                                            subscribed={2}
                                            threads={9730}
                                            userActivity={userActivity}
                                        />
                                        <CommunityCard
                                            name="Community Name"
                                            description="Add a short description about your community here"
                                            subscribed={4}
                                            threads={138}
                                            userActivity={userActivity}
                                        />
                                        <CommunityCard
                                            name="Community Name"
                                            description="Add a short description about your community here"
                                            subscribed={4}
                                            threads={138}
                                            userActivity={userActivity}
                                        />
                                        {/* Additional CommunityCard components */}
                                    </div>
                                </div>
                            </div>
                        </>
                    } />

                    {/* Corrected Route for the user profile page */}
                    <Route path="/community/:id" element={
                        <>
                            <BackButton
                                destination={""} />
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4>Category 1</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <ForumCard
                                            name="Forum Name"
                                            description="Add a short description about your Forum here"
                                            subscribed={4}
                                            threads={138}
                                            userActivity={ForumActivity}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4>Category 2</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <ForumCard
                                            name="Forum Name"
                                            description="Add a short description about your community here"
                                            subscribed={2}
                                            threads={9730}
                                            userActivity={ForumActivity}
                                        />
                                        <ForumCard
                                            name="Forum Name"
                                            description="Add a short description about your community here"
                                            subscribed={2}
                                            threads={9730}
                                            userActivity={ForumActivity}
                                        />
                                        <ForumCard
                                            name="Forum Name"
                                            description="Add a short description about your forum here"
                                            subscribed={2}
                                            threads={9730}
                                            userActivity={ForumActivity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>

                    } />  <Route path="/threads" element={
                        <>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <BackButton
                                        destination={"community"} />
                                    <h4>Thread List</h4>
                                </div>
                                <div className="card-body">
                                    {threads.map((thread, index) => (
                                        <ThreadCard
                                            key={index}
                                            threadName={thread.name}
                                            userName={thread.userName}
                                            threadDate={thread.threadDate}
                                            lastPostDate={thread.lastPostDate}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    } />
                    <Route path="/thread" element={
                        <>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <BackButton
                                        destination={"threads"} />
                                    <h4>Thread</h4>
                                </div>
                                <div className="card-body">
                                    {threads.map((thread, index) => (
                                        <Thread
                                            key={index}
                                            userName={thread.userName}
                                            lastPostDate={thread.lastPostDate}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    } />
                    <Route path="/chat" element={<Chat/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;

