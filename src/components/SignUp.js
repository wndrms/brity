import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const SignUp = () => {
    const [Proceeding, setProceeding] = useState(0);
    const [error, seterror] = useState();
    const [counter, setcounter] = useState(0);
    useEffect( () => {
        const timer = (counter > 0) && setInterval(() => setcounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    const decresProceeding = () => setProceeding(Proceeding - 1);
    const incresProceeding = () => setProceeding(Proceeding + 1);
    const toggleCertProceeding = () => {
        setProceeding(Proceeding + 1);
        setcounter(180);
    }
    return(
        <>
            <div id="wrap">
                <header id="header">
                    { Proceeding > 0 ? (
                        <button onClick={decresProceeding}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>
                    ) : (
                        <>
                            <Link to="/">
                                <button onClick={decresProceeding}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>
                            </Link> 
                        </>
                    )}
                </header>
                <div id="content" className="content">
                    <div className="logo-wrap">
                        <h2>Brity</h2>
                        <p>admin</p>
                    </div>
                    {
                        (() => {
                            if(Proceeding === 0) {
                                return(
                                    <>
                                        <p>입력하신 이메일로 등록한 계정이 없습니다<br/>
                                            바로 계정 만들기를 시작하겠습니다 😉</p>
                                        <div className="form-box">
                                            <form action="">
                                                <label for="name">이름</label>
                                                <input type="text" className="input-basic" placeholder="본인이름을 입력하세요"/>
                                                <button type="button"></button>
                                                <div className="message">{error}</div>
                                            </form>
                                            <form action="">
                                                <label for="ph-number">휴대폰 번호</label>
                                                <input type="text" className="input-basic" placeholder="휴대폰 번호를 입력하세요"/>
                                                <button type="button"></button>
                                                <div className="message">다음 버튼을 누르면 인증번호가 발송됩니다.</div>
                                            </form>
                                            <div className="btn-wrap">
                                                <button className="btn-basic next" onClick={toggleCertProceeding}>다음</button>
                                            </div>
                                        </div>
                                        <Link to="/">
                                            <button className="btn-purple fix-bottom">로그인 하기</button>
                                        </Link>
                                    </>
                                );
                            }
                            else if (Proceeding === 1){
                                return (
                                    <>
                                        <p>인증번호가 발송되었습니다 💌<br/>
                                            오지 않았다면, 입력하신 번호를 다시 확인해주세요</p>
                                        <div className="form-box">
                                            <div className="certification-number">
                                                <form action="">
                                                    <label for="name">인증번호</label>
                                                    <input type="text" className="input-basic" placeholder=""/>
                                                    <button type="button"></button>
                                                    <div className="message">{error}</div>
                                                </form>
                                                <form action="">
                                                    <label for="name"></label>
                                                    <input type="submit" className="input-basic" value="인증하기"/>
                                                    <button type="button"></button>
                                                    <div className="message">입력시간 {Math.floor(counter/60)} : {counter%60}</div>
                                                </form>
                                            </div>
                                            <div className="btn-wrap">
                                                <button className="btn-basic next" onClick={incresProceeding}>다음</button>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            else if (Proceeding === 2){
                                return (
                                    <>
                                        <p>지금 설정하신 닉네임으로 링크가 생성됩니다.<br/>
                                            나중엔 변경 불가합니다 🔏</p>
                                        <div className="form-box">
                                            <form action="">
                                                <label for="number" className="required">닉네임(아이디)</label>
                                                <input type="text" className="input-basic" placeholder="닉네임을 입력하세요"/>
                                                <input type="button"></input>
                                                <div className="message">변경 불가 사항🔒</div>
                                            </form>

                                            <div className="btn-wrap">
                                                <button className="btn-basic next" onClick={incresProceeding}>다음</button>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            else if (Proceeding === 3){
                                return (
                                    <>
                                        <p>로그인에 필요한 비밀번호를 만드세요</p>
                                        <div className="form-box">
                                            <form action="">
                                                <label for="number" className="required">비밀번호</label>
                                                <input type="text" className="input-basic" placeholder="비밀번호를 입력하세요"/>
                                                <button type="button"></button>
                                                <div className="message">🤫소문자, 숫자 포함 8자리 이상</div>
                                            </form>
                                            <div className="btn-wrap">
                                                <button className="btn-basic next" onClick={incresProceeding}>다음</button>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            else if (Proceeding === 4){
                                return (
                                    <>
                                        <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                            정보는 나중에 얼마든지 수정할 수 있어요</p>
                                        <div className="form-box">
                                            <p>생일</p>
                                            <form action="">
                                                <div>
                                                    <label for="number"></label>
                                                    <input type="number" className="input basic" placeholder="연도"/> 
                                                </div>
                                                <div>
                                                    <label for="number"></label>
                                                    <input type="number" className="input basic" placeholder="월"/>
                                                </div>
                                                <div>
                                                    <label for="number"></label>
                                                    <input type="number" className="input basic" placeholder="일"/>
                                                </div>
                                            </form>
                                            <div className="btn-wrap">
                                                <button className="btn-basic next">다음</button>
                                            </div>
                                        </div>
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

export default SignUp;