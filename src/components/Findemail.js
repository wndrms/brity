import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Findemail = () => {
    const [Proceeding, setProceeding] = useState(0);
    const [counter, setcounter] = useState(0);
    const [phnum, setphnum] = useState();
    const [smsnum, setsmsnum] = useState();

    useEffect( () => {
        const timer = (counter > 0) && setInterval(() => setcounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    const onDecrease = () => setProceeding(Proceeding - 1);
    const onIncrease = () => setProceeding(Proceeding + 1);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "ph-number"){
            setphnum(value);
        } else if(name === "sms-num"){
            setsmsnum(value);
        }
    };
    const toggleCertProceeding = () => {
        setProceeding(Proceeding + 1);
        setcounter(180);
    }
    return(
        <>
            <div id="wrap">
                <header id="header">
                    { Proceeding > 0 ? (
                        <button onClick={onDecrease}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>
                    ) : (
                        <>
                            <Link to="/">
                                <button><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>            
                            </Link>
                        </>
                    )}
                </header>
                <div id="content" className="content">
                {
                    (() => {
                        if (Proceeding === 0) {
                            return(
                                <>
                                    <div className="logo-wrap">
                                        <h2>계정 찾기 🔎</h2>
                                    </div>
                                    <p>전화번호를 입력하여 계정을 찾을 수 있어요 🧐</p>
                                    <div className="form-box">
                                        <form>
                                            <label for="ph-number">휴대폰 번호<span className="required">*</span></label>
                                            <input 
                                                type="number" 
                                                id="ph-number" 
                                                className="input-basic"
                                                name="ph-number"
                                                onChange={onChange}
                                                placeholder="휴대전화 번호를 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">다음 버튼을 누르면 인증번호가 발송됩니다.</div>
                                        </form>

                                        <form className="btn-wrap">
                                            {phnum ? (
                                                <button className="btn-basic next enable" onClick={toggleCertProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </form>
                                    </div>
                                </>
                            );
                        }
                        else if (Proceeding === 1) {
                            return(
                                <>
                                    <div className="logo-wrap">
                                        <h2>번호인증</h2>
                                    </div>
                                    <p>인증번호가 발송되었습니다 💌<br/>
                                        오지 않았다면, 입력하신 번호를 다시 확인해주세요</p>
                                    <div className="form-box">
                                        <div>
                                            <form>
                                                <label for="sms-num">인증번호<span className="required">*</span></label>
                                                <input 
                                                    type="text" 
                                                    className="input-basic" 
                                                    name="sms-num"
                                                    onChange={onChange}
                                                    id="sms-num" 
                                                    placeholder=""/>
                                                <button type="submit"></button>
                                                <div className="message">인증번호가 발송되었습니다</div>
                                            </form>
                                            <form>
                                                <button type="submit" className="btn-purple enable">인증하기</button>
                                                <div className="message">입력시간 {Math.floor(counter/60)}: {counter%60 < 10 ? ('0'+String(counter%60)) : (counter%60)}</div>
                                            </form>
                                        </div>
                                        <form className="btn-wrap">
                                            {smsnum ? (
                                                <button className="btn-basic next enable" onClick={onIncrease}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </form>
                                    </div>
                                </>
                            );
                        }
                        else if(Proceeding === 2){
                            return(
                                <>
                                    <div className="logo-wrap">
                                        <h2>계정을 찾았어요 :)</h2>
                                    </div>
                                    <p>입력하신 전화번호로 등록한 계정을 찾았어요<br/>
                                        이어서 비밀번호를 재설정 할 수 있습니다</p>
                                    <div className="text-box">
                                        <div>
                                            <p>e-mail</p>
                                            <p>milleniz@milleniz.com</p>
                                        </div>
                                        <form className="btn-wrap">
                                            <Link to="/Findpw">
                                                <button className="btn-basic pw">비밀번호 재설정</button>
                                            </Link>
                                        </form>
                                    </div>
                                    <form className="btn-wrap">
                                        <Link to="/">
                                            <button className="btn-purple">로그인 하기</button>
                                        </Link>
                                    </form>
                                </>
                            );
                        }
                    })()
                } 
                </div>
                <footer id="footer"></footer>
            </div>
        </>
    );
};

export default Findemail;