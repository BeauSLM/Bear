import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './BearHeader';
import CommunityCard from './CommunityCard';
import ForumCard from './ForumCard';
import ThreadCard from './ThreadCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackButton from './BackButton';
import Thread from './Thread';
import LoginPage from './Login';
import Register from './Register';
import { AuthProvider } from './AuthContext';
import RequireAuth from './RequireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

    const ForumActivity = [
        { forum: "Thread One", time: "2 hours ago" },
        { forum: "Thread Two", time: "3 days ago" },
    ];

    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={
                            <RequireAuth>
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
                            </RequireAuth>
                        } />
                        <Route path="/community/:id" element={
                            <RequireAuth>
                                <>
                                    <BackButton destination={""} />
                                    <div className="card mb-4 shadow-sm">
                                        <div className="card-header">
                                            <h4>All Categories</h4>
                                        </div>
                                        <div className="card-body">
                                            <ForumCard/>
                                        </div>
                                    </div>
                                </>
                            </RequireAuth>
                        } />
                        <Route path="/threads/:id" element={
                            <RequireAuth>
                                <>
                                    <ThreadCard />
                                </>
                            </RequireAuth>
                        } />
                        <Route path="/thread/:id" element={
                            <RequireAuth>
                                <>
                                    <Thread />
                                </>
                            </RequireAuth>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
