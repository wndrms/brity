import React, { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { authService } from "fbase";

const SignUp = () => {
    const history = useHistory();
    const [Proceeding, setProceeding] = useState(0);
    const [name, setname] = useState("");
    const [phnum, setphnum] = useState();
    const [smsnum, setsmsnum] = useState();
    const [userid, setuserid] = useState();
    const [password, setpassword] = useState("");
    const [year, setyesr] = useState("");
    const [month, setmonth] = useState("");
    const [date, setdate] = useState("");
    const [search, setsearch] = useState(false);
    const [address, setaddress] = useState();
    const [subaddress, setsubaddress] = useState();
    const [error, seterror] = useState();
    const [counter, setcounter] = useState(0);
    useEffect( () => {
        const timer = (counter > 0) && setInterval(() => setcounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "name"){
            setname(value);
        } else if(name === "ph-number"){
            setphnum(value);
        } else if(name === "sms-num"){
            setsmsnum(value);
        } else if(name === "user-id"){
            setuserid(value);
        } else if(name === "pw"){
            setpassword(value);
        } else if(name === "year"){
            setyesr(value);
        } else if(name === "month"){
            setmonth(value);
        } else if(name === "date"){
            setdate(value);
        } else if(name === "detail-address"){
            setsubaddress(value);
        }
    };
    const decresProceeding = () => setProceeding(Proceeding - 1);
    const incresProceeding = () => setProceeding(Proceeding + 1);
    const toggleCertProceeding = () => {
        setProceeding(Proceeding + 1);
        setcounter(180);
    }
    const togglesearch = () => setsearch((prev) => !prev);
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== ''){
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setaddress(fullAddress);
        togglesearch();
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            data = await authService.createUserWithEmailAndPassword(
                userid,
                password
            );
            console.log(data);
        } catch (err) {
            seterror(err.message);
        }
        history.push("/");
    };
    return(
        <>
            <div id="wrap" className={"sign-up-0" + (Proceeding+1) + " sign-up"}>
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
                                            <input 
                                                type="text"
                                                className="input-basic" 
                                                id="user-name"
                                                name="name"
                                                onChange={onChange}
                                                placeholder="본인이름을 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">{error}</div>
                                        </form>
                                        <form>
                                            <label for="ph-number">휴대폰 번호<span className="required">*</span></label>
                                            <input 
                                                type="number" 
                                                className="input-basic" 
                                                id="ph-number" 
                                                name="ph-number"
                                                value={phnum}
                                                onChange={onChange}
                                                placeholder="휴대폰 번호를 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">다음 버튼을 누르면 인증번호가 발송됩니다.</div>
                                        </form>
                                        <div className="btn-wrap">
                                            {name && phnum ? (
                                                <button className="btn-basic next enable" onClick={toggleCertProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </div>
                                    </div>
                                    <Link to="/">
                                        <button className="btn-purple fix-bottom enable">로그인 하기</button>
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
                                                <input 
                                                    type="number" 
                                                    className="input-basic" 
                                                    name="sms-num"
                                                    onChange={onChange}
                                                    id="sms-num"/>
                                                <button type="submit"></button>
                                                <div className="message">인증번호가 발송되었습니다</div>
                                            </form>
                                            <form>
                                                <button type="submit" className="btn-purple enable">인증하기</button>
                                                <div className="message">입력시간 {Math.floor(counter/60)} : {counter%60 < 10 ? ('0'+String(counter%60)) : (counter%60)}</div>
                                            </form>
                                        </div>
                                        <div className="btn-wrap">
                                            {smsnum ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        }
                        else if (Proceeding === 2){
                            return (
                                <>
                                    <div className="logo-wrap">
                                        <h2>아이디 만들기</h2>
                                    </div>
                                    <p>지금 설정하신 아이디으로 링크가 생성됩니다.<br/>
                                        나중엔 변경 불가합니다 🔏</p>
                                    <div className="form-box">
                                        <form>
                                            <label for="user-id">아이디(닉네임)<span className="required">*</span></label>
                                            <input 
                                                type="text" 
                                                className="input-basic" 
                                                id="user-id"
                                                name="user-id"
                                                onChange={onChange}
                                                placeholder="아이디를 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">변경 불가 사항🔒</div>
                                        </form>
                                        <div className="btn-wrap">
                                            {userid ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
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
                                            <input 
                                                type="password" 
                                                className="input-basic" 
                                                name="pw"
                                                value={password}
                                                onChange={onChange}
                                                id="pw" 
                                                placeholder="비밀번호를 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">🤫소문자, 숫자 포함 8자리 이상</div>
                                        </form>
                                        <div className="btn-wrap">
                                            {password ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
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
                                                <input 
                                                    type="number" 
                                                    id="year" 
                                                    min="1900" 
                                                    max="2020" 
                                                    className="input-basic" 
                                                    name="year"
                                                    onChange={onChange}
                                                    placeholder="연도"/> 
                                            </div>
                                            <div>
                                                <label for="month"></label>
                                                <input 
                                                    type="number" 
                                                    id="month" 
                                                    min="1" 
                                                    max="12" 
                                                    className="input-basic" 
                                                    name="month"
                                                    onChange={onChange}
                                                    placeholder="월"/>
                                            </div>
                                            <div>
                                                <label for="date"></label>
                                                <input 
                                                    type="number" 
                                                    id="date" 
                                                    min="1" 
                                                    max="31" 
                                                    className="input-basic"
                                                    name="date"
                                                    onChange={onChange}
                                                    placeholder="일"/>
                                            </div>
                                        </form>
                                        <div className="btn-wrap">
                                            {(year && month && date) ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            );
                        }
                        else if (Proceeding === 5) {
                            return(
                                <>
                                    <div className="logo-wrap">
                                        <h2>주소 등록하기</h2>
                                    </div>
                                    <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                        정보는 나중에 얼마든지 수정할 수 있어요</p>
                                    <div className="form-box">
                                        <p>주소</p>
                                        <form className="ico-serch">
                                            { !search ? (
                                                <>
                                                    <label for="address"></label>
                                                    <input 
                                                        type="text" 
                                                        className="input-basic" 
                                                        id="address" 
                                                        value={address}
                                                        placeholder="우편번호를 입력하세요"/>
                                                    <button onClick={togglesearch}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-search.svg'} alt="검색"/></button>
                                                </>
                                            ) : (
                                                <DaumPostcode 
                                                    onComplete={handleComplete}/>
                                            )}
                                            <div className="message">우편번호를 입력해주세요</div>
                                        </form>
                                        <form>
                                            <label for="detail-address"></label>
                                            <input 
                                                type="text" 
                                                class="input-basic" 
                                                id="detail-address" 
                                                name="detail-address"
                                                onChange={onChange}
                                                placeholder="상세주소를 입력하세요"/>
                                            <button type="submit"></button>
                                            <div className="message">상세주소를 입력해주세요</div>
                                        </form>
                                        <form className="btn-wrap">
                                            {(address && subaddress) ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </form>
                                    </div>
                                </>
                            );
                        }
                        else if (Proceeding === 6) {
                            return(
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
                                                    <input type="checkbox" id="survice-check" checked/>
                                                    <label for="survice-check">서비스 이용 약관 운영 및 동의<span class="required">(필수)</span></label>
                                                </li>
                                                <li className="check-circle">
                                                    <input type="checkbox" id="info-check" checked/>
                                                    <label for="info-check">개인정보 수집 및 이용 동의<span class="required">(필수)</span></label>
                                                </li>
                                                <li className="check-circle">
                                                    <input type="checkbox" id="ad-check" checked/>
                                                    <label for="ad-check">마케팅 정보SMS, 이메일 수신 동의<span>(선택)</span></label>
                                                </li>
                                                <li className="check-circle all">
                                                    <input type="checkbox" id="all" checked/>
                                                    <label for="all">모두 동의하고 계속할래요</label>
                                                    <div className="message">{error}</div>
                                                </li>
                                            </ul>
                                        </form>
                                        <form className="btn-wrap">
                                            {(address && subaddress) ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
                                            ) : (
                                                <button className="btn-basic next">다음</button>
                                            )}
                                        </form>
                                    </div>
                                </>
                            );
                        }
                        else if(Proceeding === 7) {
                            return(
                                <>
                                    <div className="logo-wrap">
                                        <h2>Brity에 오신 것을<br/>환영합니다 :)</h2>
                                    </div>
                                    <p>다음 정보로 회원가입이 완료되었습니다 🤩</p>
                                    <div className="text-box">
                                        <p>e-mail</p>
                                        <p>{userid}</p>
                                        <p>link / ID</p>
                                        <p>link.milleniz.com/{userid}</p>
                                    </div>
                                    <form className="btn-wrap">
                                        <button className="btn-purple enable" onClick={onSubmit}>다음</button>
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

export default SignUp;