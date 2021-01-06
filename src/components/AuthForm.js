import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import {Link} from "react-router-dom";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [Proceeding, setProceeding] = useState(false);
    const [focusemail, setfocusemail] = useState(false);
    const [focuspw, setfocuspw] = useState(false);
    const [pwshow, setpwshow] = useState(false);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            data = await authService.signInWithEmailAndPassword(
                email, 
                password
            );
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    const toggleProceeding = () => setProceeding((prev) => !prev);
    const onFocus = (event) => {
        const {target: {name}} = event;
        if(name === "email"){
            setfocusemail((prev) => !prev);
        } else if(name === "password"){
            setfocuspw((prev) => !prev);
        }
    };
    const togglepwshow = (event) => {
        event.preventDefault();
        setpwshow((prev) => !prev);
    }
    const onDelete = (event) => {
        event.preventDefault();
        setEmail("");
    }
    return(
        <>
            <div id="wrap" className={Proceeding ? "login-pw join" : "login-email join"}>
                <header id="header">
                    <button onClick={toggleProceeding}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>
                </header>
                <div id="content" className="content">
                    
                    {!Proceeding ? (
                        <>
                            <div className="logo-wrap">
                                <h1>Brity</h1>
                                <p>admin</p>
                            </div>
                            <p>안녕하세요, 브리티 관리자 페이지 입니다😀<br></br>
                                브리티와 함께 영역을 확장해볼까요?</p>
                            <div className="form-box">
                                <form className={(focusemail ? "selected" : "") + (email ? " filled" : "")}>
                                    <label for="user-email">이메일</label>
                                    <input 
                                        name="email" 
                                        type="email" 
                                        className="input-basic"
                                        id="user-email" 
                                        placeholder="이메일이나 아이디를 입력하세요"
                                        value={email}
                                        onFocus={onFocus}
                                        onBlur={onFocus}
                                        onChange={onChange}/>
                                    <button onClick={onDelete}></button>
                                    <div className="message">{error}</div>
                                </form>
                                <div className="btn-wrap">
                                    <Link to="/Findemail">
                                        이메일을 잊으셨나요?
                                    </Link>
                                    {email ? (
                                        <button className="btn-basic next enable" onClick={toggleProceeding}>다음</button>
                                    ) : (
                                        <button className="btn-basic next">다음</button>
                                    )}
                                </div>
                            </div>
                            <a onClick={onSocialClick} name="google" className="login-google btn-purple enable">Continue with &nbsp;<img src={process.env.PUBLIC_URL + 'google.svg'} alt="google"/></a>         
                        </>
                        ) : (
                        <>
                            <div className="logo-wrap">
                                <h2>Brity</h2>
                                <p>admin</p>
                            </div>
                            <p className="user-id">{email}</p>
                            <div className="form-box">
                                <form className={(focuspw ? "selected" : "") + (pwshow ? " pw-veiw" : " pw-hide")}>
                                    <label for="login-pw">비밀번호</label>
                                    <input 
                                        name="password" 
                                        type={pwshow ? "text" : "password"}
                                        className="input-basic" 
                                        id="login-pw"
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onFocus={onFocus}
                                        onBlur={onFocus}
                                        onChange={onChange}/>
                                        <button onClick={togglepwshow}></button>
                                        <div className="message">{error}</div>
                                </form>
                                <div className="check-circle square">
                                    <input type="checkbox" id="pw-save"/>
                                    <label for="pw-save">로그인 유지하기</label>
                                </div>
                                <div className="btn-wrap">
                                    <Link to="/Findpw">
                                        비밀번호를 잊으셨나요?
                                    </Link>
                                    {password ? (
                                        <button className="btn-basic next enable" onClick={onSubmit}>다음</button>
                                    ) : (
                                        <button className="btn-basic next">다음</button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    <Link to="/SignUp">
                        <button className="btn-purple fix-bottom enable">Brity 계정 만들기</button>
                    </Link>   
                </div>
            </div>
            <footer id="footer"></footer>
        </>
    );
};

export default AuthForm;