import React from "react";
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import SignUp from "./SignUp";
import Findemail from "./Findemail";
import Findpw from "./Findpw";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            
            <Switch>
                {isLoggedIn ? (
                    <div
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Route exact path="/">
                            <Home refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                    </div>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth/>
                        </Route>
                        <Route exact path="/SignUp">
                            <SignUp/>
                        </Route>
                        <Route exact path="/Findemail">
                            <Findemail/>
                        </Route>
                        <Route exact path="/Findpw">
                            <Findpw/>
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    )
}
export default AppRouter;