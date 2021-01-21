import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import {v4 as uuidv4} from"uuid";

const Editnotice = ({userObj, match}) => {
    const history = useHistory();
    const id = match.params.id;
    const [title, settitle] = useState("");
    const [sub, setsub] = useState("");
    const [text, settext] = useState("");
    const [Processing, setProcessing] = useState(0);
    const [Color, setColor] = useState("");
    const [select, setselect] = useState(true);
    const [size, setsize] = useState(true);
    const [fix, setfix] = useState(false);
    const [linkopen, setlinkopen] = useState(true);
    const [attachment, setAttachment] = useState("");
    const [attachment2, setAttachment2] = useState("");
    const [focustitle, setfocustitle] = useState(false);
    const [focussub, setfocussub] = useState(false);
    const [focustext, setfocustext] = useState(false);
    const [btnover, setbtnover] = useState(false);
    const handleScroll = () => {
        const {pageYOffset} = window;
        setfix(pageYOffset > 0);
    };
    useEffect(async() => {
        await dbService.collection('nweets').doc(id)
        .onSnapshot(doc => {
            settitle(doc.data().title);
            setsub(doc.data().subtitle);
            settext(doc.data().text);
            if(doc.data().cardcolor){
                setColor(doc.data().cardcolor);
                setselect(true);
            }
            else {
                setAttachment(doc.data().cardImage);
                setselect(false);
            }
            setAttachment2(doc.data().attachment);
        });
        window.addEventListener('scroll', handleScroll);
    }, []);
    const gradientcolor = ["linear-gradient(136deg, #d4b2da 1%, #9cd6e0)", 
                            "linear-gradient(136deg, #86c9ae 1%, #704ddf)",
                            "linear-gradient(136deg, #4590e1 1%, #de72b2)",
                            "linear-gradient(135deg, #fa7696, #fed946 100%)",
                            "linear-gradient(136deg, #c71d6f 1%, #d09693 100%)",
                            "linear-gradient(136deg, #134e5e 1%, #71b280)",
                            "linear-gradient(135deg, #16222a, #3a6073 100%)",
                            "linear-gradient(135deg, #3a6186, #89253e 100%)",
                            "linear-gradient(136deg, #8e2de2 1%, #4a00e0)",
                            "linear-gradient(136deg, #4767af 1%, #1a2b4c)",
                            "linear-gradient(136deg, #545454 1%, #111112 96%)"];
    const flatcolor = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#ce4257", "#720026", "#4f000b", "#540d6e", " #132572", "#1d1e20"];
    const pastelcolor = ["#e3b5b7", "#ddb5cb", "#c8bbdb", "#b5cbdc", "#b7d0cb", "#e4d8b9", "#e1c6b3", "#cebdb3", "#988585", " #644d56", "#353240"];
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "title"){
            settitle(value);
        } else if(name === "sub"){
            setsub(value);
        } else if(name === "card-index"){
            settext(value);
        }
    }
    const onFocus = (event) => {
        const {target: {name}} = event;
        if(name === "title"){
            setfocustitle((prev) => !prev);
        } else if(name === "sub"){
            setfocussub((prev) => !prev);
        } else if(name === "card-index"){
            setfocustext((prev) => !prev);
        }
    }
    const onClickColor = (event, colorname) => {
        setColor(colorname);
    }
    const onSubmit = async (event) => {
        if (title === "" || sub === "" || text === "") {
            return;
        }
        event.preventDefault();
        let cardObj = ""
        
        if(select === true){
            cardObj = {
                title: title,
                subtitle: sub,
                text: text,
                cardcolor: Color,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            }
        } else {
            let attachmentUrl = "";
            if(attachment !== ""){
                const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                const response = await attachmentRef.putString(attachment, "data_url");
                attachmentUrl = await response.ref.getDownloadURL();
            }
            console.log(attachmentUrl);
            cardObj = {
                title: title,
                subtitle: sub,
                text: text,
                cardImage: attachmentUrl,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            }
        }
        await dbService.collection('nweets').doc(id).update(cardObj);
        settitle("");
        setsub("");
        history.push("/");
    };
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
    };
    const onClearAttachment = () => setAttachment("");
    const toggleProcessing0 = () => setProcessing(0);
    const toggleProcessing1 = () => setProcessing(1);
    const toggleProcessing2 = () => setProcessing(2);
    const gethome = () => history.push("/");
    const toggleselect = () => setselect((prev) => !prev);
    const togglesize = () => setsize((prev) => !prev);
    const togglelinkopen = () => setlinkopen((prev) => !prev);
    const btnstyle1 = (over) => ({
        borderRight: over ? "1px solid #fff" : "1px solid #ebebeb",
        borderTop: over ? "1px solid #fff" : "1px solid #ebebeb",
    });
    const btnstyle2 = (over) => ({
        borderTop: over ? "1px solid #fff" : "1px solid #ebebeb",
    });
    return(
        <div id="wrap" className={"ad-card" + (Processing>0 ? (Processing === 1 ? (" ad-card-size") : (" ad-card-cover")) : (" retouch ad-card-notice"))}>
            <header className={"header" + (fix ? " fix" : "")}>
                <div className="menu-wrap">
                    <button className="back" onClick={toggleProcessing0}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>{(Processing>0 ? (Processing === 1 ? ("카드 크기 선택") : ("카드 커버 선택")) : ("🔧 카드 수정하기"))}</p>
                    <Popup
                        trigger={<button className="close"><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>}
                        modal>
                        {close => (
                            <div className="bg-opacity alert on">
                                <div className="alert-wrap">
                                    <div className="alert-box">
                                        <div className="text-box">
                                            <p className="p-header">🖐 잠깐만요</p>
                                            <p className="p-text">입력한 정보가<br/>
                                                아직 저장되지 않았어요!</p>
                                        </div>
                                        <div className="btn-box">
                                            <button onClick={() => {
                                                close();
                                                gethome();
                                            }} onMouseEnter={() => setbtnover(true)} onMouseOut={() => setbtnover(false)} style={btnstyle1(btnover)}>모두 취소하기</button>
                                            <button onClick={close} onMouseEnter={() => setbtnover(true)} onMouseOut={() => setbtnover(false)} style={btnstyle2(btnover)}>계속 입력하기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </header>
            <div className="content">
                { (() => {
                    if (Processing === 0){
                        return(
                            <>
                                <div className="exempli border-bottom">
                                    <h2>수정 예시</h2>
                                    {(Color || attachment) ? (
                                        select ? (
                                            <div className="card" style={{
                                                background: Color}}>
                                                <h3>{sub}</h3>
                                                <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrows.svg"} alt="이동 화살표"/></button>
                                                <p>{title}</p>
                                            </div> 
                                        ) : (
                                            <div className="card" style={{
                                                background: `url(${attachment})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center center",}}>
                                                <h3>{sub}</h3>
                                                <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrows.svg"} alt="이동 화살표"/></button>
                                                <p>{title}</p>
                                            </div> 
                                        )
                                    ) : (
                                        <div className="card">
                                            <h3>{sub}</h3>
                                            <p>{title}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="form-box border-bottom">
                                    <form className={focustitle ? "selected" : ""}>
                                        <label for="card-name">A. 카드 메인 타이틀<span className="required">*</span><span>(하단 부분)</span></label>
                                        <input 
                                            type="text" 
                                            id="card-name" 
                                            className="input-basic" 
                                            name="title"
                                            value={title}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="카드에 보여질 이름을 적어주세요  ex. 카카오톡 문의"/>
                                        <div className="message">카드 이름을 적어주세요</div>
                                    </form>
                                    <form className={focussub ? "selected" : ""}>
                                        <label for="sub-card-name">B. 카드 서브 타이틀<span>(상단 부분)</span></label>
                                        <input 
                                            type="text" 
                                            id="sub-card-name" 
                                            className="input-basic" 
                                            name="sub"
                                            value={sub}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="서브 타이틀 내용을 적어주세요  ex. B. 🤙🏻🤙🏽🤙🏿"/>
                                        <div className="message">서브 타이틀 입력, 최대 16자</div>
                                    </form>
                                    <form className={focustext ? "selected" : ""}>
                                        <label for="card-index">C. 어떤 내용을 공지할까요?<span class="required">*</span></label>
                                        <textarea
                                            name="card-index"
                                            id="card-index"
                                            cols="30"
                                            rows="10"
                                            className="input-basic"
                                            value={text}
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onFocus}
                                            placeholder="공지할 내용을 입력해주세요"></textarea>
                                    </form>
                                    <form>
                                        <label for="card-img" className={"ad-img-box" + (attachment2 ? " on" : "")}>
                                            <p>첨부할 이미지가 있나요?</p>
                                            {attachment2 ? (
                                                <>
                                                    <div style={{
                                                        background: `url(${attachment2})`,
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
                                            id={"card-img" + (attachment2 ? " on" : "")} 
                                            className="input-basic"
                                            onChange={onFileChange}/>
                                        <div className={"img-del-btn" + (attachment2 ? " on" : "")}>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setAttachment2("");
                                            }}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-trash.svg"} alt="삭제"/>삭제</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="toggle-box hover-style">
                                    <div className={linkopen ? "toggle-on" : ""}>
                                        <p>링크 공개 여부<span>{linkopen ? "ON" : "OFF"}</span></p>
                                        <button className="btn-toggle" onClick={togglelinkopen}><span></span></button>
                                    </div>
                                </div>
                                <div className="card-size-box hover-style">
                                    <button className="select" onClick={toggleProcessing1}>
                                        <p>카드 크기 선택<span>LARGE</span></p>
                                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="선택"/>
                                    </button>
                                    <button onClick={toggleProcessing2}>
                                        <p>카드 커버 선택<span>미선택</span></p>
                                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="선택"/>
                                    </button>
                                </div>
                                { (title && sub && text) ? (
                                    <button className="btn-purple-filled enable" onClick={onSubmit}>카드 수정 완료</button>
                                ) : (
                                    <button className="btn-purple-filled">카드 수정 완료</button>
                                )}
                            </>
                        );
                    } else if( Processing === 1){
                        return(
                            <>
                                <h2>원하는 카드 크기를 선택해주세요</h2>
                                <div className="form-box border-bottom">
                                    <form className="check-circle">
                                        <input type="checkbox" name="checkbox" id="size-s" checked={!size && "checked"} onClick={togglesize}/>
                                        <label for="size-s">S</label>
                                    </form>
                                    <form className="check-circle">
                                        <input checked type="checkbox" name="checkbox" id="size-l" checked={size && "checked"} onClick={togglesize}/>
                                        <label for="size-l">L</label>
                                    </form>
                                    {!size && <p className="size-s-error" style={{display:"block"}}>📢 지금은 ‘L’ 사이즈 카드만 지원하고 있어요<br/>
                                        이른 시일 안에 선택 할 수 있도록 노력하겠습니다 🙇‍♂️</p>}
                                </div>
                                <div className="card-box">
                                    <p>카드 크기 예시</p>
                                    <div className={"card-wrap" + (size ? "" : " flex-column")}>
                                        <div className="card">
                                            <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrows.svg"} alt="이동 화살표"/></button>
                                            <p>S</p>
                                        </div>
                                        <div className="card checked">
                                            <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-arrows.svg"} alt="이동 화살표"/></button>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                                {size ? (
                                    <button className="btn-purple-filled enable" onClick={toggleProcessing0}>카드 크기 적용하기</button>
                                ) : (
                                    <button className="btn-purple-filled">카드 크기 적용하기</button>
                                )}
                            </>
                        );
                    } else if (Processing === 2){
                        return(
                            <>
                                <h2>원하는 카드 색상을 선택해주세요</h2>
                                <div className="form-box border-bottom">
                                    <form className="check-circle">
                                        <input type="checkbox" name="checkbox" id="bd-check-color" checked={select && "checked"} onClick={toggleselect}/>
                                        <label for="bd-check-color">색상 선택하기</label>
                                    </form>
                                    <form className="check-circle">
                                        <input type="checkbox" name="checkbox" id="bd-check-img" checked={!select && "checked"}onClick={toggleselect}/>
                                        <label for="bd-check-img">이미지 올리기</label>
                                    </form>
                                </div>
                                { select ? (
                                    <div className="colorBox">
                                        <h3>색상 카드 중 선택해주세요</h3>
                                        <div className="color-box-wrap">
                                            <div className="gradients">
                                                <h4>Gradients</h4>
                                                <div className="color-chip-wrap">
                                                    {gradientcolor.map(key => {
                                                        if(key === Color){
                                                            return <div className="check" onClick={(e) => onClickColor(e, key)}></div>
                                                        } else {
                                                            return <div onClick={(e) => onClickColor(e, key)}></div>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flat-color">
                                                <h4>Flat colors</h4>
                                                <div className="color-chip-wrap">
                                                    {flatcolor.map(key => {
                                                        if(key === Color){
                                                            return <div className="check" onClick={(e) => onClickColor(e, key)}></div>
                                                        } else {
                                                            return <div onClick={(e) => onClickColor(e, key)}></div>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <div className="pastel-color">
                                                <h4>Pastel colors </h4>
                                                <div className="color-chip-wrap">
                                                    {pastelcolor.map(key => {
                                                        if(key === Color){
                                                            return <div className="check" onClick={(e) => onClickColor(e, key)}></div>
                                                        } else {
                                                            return <div onClick={(e) => onClickColor(e, key)}></div>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="imgBox">
                                        <div className="form-box">
                                            <form>
                                                <label for="card-img" className="ad-img-box">
                                                    <p>원하는 이미지를 올려주세요</p>
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
                                                    id={"card-img" + (attachment ? " on" : "")} 
                                                    className="input-basic" 
                                                    onChange={onFileChange}
                                                    checked/>
                                                <div className={"img-del-btn" + (attachment ? (" on") : (""))}>
                                                    <button onClick={onClearAttachment}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-trash.svg"} alt="이미지 삭제하기"/>삭제</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                <button className="btn-purple-filled enable" onClick={toggleProcessing0}>카드 커버 적용하기</button>
                            </>
                        );
                    } 
                })()}
                
            </div>
        </div>
    );
}

export default Editnotice;