import { firebaseInstance, authService, dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [page, setpage] = useState(0);
    const [fix, setfix] = useState(false);
    const [instagram, setinstagram] = useState("");
    const [facebook, setfacebook] = useState("");
    const [youtube, setyoutube] = useState("");
    const [tiktok, settiktok] = useState("");
    const [twitter, settwitter] = useState("");
    const [focusinstagram, setfocusinstagram] = useState(false);
    const [focusfacebook, setfocusfacebook] = useState(false);
    const [focusyoutube, setfocusyoutube] = useState(false);
    const [focustiktok, setfocustiktok] = useState(false);
    const [focustwitter, setfocustwitter] = useState(false);
    const [email, setemail] = useState(authService.currentUser.email);
    const [name, setname] = useState("");
    const [year, setyear] = useState("");
    const [month, setmonth] = useState("");
    const [date, setdate] = useState("");
    const [gender, setgender] = useState("");
    const [address, setaddress] = useState("");
    const [subadd, setsubadd] = useState("");
    const [pw, setpw] = useState("");
    const [newpw, setnewpw] = useState("");
    const [newpwre, setnewpwre] = useState("");
    const [search, setsearch] = useState(false);
    const [focusname, setfocusname] = useState(false);
    const [focusemail, setfocusemail] = useState(false);
    const [focuspw, setfocuspw] = useState(false);
    const [focusyear, setfocusyear] = useState(false);
    const [focusmonth, setfocusmonth] = useState(false);
    const [focusdate, setfocusdate] = useState(false);
    const [focussubadd, setfocussubadd] = useState(false);
    const [focusnewpw, setfocusnewpw] = useState(false);
    const [focusnewpwre, setfocusnewpwre] = useState(false);
    const [pwshow, setpwshow] = useState(false);
    const [newpwshow, setnewpwshow] = useState(false);
    const [newpwreshow, setnewpwreshow] = useState(false);
    const [error, seterror] = useState(false);
    const [btnover, setbtnover] = useState(false);
    const handleScroll = () => {
        const {pageYOffset} = window;
        setfix(pageYOffset > 0);
    };

    useEffect(() => {
        let userdata = dbService.collection("users").doc(authService.currentUser.email);
        let getdoc = userdata.get()
            .then(doc => {
                if(!doc.exists) {
                    dbService.collection("users").doc(authService.currentUser.email).set({
                        email: authService.currentUser.email,
                    });
                } else {
                    console.log("DATA : ", doc.data());
                    if(doc.data().email === undefined) setemail(authService.currentUser.email);
                    else setemail(doc.data().email);
                    if(doc.data().name === undefined) setname("");
                    else setname(doc.data().name);
                    if(doc.data().gender === undefined) setgender(2);
                    else setgender(doc.data().gender);
                    if(doc.data().address === undefined) setaddress("");
                    else setaddress(doc.data().address);
                    if(doc.data().subadd === undefined) setsubadd("");
                    else setsubadd(doc.data().subadd);
                    if(doc.data().birth === undefined){
                        setyear("");
                        setmonth("");
                        setdate("");
                    }
                    else {
                        setyear(Math.floor(Number(doc.data().birth) / 10000));
                        setmonth(Math.floor((Number(doc.data().birth) % 10000) / 100));
                        setdate(Math.floor(Number(doc.data().birth) % 100));
                    }
                    setinstagram(doc.data().instagram === undefined ? "" : doc.data().instagram);
                    setfacebook(doc.data().facebook === undefined ? "" : doc.data().facebook);
                    setyoutube(doc.data().youtube === undefined ? "" : doc.data().youtube);
                    settiktok(doc.data().tiktok === undefined ? "" : doc.data().tiktok);
                    settwitter(doc.data().twitter === undefined ? "" : doc.data().twitter);
                }
            }).catch(err => {
                console.log(err);
            });
        window.addEventListener('scroll', handleScroll);
    }, []);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "name"){
            setname(value);
        } else if(name === "user-email"){
            setemail(value);
        } else if(name === "year"){
            setyear(value);
        } else if(name === "month"){
            setmonth(value);
        } else if(name === "date"){
            setdate(value);
        } else if(name === "detail-address"){
            setsubadd(value);
        } else if(name === "pw"){
            setpw(value);
        } else if(name === "new-pw"){
            setnewpw(value);
        } else if(name === "new-pw-re"){
            setnewpwre(value);
        } else if(name === "instagram"){
            setinstagram(value);
        } else if(name === "facebook"){
            setfacebook(value);
        } else if(name === "youtube"){
            setyoutube(value);
        } else if(name === "tiktok"){
            settiktok(value);
        } else if(name === "twitter"){
            settwitter(value);
        }
    };
    const onFocus = (event) => {
        const {target: {name}} = event;
        if(name === "name"){
            setfocusname((prev) => !prev);
        } else if(name === "user-email"){
            setfocusemail((prev) => !prev);
        } else if(name === "year"){
            setfocusyear((prev) => !prev);
        } else if(name === "month"){
            setfocusmonth((prev) => !prev);
        } else if(name === "date"){
            setfocusdate((prev) => !prev);
        } else if(name === "detail-address"){
            setfocussubadd((prev) => !prev);
        } else if(name === "pw"){
            setfocuspw((prev) => !prev);
        } else if(name === "new-pw"){
            setfocusnewpw((prev) => !prev);
        } else if(name === "new-pw-re"){
            setfocusnewpwre((prev) => !prev);
        } else if(name === "instagram"){
            setfocusinstagram((prev) => !prev);
        } else if(name === "facebook"){
            setfocusfacebook((prev) => !prev);
        } else if(name === "youtube"){
            setfocusyoutube((prev) => !prev);
        } else if(name === "tiktok"){
            setfocustiktok((prev) => !prev);
        } else if(name === "twitter"){
            setfocustwitter((prev) => !prev);
        }
    };
    const onLogOutClick = (e) => {
        e.preventDefault();
        authService.signOut();
        history.push("/");
        refreshUser();
    };
    const gethome = () => history.push("/");
    const getdelete =() => history.push("/delete");
    const togglepage = (num) => {
        setpage(num);
        seterror(false);
    }
    const toggleclassName = () => {
        if(page === 0) return "ad-card account-menu account"
        else if(page === 1) return "ad-card account-sns account"
        else if(page > 1){
            let pagenum = "account-info0" + String(page-1) + " account account-info";
            return pagenum 
        }
    }
    const togglemenuName = () => {
        if(page === 0) return "🛠 내 계정 관리"
        else if(page === 1) return "SNS 계정 정보"
        else if(page >= 2) return "개인 정보" 
    }
    const selectgender = (event) => {
        const {target: {value}} = event;
        setgender(value);
        console.log(gender);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            name: name,
            birth: year*10000 + month*100 + date,
            gender: gender,
            address: address,
            subadd: subadd,
        }
        await dbService.collection('users').doc(authService.currentUser.email).update(data);
        setpage(2);
    };
    const onSubmit2 = async (event) => {
        const data = {
            instagram: instagram,
            facebook: facebook,
            youtube: youtube,
            tiktok: tiktok,
            twitter: twitter,
        }
        await dbService.collection('users').doc(authService.currentUser.email).update(data);
        setpage(0);
    };
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
    const reauthenticate = async () => {
        const user = authService.currentUser;
        try{
            let cred = await firebaseInstance.auth.EmailAuthProvider.credential(
                email,
                pw
            );
            let reauth = await user.reauthenticateWithCredential(
                cred
            );
            if(reauth.message === undefined){
                setpw("");
                return true
            } else{
                setpw("");
                return false
            }
        } catch (err){
            console.log(err);
        }
    }
    const updatepw = async () => {
        let password = newpw;
        authService.currentUser.updatePassword(password).then(function() {
            setnewpw("");
            setnewpwre("");
            togglepage(2);
        }).catch(function(err){
            console.log(err);
        });
    };
    const btnstyle1 = (over) => ({
        borderRight: over ? "1px solid #fff" : "1px solid #ebebeb",
        borderTop: over ? "1px solid #fff" : "1px solid #ebebeb",
    });
    const btnstyle2 = (over) => ({
        borderTop: over ? "1px solid #fff" : "1px solid #ebebeb",
    });
    return (
        <div id="wrap" className={toggleclassName()}>
            <header className={`header${fix ? ' fix' : ''}`}>
                <div className="menu-wrap">
                    <button className="back" onClick={() => togglepage(0)}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>{togglemenuName()}</p>
                    { page < 3 ? (
                        <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                    ) : (
                        <button className="btn-purple-light enable" onClick={onSubmit}>저장</button>
                    )}
                    
                </div>
            </header>
            <div className="content">
                { 
                    (() => {
                    if (page === 0){
                        return(
                            <>
                                <div className="form-box border-bottom">
                                    <form className="hover-style"><button onClick={() => togglepage(1)}>SNS 계정 정보<img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="바로가기"/></button></form>
                                    <form className="hover-style"><button onClick={() => togglepage(2)}>개인 정보<img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="바로가기"/></button></form>
                                </div>
                                <div className="form-box">
                                    <form className="hover-style">
                                        <Popup
                                        trigger={<button>로그아웃</button>}
                                        modal>
                                        {close => (<div className="bg-opacity alert on">
                                            <div className="alert-wrap">
                                                <div className="alert-box">
                                                    <div className="text-box">
                                                        <p className="p-header">😨 로그아웃 하실 건가요?</p>
                                                        <p className="p-text">정말로 로그아웃 하시는 거라면<br/>
                                                            아쉽지만, 다음에 또 만나요 🙋‍♀️</p>
                                                    </div>
                                                    <div className="btn-box">
                                                        <button onClick={close} onMouseEnter={() => setbtnover(true)} onMouseOut={() => setbtnover(false)} style={btnstyle1(btnover)}>취소</button>
                                                        <button onClick={onLogOutClick} onMouseEnter={() => setbtnover(true)} onMouseOut={() => setbtnover(false)} style={btnstyle2(btnover)}>로그아웃</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                    </Popup></form>
                                    <form className="hover-style"><button onClick={getdelete}>계정삭제</button></form>
                                </div>
                            </>
                        );
                    } else if(page === 1){
                        return(
                            <>
                                <div className="form-box">
                                    <form className={focusinstagram ? "selected" : ""}>
                                        <label for="insta-id">Instagram</label>
                                        <input 
                                            id="insta-id" 
                                            type="text" 
                                            name="instagram"
                                            value={instagram}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="아이디를 입력해주세요"/>
                                    </form>
                                    <form className={focusfacebook ? "selected" : ""}>
                                        <label for="facebook-id">Facebook</label>
                                        <input 
                                            id="facebook-id" 
                                            type="text"  
                                            name="facebook"
                                            value={facebook}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="아이디를 입력해주세요"/>
                                    </form>
                                    <form className={focusyoutube ? "selected" : ""}>
                                        <label for="youtube-id">YouTube</label>
                                        <input 
                                            id="youtube-id" 
                                            type="text"  
                                            name="youtube"
                                            value={youtube}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="채널 주소를 입력해주세요"/>
                                    </form>
                                    <form className={focustiktok ? "selected" : ""}>
                                        <label for="tiktok-id">TikTok</label>
                                        <input 
                                            id="tiktok-id" 
                                            type="text"  
                                            name="tiktok"
                                            value={tiktok}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="아이디를 입력해주세요"/>
                                    </form>
                                    <form className={focustwitter ? "selected" : ""}>
                                        <label for="twitter-id">Twitter</label>
                                        <input 
                                            id="twitter-id" 
                                            type="text"  
                                            name="twitter"
                                            value={twitter}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="아이디를 입력해주세요"/>
                                    </form>
                                </div>
                                <Popup
                                    trigger={<button className="btn-purple fix-bottom enable">🔒저장하기</button>}
                                    modal
                                    onClose={onSubmit2}>
                                        {close => (
                                            <div className="bg-opacity alert on">
                                                <div className="alert-wrap">
                                                    <div className="alert-box small">
                                                        <div className="text-box">
                                                            <p className="p-header">🔒 저장완료</p>
                                                            <p className="p-text">입력하신 정보가 저장 되었어요 👍</p>
                                                        </div>
                                                        <div className="btn-box">
                                                            <button onClick={close}>닫기</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </Popup>
                            </>
                        );
                    } else if(page === 2){
                        return(
                            <>
                                <div className="form-box border-bottom">
                                    <div className="hover-style">
                                        <button>
                                            <span>이름</span>
                                            <p className="user-name">{name}</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(3)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>생년월일</span>
                                            <p className="user-birth">{year + ". " + month + ". " + date}</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(4)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>성별</span>
                                            <p className="user-gender">{gender == 2 ? "선택안함" : (gender == 0 ? "남성" : "여성")}</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(5)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>주소</span>
                                            <p className="user-address">
                                                <span>{address}</span>
                                                <span>{subadd}</span>
                                            </p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(6)}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-box border-bottom">
                                    <div className="hover-style">
                                        <button>
                                            <span>이메일 주소</span>
                                            <p className="user-email">{email}</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(7)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>비밀번호</span>
                                            <p className="user-pw">••••••••</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(8)}/>
                                        </button>
                                    </div>
                                </div>
                                
                            </>
                        );
                    } else if(page === 3){
                        return(
                            <>
                                <h2>이름 수정하기</h2>
                                <p>🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <form className={(focusname ? "selected" : "") + (name ? " filled" : "") + (error ? " error" : "")}>
                                        <label for="user-name">이름</label>
                                        <input
                                            type="text"
                                            id="user-name"
                                            name="name"
                                            className="input-basic"
                                            placeholder="이름을 입력해주세요"
                                            value={name}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            onChange={onChange}/>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            name && setname("");
                                        }}></button>
                                        <div className="message">이름을 입력해주세요</div>
                                    </form>
                                </div>
                                {name ? (
                                    <button className="btn-purple fix-bottom enable" onClick={onSubmit}>🔒저장하기</button>
                                ) : (
                                    <button className="btn-purple fix-bottom" onClick={(e) => {
                                        e.preventDefault();
                                        seterror(true);
                                    }}>🔒저장하기</button>
                                )}
                                
                            </>
                        );
                    } else if(page === 4){
                        return(
                            <>
                                <h2>생일 수정하기</h2>
                                <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                    🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <p>생일</p>
                                    <div className="birth">
                                        <form className={focusyear ? "selected" : ""}>
                                            <label for="year"></label>
                                            <input
                                                type="number"
                                                id="year"
                                                name="year"
                                                min="1900"
                                                max="2020"
                                                onChange={onChange}
                                                onFocus={onFocus}
                                                onBlur={onFocus}
                                                className="input-basic"
                                                placeholder="연도"/>
                                        </form>
                                        <form className={focusmonth ? "selected" : ""}>
                                            <label for="month"></label>
                                            <input
                                                type="number"
                                                id="month"
                                                name="month"
                                                min="1"
                                                max="12"
                                                onChange={onChange}
                                                onFocus={onFocus}
                                                onBlur={onFocus}
                                                className="input-basic"
                                                placeholder="월"/>
                                        </form>
                                        <form className={focusdate ? "selected" : ""}>
                                            <label for="date"></label>
                                            <input
                                                type="number"
                                                id="date"
                                                name="date"
                                                min="1"
                                                max="31"
                                                onChange={onChange}
                                                onFocus={onFocus}
                                                onBlur={onFocus}
                                                className="input-basic"
                                                placeholder="일"/>
                                        </form>
                                    </div>
                                </div>
                                {year && month && date ? (
                                    <button className="btn-purple fix-bottom enable" onClick={onSubmit}>🔒저장하기</button>
                                ) : (
                                    <button className="btn-purple fix-bottom">🔒저장하기</button>
                                )}
                                
                            </>
                        );
                    } else if(page === 5){
                        return(
                            <>
                                <h2>성별 수정하기</h2>
                                <p>성별</p>
                                <div className="form-box hover-style">
                                    <form className="check-circle">
                                        <input type="checkbox" id="male" value="0" onClick={selectgender} checked={gender == 0 && "checked"}/>
                                        <label for="male">남자</label>
                                    </form>
                                    <form className="check-circle">
                                        <input type="checkbox" id="female" value="1" onClick={selectgender} checked={gender == 1 && "checked"}/>
                                        <label for="female">여자</label>
                                    </form>
                                    <form className="check-circle">
                                        <input type="checkbox" id="none" value="2" onClick={selectgender} checked={gender == 2 && "checked"}/>
                                        <label for="none">선택안함</label>
                                    </form>
                                </div>
                                <button className="btn-purple fix-bottom enable" onClick={onSubmit}>🔒저장하기</button>
                            </>
                        );
                    } else if(page === 6){
                        return(
                            <>
                                <h2>주소 수정하기</h2>
                                <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                    🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <form className="search-address">
                                        { !search ? (
                                            <>
                                                <label for="address">주소</label>
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
                                    <form className={(focussubadd ? "selected" : "") + (subadd ? " filled" : "")}>
                                        <label for="detail-address"></label>
                                        <input
                                            type="text"
                                            className="input-basic"
                                            id="detail-address"
                                            name="detail-address"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="상세주소를 입력하세요" />
                                        <button onClick={() => {
                                            subadd && setsubadd("");
                                        }}></button>
                                        <div className="message">상세 주소를 입력해주세요</div>
                                    </form>
                                </div>
                                { address && subadd ? (
                                    <button className="btn-purple fix-bottom enable" onClick={onSubmit}>🔒저장하기</button>
                                ) : (
                                    <button className="btn-purple fix-bottom">🔒저장하기</button>
                                )}
                            </>
                        );
                    } else if(page === 7){
                        return(
                            <>
                                <h2>이메일 수정하기</h2>
                                <p>🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <form className={(focusemail ? "selected" : "") + (email ? " filled" : "")}>
                                        <label for="user-email">이메일</label>
                                        <input
                                            type="email"
                                            className="input-basic"
                                            id="user-email"
                                            name="user-email"
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            onChange={onChange}
                                            value={email} />
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            email && setemail("");
                                        }}></button>
                                        <div className="message">이메일 형식이 올바르지 않아요</div>
                                    </form>
                                </div>
                                { email ? (
                                    <button className="btn-purple fix-bottom enable" onClick={onSubmit}>🔒저장하기</button>
                                ) : (
                                    <button className="btn-purple fix-bottom">🔒저장하기</button>
                                )}
                                
                            </>
                        );
                    } else if(page === 8){
                        return(
                            <>
                                <h2>비밀번호 수정하기</h2>
                                <p>정보를 안전하게 보호하기 위해<br/>
                                    본인임을 인증해 주세요</p>
                                <div className="form-box">
                                    <form className={(focuspw ? "selected" : "") + (pwshow ? " pw-veiw" : " pw-hide") + (error ? " error" : "")}>
                                        <label for="user-pw">비밀번호</label>
                                        <input
                                            type={pwshow ? "text" : "password"}
                                            className="input-basic"
                                            id="user-email"
                                            name="pw"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="" />
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setpwshow((prev) => !prev);
                                        }}></button>
                                        <div className="message">비밀번호가 일치하지 않아요</div>
                                    </form>
                                </div>
                                {pw.length>0 ? (
                                    <button className="btn-basic next enable" onClick={async () => {(await reauthenticate() ? togglepage(9) : seterror(true))}}>계속</button>
                                ) : (
                                    <button className="btn-basic next">계속</button>
                                )}
                                
                            </>
                        );
                    } else if(page === 9){
                        return(
                            <>
                                <h2>비밀번호 수정하기</h2>
                                <p>새로운 비밀번호로 변경하겠습니다 🤓<br/>
                                    앞으로 로그인할 때 변경한 비밀번호를 입력해 주세요</p>
                                <div className="form-box">
                                    <form className={(focusnewpw ? "selected" : "") + (newpwshow ? " pw-veiw" : " pw-hide")}>
                                        <label for="new-user-pw">새 비밀번호<span className="required">*</span></label>
                                        <input
                                            type={newpwshow ? "text" : "password"}
                                            className="input-basic"
                                            id="new-user-pw"
                                            name="new-pw"
                                            value={newpw}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="새롭게 설정할 비밀번호를 입력하세요" />
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            setnewpwshow((prev) => !prev);
                                        }}></button>
                                        <div className="message">8자 이상, 소문자 숫자가 포함되어야 합니다</div>
                                    </form>
                                </div>
                                <div className="form-box">
                                    <form className={(focusnewpwre ? "selected" : "") + (newpwreshow ? " pw-veiw" : " pw-hide") + (newpw !== newpwre ? " error" : "")}>
                                        <label for="new-user-pw-re">새 비밀번호 확인<span class="required">*</span></label>
                                        <input
                                            type={newpwreshow ? "text" : "password"}
                                            className="input-basic"
                                            id="new-user-pw-re"
                                            name="new-pw-re"
                                            value={newpwre}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="새 비밀번호를 확인해주세요" />
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            setnewpwreshow((prev) => !prev);
                                        }}></button>
                                        <div className="message">비밀번호가 일치하지 않아요</div>
                                    </form>
                                </div>
                                { (newpw === newpwre) && newpw ? (
                                    <button className="btn-purple fix-bottom enable" onClick={updatepw}>🔒저장하기</button>
                                ) : (
                                    <button className="btn-purple fix-bottom">🔒저장하기</button>
                                )}
                                
                            </>
                        );
                    }
                })()
            }     
            </div>
            <footer className="footer"></footer>
        </div>
    );
}

export default Profile;