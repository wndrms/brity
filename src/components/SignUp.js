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
                {
                    (() => {
                        if(Proceeding === 0) {
                            return(
                                <>
                                    <div className="logo-wrap">
                                        <h2>Brity</h2>
                                        <p>admin</p>
                                    </div>
                                    <p>입력하신 이메일로 등록한 계정이 없습니다<br/>
                                        바로 계정 만들기를 시작하겠습니다 😉</p>
                                    <div className="form-box">
                                        <form>
                                            <label for="user-name">이름<span className="required">*</span></label>
                                            <input type="text" className="input-basic" id="user-name" placeholder="본인이름을 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">{error}</div>
                                        </form>
                                        <form action="">
                                            <label for="ph-number">휴대폰 번호<span className="required">*</span></label>
                                            <input type="text" className="input-basic" id="ph-number" placeholder="휴대폰 번호를 입력하세요"/>
                                            <button type="submit"></button>
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
                                    <div className="logo-wrap">
                                        <h2>번호인증</h2>
                                    </div>
                                    <p>인증번호가 발송되었습니다 💌<br/>
                                        오지 않았다면, 입력하신 번호를 다시 확인해주세요</p>
                                    <div className="form-box">
                                        <div>
                                            <form>
                                                <label for="sms-num">인증번호<span className="required">*</span></label>
                                                <input type="number" className="input-basic" id="sms-num"/>
                                                <button type="submit"></button>
                                                <div className="message">인증번호가 발송되었습니다</div>
                                            </form>
                                            <form>
                                                <button type="submit" className="btn-purple enable">인증하기</button>
                                                <div className="message">입력시간 {Math.floor(counter/60)} : {counter%60 < 10 ? ('0'+String(counter%60)) : (counter%60)}</div>
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
                                    <div className="logo-wrap">
                                        <h2>닉네임 만들기</h2>
                                    </div>
                                    <p>지금 설정하신 닉네임으로 링크가 생성됩니다.<br/>
                                        나중엔 변경 불가합니다 🔏</p>
                                    <div className="form-box">
                                        <form>
                                            <label for="user-id">닉네임(아이디)<span className="required">*</span></label>
                                            <input type="text" className="input-basic" id="user-id" placeholder="닉네임을 입력하세요"/>
                                            <button type="submit"></button>
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
                                    <div className="logo-wrap">
                                        <h2>비밀번호 만들기</h2>
                                    </div>
                                    <p>로그인에 필요한 비밀번호를 만드세요</p>
                                    <div className="form-box">
                                        <form>
                                            <label for="pw">비밀번호<span className="required">*</span></label>
                                            <input type="password" className="input-basic" id="pw" placeholder="비밀번호를 입력하세요"/>
                                            <button type="submit"></button>
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
                                    <div className="logo-wrap">
                                        <h2>생일 등록하기</h2>
                                    </div>
                                    <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                        정보는 나중에 얼마든지 수정할 수 있어요</p>
                                    <div className="form-box">
                                        <p>생일</p>
                                        <form>
                                            <div>
                                                <label for="year"></label>
                                                <input type="number" id="year" min="1900" max="2020" className="input basic" placeholder="연도"/> 
                                            </div>
                                            <div>
                                                <label for="month"></label>
                                                <input type="number" id="month" min="1" max="12" className="input basic" placeholder="월"/>
                                            </div>
                                            <div>
                                                <label for="date"></label>
                                                <input type="number" id="date" min="1" max="31" className="input basic" placeholder="일"/>
                                            </div>
                                        </form>
                                        <div className="btn-wrap">
                                            <button className="btn-basic next" onClick={incresProceeding}>다음</button>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                        else if (Proceeding === 5) {
                            <>
                                <div className="logo-wrap">
                                    <h2>주소 등록하기</h2>
                                </div>
                                <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                    정보는 나중에 얼마든지 수정할 수 있어요</p>
                                <div className="form-box">
                                    <div>
                                        <form>
                                            <label for="address">주소</label>
                                            <input type="text" className="input basic" id="address" placeholder="우편번호를 입력하세요"/>
                                            <button type="submit"></button>
                                        </form>
                                        <form>
                                            <button type="submit" className="btn-purple">우편번호 찾기</button>
                                        </form>
                                    </div>
                                    <form>
                                        <label for="detail-address"></label>
                                        <input type="text" class="input-basic" id="detail-address" placeholder="상세주소를 입력하세요"/>
                                        <button type="submit"></button>
                                        <div className="message">{error}<span className="required"></span></div>
                                    </form>
                                    <form className="btn-wrap">
                                        <button className="btn-basic next" onClick={incresProceeding}>다음</button>
                                    </form>
                                </div>
                            </>
                        }
                        else if (Proceeding === 6) {
                            <>
                                <div className="logo-wrap">
                                    <h2>약관 동의</h2>
                                </div>
                                <p>회원님의 개인 정보를 안전하게 보호합니다 🤫<br/>
                                    모든 약관에 동의하시고, 새로운 서비스를 경험해보세요</p>
                                <div className="form-box">
                                    <form>
                                        <ul>
                                            <li className="check-circle">
                                                <input type="checkbox" id="survice-check"/>
                                                <label for="survice-check">서비스 이용 약관 운영 및 동의<span class="required">(필수)</span></label>
                                            </li>
                                            <li className="check-circle">
                                                <input type="checkbox" id="info-check"/>
                                                <label for="info-check">개인정보 수집 및 이용 동의<span class="required">(필수)</span></label>
                                            </li>
                                            <li className="check-circle">
                                                <input type="checkbox" id="ad-check"/>
                                                <label for="ad-check">마케팅 정보SMS, 이메일 수신 동의<span>(선택)</span></label>
                                            </li>
                                            <li className="check-circle all">
                                                <input type="checkbox" id="all"/>
                                                <label for="all">모두 동의하고 계속할래요</label>
                                                <div className="message">{error}</div>
                                            </li>
                                        </ul>
                                    </form>
                                    <form className="btn-wrap">
                                        <button className="btn-basic next" onClick={incresProceeding}>다음</button>
                                    </form>
                                </div>
                            </>
                        }
                        else if(Proceeding === 7) {
                            <>
                                <div className="logo-wrap">
                                    <h2>Brity에 오신 것을<br/>환여합니다 :)</h2>
                                </div>
                                <p>다음 정보로 회원가입이 완료되었습니다 🤩</p>
                                <div className="text-box">
                                    <p>e-mail</p>
                                    <p>test@test.com</p>
                                    <p>link / ID</p>
                                    <p>link.milleniz.com/yesss__eif</p>
                                </div>
                                <form className="btn-wrap">
                                    <button className="btn-purple">다음</button>
                                </form>
                            </>
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