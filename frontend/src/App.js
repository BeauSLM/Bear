import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './BearHeader';
import CommunityCard from './CommunityCard';
import ForumCard from './ForumCard';
import ThreadCard from './ThreadCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackButton from './BackButton';
import Thread from './Thread';
import LoginPage from './Login';


const App = () => {

    const ForumActivity = [
        { forum: "Thread One", time: "2 hours ago" },
        { forum: "Thread Two", time: "3 days ago" },
    ];

    return (
        <Router>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={
                        <>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4>Popular Communities</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <CommunityCard />
                                    </div>
                                </div>
                            </div>
                        </>
                    } />
                    <Route path="/community/:id" element={
                        <>
                            <BackButton destination={""} />
                            <div className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4>All Categories</h4>
                                </div>
                                <div className="card-body">
                                    <ForumCard
                                        subscribed={4}
                                        threads={138}
                                        userActivity={ForumActivity}
                                    />
                                </div>
                            </div>
                        </>
                    } />
                    <Route path="/threads/:id" element={
                        <>
                            <ThreadCard />
                        </>
                    } />
                    <Route path="/thread/:id" element={
                        <>
                            <Thread />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
