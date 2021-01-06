import React from "react";
import {HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";
import SignUp from "./SignUp";
import Findemail from "./Findemail";
import Findpw from "./Findpw";
import Addcard from "./Addcard";
import Addnotice from "./Addnotice";
import AuthForm from "./AuthForm";
import Customerhelp from "./Customerhelp";
import AccountDelete from "routes/AccountDelete";
import UserHome from "routes/UserHome";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                        <Route exact path="/user">
                            <UserHome userObj={userObj}/>
                        </Route>
                        <Route exact path="/addcard">
                            <Addcard userObj={userObj}/>
                        </Route>
                        <Route exact path="/addnotice">
                            <Addnotice userObj={userObj}/>
                        </Route>
                        <Route exact path="/help">
                            <Customerhelp />
                        </Route>
                        <Route exact path="/profile">
                            <Profile refreshUser={refreshUser} userObj={userObj}/>
                        </Route>
                        <Route exact path="/delete">
                            <AccountDelete refreshUser={refreshUser}/>
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <AuthForm/>
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