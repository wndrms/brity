import { dbService, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {v4 as uuidv4} from "uuid";

const Addnotice = (userObj) => {
    const history = useHistory();
    const [name, setname] = useState("");
    const [sub, setsub] = useState("");
    const [text, settext] = useState("");
    const [attachment, setAttachment] = useState("");
    const [fix, setfix] = useState(false);
    const [open, setopen] = useState(true);
    const [linkopen, setlinkopen] = useState(true);

    const ref = useRef(null);
    const handleScroll = () => {
        if(ref.current) {
            setfix(ref.current.getBoundingClientRect().top <= 0);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "name"){
            setname(value);
        } else if(name === "sub"){
            setsub(value);
        } else if(name === "text"){
            settext(value);
        }
    }
    const onFileChange = (event) => {
        const {target: {files}, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
        console.log(attachment);
    };
    const onClearAttachment = () => setAttachment("");
    const onSubmit = async (event) => {
        if (name === "" || sub === "" || text === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            const attachmentUrl = await response.ref.getDownloadURL();
        }
        const cardObj = {
            title: name,
            subtitle: sub,
            text: text,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        await dbService.collection("nweets").add(cardObj);
        setname("");
        setsub("");
        settext("");
        setAttachment("");
    };
    const gethome = () => history.push("/");
    const toggleopen = () => setopen((prev) => !prev);
    const togglelinkopen = () => setlinkopen((prev) => !prev);
    return(
        <div id="wrap" className="ad-card ad-card-notice">
            <header className={`header${fix ? ' fix' : ''}`} ref={ref}>
                <div className="menu-wrap">
                    <button className="back" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>📢 공지 카드 만들기</p>
                    <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                </div>
            </header>
            <div className="content">
                <div className="exempli border-bottom">
                    <h2>카드 예시</h2>
                    <div className="card">
                        <h3><span>🛍</span>  |  B. {sub? sub : "(서브 타이틀)"}</h3>
                        <p>카카오톡 문의  |  A. {name ? name : "(카드 이름)"}</p>
                    </div>
                </div>
                <div className="form-box border-bottom">
                    <form>
                        <label for="card-name">A. 어떤 이름의 공지 카드를 만들어 볼까요?<span className="required">*</span></label>
                        <input
                            type="text"
                            id="card-name"
                            className="input-basic"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="카드에 보여질 이름을 적어주세요  ex. 카카오톡 문의"/>
                        <div className="message">카드 이름을 적어주세요</div>
                    </form>
                    <form>
                        <label for="sub-card-name">B. 어떤 서브 타이틀을 적어 놓을까요?</label>
                        <input 
                            type="text" 
                            id="sub-card-name" 
                            className="input-basic" 
                            name="sub"
                            value={sub}
                            onChange={onChange}
                            placeholder="서브 타이틀 내용을 적어주세요  ex. 🛍"/>
                        <div className="message">정확한 링크 주소를 입력해주세요</div>
                    </form>
                    <form>
                        <label for="card-index">C. 어떤 내용을 공지할까요?<span class="required">*</span></label>
                        <textarea
                            name="card-index"
                            id="card-index"
                            cols="30"
                            rows="10"
                            className="input-basic"
                            name="text"
                            value={text}
                            onChange={onChange}
                            placeholder="공지할 내용을 입력해주세요"></textarea>
                        <div className="message">공지 내용을 입력해주세요</div>
                    </form>
                    <form>
                        <label for="card-img" className="ad-img-box">
                            <p>첨부할 이미지가 있나요?</p>
                            {attachment ? (
                                <>
                                    <div style={{
                                        background: `url(${attachment})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",}}>
                                        <p>📷</p>
                                        <p>이미지 올리기</p>
                                        <p>클릭 후 이미지 파일을 선택하거나,<br/>
                                            직접 끌어와서 업로드해주세요 </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p>📷</p>
                                        <p>이미지 올리기</p>
                                        <p>클릭 후 이미지 파일을 선택하거나,<br/>
                                            직접 끌어와서 업로드해주세요 </p>
                                    </div>
                                </>
                            )}
                        </label>
                        <input 
                            type="file" 
                            id="card-img" 
                            className="input-basic"
                            onChange={onFileChange}/>
                        <div className="img-del-btn">
                            <button onClick={onClearAttachment}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-trash.svg"} alt="삭제"/></button>
                        </div>
                    </form>
                </div>
                <div className="toggle-box">
                    <div className={open ? "toggle-on" : ""}>
                        <p>공지 공개 여부<span>{open ? "ON" : "OFF"}</span></p>
                        <button className="btn-toggle" onClick={toggleopen}><span></span></button>
                    </div>
                    <div>
                        <p>댓글 허용<span>OFF</span></p>
                        <button className="btn-toggle"><span></span></button>
                    </div>
                    <p>📢 지금은 댓글 기능을 지원하지 않고 있어요 😢</p>
                </div>
                <div className="toggle-box">
                    <div className={linkopen ? "toggle-on" : ""}>
                        <p>링크 공개 여부<span>{linkopen ? "ON" : "OFF"}</span></p>
                        <button className="btn-toggle" onClick={togglelinkopen}><span></span></button>
                    </div>
                </div>
                <div className="card-size-box hover-style">
                    <button className="select">
                        <p>카드 크기 선택<span>LARGE</span></p>
                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="선택"/>
                    </button>
                    <button>
                        <p>카드 커버 선택<span>미선택</span></p>
                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="선택"/>
                    </button>
                </div>
                <button className="btn-purple-filled" onClick={onSubmit}>공지 만들기 완료</button>
            </div>
        </div>
    );
}

export default Addnotice;
