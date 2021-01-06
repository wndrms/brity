import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { authService } from "fbase";

const SignUp = () => {
    const history = useHistory();
    const [Proceeding, setProceeding] = useState(0);
    const [name, setname] = useState("");
    const [phnum, setphnum] = useState();
    const [userid, setuserid] = useState("");
    const [password, setpassword] = useState("");
    const [year, setyear] = useState("");
    const [month, setmonth] = useState("");
    const [date, setdate] = useState("");
    const [search, setsearch] = useState(false);
    const [address, setaddress] = useState();
    const [subaddress, setsubaddress] = useState();
    const [error, seterror] = useState();
    const [focusname, setfocusname] = useState(false);
    const [focusph, setfocusph] = useState(false);
    const [focusid, setfocusid] = useState(false);
    const [focuspw, setfocuspw] = useState(false);
    const [focusyear, setfocusyear] = useState(false);
    const [focusmonth, setfocusmonth] = useState(false);
    const [focusdate, setfocusdate] = useState(false);
    const [focussubadd, setfocussubadd] = useState(false);
    const [pwshow, setpwshow] = useState(false);
    const [all, setall] = useState(false);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "name"){
            setname(value);
        } else if(name === "ph-number"){
            setphnum(value);
        } else if(name === "user-id"){
            setuserid(value);
        } else if(name === "pw"){
            setpassword(value);
        } else if(name === "year"){
            setyear(value);
        } else if(name === "month"){
            setmonth(value);
        } else if(name === "date"){
            setdate(value);
        } else if(name === "detail-address"){
            setsubaddress(value);
        }
    };
    const onDelete = (event) => {
        setname("");
        console.log(name);
    }
    const onFocus = (event) => {
        const {target: {name}} = event;
        if(name === "name"){
            setfocusname((prev) => !prev);
        } else if(name === "ph-number"){
            setfocusph((prev) => !prev);
        } else if(name === "user-id"){
            setfocusid((prev) => !prev);
        } else if(name === "pw"){
            setfocuspw((prev) => !prev);
        } else if(name === "year"){
            setfocusyear((prev) => !prev);
        } else if(name === "month"){
            setfocusmonth((prev) => !prev);
        } else if(name === "date"){
            setfocusdate((prev) => !prev);
        } else if(name === "detail-address"){
            setfocussubadd((prev) => !prev);
        }
    };
    const decresProceeding = () => setProceeding(Proceeding - 1);
    const incresProceeding = () => setProceeding(Proceeding + 1);
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
    const togglepwshow = (event) => {
        event.preventDefault();
        setpwshow((prev) => !prev);
    }
    const toggleall = () => setall((prev) => !prev);
    const gethome = () => history.push("/");
    return(
        <>
            <div id="wrap" className={"sign-up-0" + (Proceeding+1) + " sign-up"}>
                <header id="header">
                    { Proceeding > 0 ? ( Proceeding === 6 ? (
                        <button onClick={gethome}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-times.svg'} alt="닫기"></img></button>
                    ) : (
                        <button onClick={decresProceeding}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>
                    )
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
                                        <form className={(focusname ? "selected" : "") + (name ? " filled" : "")}>
                                            <label for="user-name">이름<span className="required">*</span></label>
                                            <input 
                                                type="text"
                                                className="input-basic" 
                                                id="user-name"
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                                onBlur={onFocus}
                                                onFocus={onFocus}
                                                placeholder="본인이름을 입력하세요"/>
                                            <button onClick={onDelete}></button>
                                            <div className="message">{error}</div>
                                        </form>
                                        <form className={(focusph ? "selected" : "") + (phnum ? " filled" : "")}>
                                            <label for="ph-number">휴대폰 번호<span className="required">*</span></label>
                                            <input 
                                                type="text" 
                                                pattern="[0-9]*"
                                                className="input-basic" 
                                                id="ph-number" 
                                                name="ph-number"
                                                value={phnum}
                                                onChange={onChange}
                                                onBlur={onFocus}
                                                onFocus={onFocus}
                                                placeholder="휴대폰 번호를 입력하세요"/>
                                            <button></button>
                                        </form>
                                        <div className="btn-wrap">
                                            {name && phnum ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>다음</button>
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
                                        <h2>아이디 만들기</h2>
                                    </div>
                                    <p>지금 설정하신 아이디로 링크가 생성됩니다.<br/>
                                        나중엔 변경 불가합니다 🔏</p>
                                    <div className="form-box">
                                        <form className={(focusid ? "selected" : "") + (userid ? " filled" : "")}>
                                            <label for="user-id">아이디(닉네임)<span className="required">*</span></label>
                                            <input 
                                                type="text" 
                                                className="input-basic" 
                                                id="user-id"
                                                name="user-id"
                                                value={userid}
                                                onChange={onChange}
                                                onBlur={onFocus}
                                                onFocus={onFocus}
                                                placeholder="아이디를 입력하세요"/>
                                            <button></button>
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
                        else if (Proceeding === 2){
                            return (
                                <>
                                    <div className="logo-wrap">
                                        <h2>비밀번호 만들기</h2>
                                    </div>
                                    <p>로그인에 필요한 비밀번호를 만드세요</p>
                                    <div className="form-box">
                                        <form className={(focuspw ? "selected" : "") + (pwshow ? " pw-veiw" : " pw-hide")}>
                                            <label for="pw">비밀번호<span className="required">*</span></label>
                                            <input 
                                                type="password" 
                                                className="input-basic" 
                                                name="pw"
                                                value={password}
                                                onChange={onChange}
                                                onBlur={onFocus}
                                                onFocus={onFocus}
                                                id="pw" 
                                                placeholder="비밀번호를 입력하세요"/>
                                            <button onClick={togglepwshow}></button>
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
                        else if (Proceeding === 3){
                            return (
                                <>
                                    <div className="logo-wrap">
                                        <h2>생일 등록하기</h2>
                                    </div>
                                    <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                        정보는 나중에 얼마든지 수정할 수 있어요</p>
                                    <div className="form-box">
                                        <p>생일</p>
                                        <div className="birth">
                                            <form className={(focusyear ? "selected" : "") + (year ? " filled" : "")}>
                                                <label for="year"></label>
                                                <input 
                                                    type="number" 
                                                    id="year" 
                                                    min="1900" 
                                                    max="2020" 
                                                    className="input-basic" 
                                                    name="year"
                                                    onChange={onChange}
                                                    onBlur={onFocus}
                                                    onFocus={onFocus}
                                                    placeholder="연도"/> 
                                            </form>
                                            <form className={(focusmonth ? "selected" : "") + (month ? " filled" : "")}>
                                                <label for="month"></label>
                                                <input 
                                                    type="number" 
                                                    id="month" 
                                                    min="1" 
                                                    max="12" 
                                                    className="input-basic" 
                                                    name="month"
                                                    onChange={onChange}
                                                    onBlur={onFocus}
                                                    onFocus={onFocus}
                                                    placeholder="월"/>
                                            </form>
                                            <form className={(focusdate ? "selected" : "") + (date ? " filled" : "")}>
                                                <label for="date"></label>
                                                <input 
                                                    type="number" 
                                                    id="date" 
                                                    min="1" 
                                                    max="31" 
                                                    className="input-basic"
                                                    name="date"
                                                    onChange={onChange}
                                                    onBlur={onFocus}
                                                    onFocus={onFocus}
                                                    placeholder="일"/>
                                            </form>
                                        </div>
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
                        else if (Proceeding === 4) {
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
                                        <form className={(focussubadd ? "selected" : "") + (subaddress ? " filled" : "")}>
                                            <label for="detail-address"></label>
                                            <input 
                                                type="text" 
                                                class="input-basic" 
                                                id="detail-address" 
                                                name="detail-address"
                                                value={subaddress}
                                                onChange={onChange}
                                                onBlur={onFocus}
                                                onFocus={onFocus}
                                                placeholder="상세주소를 입력하세요"/>
                                            <button></button>
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
                        else if (Proceeding === 5) {
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
                                                    {all ? (
                                                        <input type="checkbox" id="survice-check" checked/>
                                                    ) : (
                                                        <input type="checkbox" id="survice-check"/>
                                                    )}
                                                    <label for="survice-check">서비스 이용 약관 운영 및 동의<span class="required">(필수)</span></label>
                                                </li>
                                                <li className="check-circle">
                                                    {all ? (
                                                        <input type="checkbox" id="info-check" checked/>
                                                    ) : (
                                                        <input type="checkbox" id="info-check"/>
                                                    )}
                                                    <label for="info-check">개인정보 수집 및 이용 동의<span class="required">(필수)</span></label>
                                                </li>
                                                <li className="check-circle">
                                                    {all ? (
                                                        <input type="checkbox" id="ad-check" checked/>
                                                    ) : (
                                                        <input type="checkbox" id="ad-check"/>
                                                    )}
                                                    <label for="ad-check">마케팅 정보SMS, 이메일 수신 동의<span>(선택)</span></label>
                                                </li>
                                                <li className="check-circle all">
                                                    <input type="checkbox" id="all" onChange={toggleall}/>
                                                    <label for="all">모두 동의하고 계속할래요</label>
                                                    <div className="message">{error}</div>
                                                </li>
                                            </ul>
                                        </form>
                                        <form className="btn-wrap">
                                            {(address && subaddress) ? (
                                                <button className="btn-basic next enable" onClick={incresProceeding}>계속</button>
                                            ) : (
                                                <button className="btn-basic next">계속</button>
                                            )}
                                        </form>
                                    </div>
                                </>
                            );
                        }
                        else if(Proceeding === 6) {
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