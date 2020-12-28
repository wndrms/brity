import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Findpw = () => {
    const [Proceeding, setProceeding] = useState(0);
    const [email, setemail] = useState("");
    const [newpw, setnewpw] = useState();
    const [newpw2, setnewpw2] = useState();
    const [error, seterror] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setemail(value);
        } else if(name === "new-pw"){
            setnewpw(value);
        } else if(name === "new-pw-re"){
            setnewpw2(value);
        }
    };
    const onDecrease = () => setProceeding(Proceeding - 1);
    const onIncrease = () => setProceeding(Proceeding + 1);

    return(
        <>
            <div id="wrap" className={"reset-pw0" + Proceeding + " reset-pw"}>
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
                                        <h2>비밀번호 재설정🔏</h2>
                                    </div>
                                    <p>잊어버린 비밀번호를 새롭게 변경할 수 있어요 🧐</p>
                                    <div className="form-box">
                                        <form>
                                            <label for="user-id">이메일 or 아이디<span className="required">*</span></label>
                                            <input 
                                                type="text" 
                                                name="email"
                                                id="user-id" 
                                                className="input-basic" 
                                                placeholder="이메일이나 아이디를 입력하세요"
                                                onChange={onChange}/>
                                            <button type="submit"></button>
                                            <div className="message">다음 버튼을 누르면 인증번호가 발송됩니다.</div>
                                        </form>

                                        <form className="btn-wrap">
                                            {email ? (
                                                <button className="btn-basic next enable" onClick={onIncrease}>다음</button>
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
                                        <h2>비밀번호 변경하기</h2>
                                    </div>
                                    <p><span className="user-id">{email}</span> 님의 비밀번호를 변경하겠습니다<br/>
                                        새로운 번호를 입력해주세요</p>
                                    <div className="form-box">
                                        <div>
                                            <form>
                                                <label for="new-pw">새 비밀번호<span className="required">*</span></label>
                                                <input 
                                                    type="password" 
                                                    className="input-basic" 
                                                    id="new-pw"
                                                    name="new-pw"
                                                    onChange={onChange}
                                                    placeholder="새롭게 설정할 비밀번호를 입력하세요"/>
                                                <button type="submit"></button>
                                                <div className="message">새롭게 설정할 비밀번호를 적어주세요</div>
                                            </form>
                                            <form>
                                                <label for="new-pw">새 비밀번호 확인</label>
                                                <input 
                                                    type="password" 
                                                    className="input-basic" 
                                                    id="new-pw" 
                                                    name="new-pw-re"
                                                    onChange={onChange}
                                                    placeholder="새 비밀번호를 확인해주세요"/>
                                                <button type="submit"></button>
                                                <div className="message">{error}</div>
                                            </form>
                                        </div>
                                        <form className="btn-wrap">
                                            {newpw && newpw2 ? (
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
                                        <h2>비밀번호 변경이 완료되었어요 :)</h2>
                                    </div>
                                    <p>새로운 비밀번호로 변경 완료되었습니다<br/>
                                        바뀐 비밀번호로 다시 로그인해 주세요</p>
                                    <div className="text-box">
                                        <p>e-mail</p>
                                        <p className="user-id">{email}</p>
                                    </div>
                                    <div className="form-box">
                                        <form className="btn-wrap">
                                            <Link to="/">
                                                <button className="btn-purple enable">로그인 하기</button>
                                            </Link>
                                        </form>
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

export default Findpw;