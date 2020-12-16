import { authService } from "fbase";
import React, { useState } from "react";
import {Link} from "react-router-dom";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const [Proceeding, setProceeding] = useState(false);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        console.log("email : ", email);
        console.log("password : ", password);
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email, 
                    password
                );
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };
    const toggleProceeding = () => setProceeding(true);
    return(
        <>
            <div id="wrap">
                <header id="header">
                    <button><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>
                </header>
                <div id="content" className="content">
                    <div className="logo-wrap">
                        <h1>Brity</h1>
                        <p>admin</p>
                    </div>
                    { Proceeding ? (
                        <>
                            <p>{email}</p>
                            <div className="form-box">
                                <form action="">
                                    <label for="password">비밀번호</label>
                                    <input 
                                        name="password" 
                                        type="password" 
                                        className="input-basic" 
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={onChange}/>
                                </form>
                                <div className="btn-wrap">
                                    <a href="#">비밀번호를 잊으셨나요?</a>
                                    <button className="btn-basic next" onClick={onSubmit}>다음</button>
                                    {error && <span className="authError">{error}</span>}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>안녕하세요, 브리티 관리자 페이지 입니다😀<br></br>
                                브리티와 함께 영역을 확장해볼까요?</p>
                            <div className="form-box">
                                <form action="">
                                    <label for="email">이메일</label>
                                    <input 
                                        name="email" 
                                        type="text" 
                                        className="input-basic" 
                                        placeholder="이메일이나 아이디를 입력하세요"
                                        onChange={onChange}/>
                                </form>
                                <div className="btn-wrap">
                                    <a href="#">이메일을 잊으셨나요?</a>
                                    <button className="btn-basic next" onClick={toggleProceeding}>다음</button>
                                </div>
                            </div>
                            <a href="#" className="login-google">Continue with Google</a>         
                        </>
                        )}
                    <Link to="/SignUp">
                        <button className="btn-purple fix-bottom">Brity 계정 만들기</button>
                    </Link>   
                </div>
            </div>
            <footer id="footer"></footer>
        </>
    );
};

export default AuthForm;