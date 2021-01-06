import { dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const Addcard = ({userObj}) => {
    const history = useHistory();
    const [name, setname] = useState("");
    const [sub, setsub] = useState("");
    const [Processing, setProcessing] = useState(0);
    const [Color, setColor] = useState("");
    const [select, setselect] = useState(true);
    const [size, setsize] = useState(true);
    const [fix, setfix] = useState(false);
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
        if(name === "name"){
            setname(value);
        } else if(name === "sub"){
            setsub(value);
        }
    }
    const onClickColor = (event, colorname) => {
        setColor(colorname);
    }
    const onSubmit = async (event) => {
        if (name === "" || sub === "") {
            return;
        }
        event.preventDefault();
        const cardObj = {
            title: name,
            subtitle: sub,
            cardcolor: Color,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        }
        await dbService.collection("nweets").add(cardObj);
        setname("");
        setsub("");
        history.push("/");
    };
    const toggleProcessing0 = () => setProcessing(0);
    const toggleProcessing1 = () => setProcessing(1);
    const toggleProcessing2 = () => setProcessing(2);
    const gethome = () => history.push("/");
    const toggleselect = () => setselect((prev) => !prev);
    const togglesize = () => setsize((prev) => !prev);
    const togglelinkopen = () => setlinkopen((prev) => !prev);
    return(
        <div id="wrap" className={"ad-card" + (Processing>0 ? (Processing === 1 ? (" ad-card-size") : (" ad-card-cover")) : (""))}>
            <header className={`header${fix ? ' fix' : ''}`} ref={ref}>
                <div className="menu-wrap">
                    <button className="back" onClick={toggleProcessing0}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>{(Processing>0 ? (Processing === 1 ? ("카드 크기 선택") : ("카드 커버 선택")) : ("🔗 링크 카드 만들기"))}</p>
                    <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                </div>
            </header>
            <div className="content">
                { (() => {
                    if (Processing === 0){
                        return(
                            <>
                                <div className="exempli border-bottom">
                                    <h2>카드 예시</h2>
                                    <div className="card">
                                        <h3><span>🛍</span>  |  B. {sub? sub : "(서브 타이틀)"}</h3>
                                        <p>카카오톡 문의  |  A. {name ? name : "(카드 이름)"}</p>
                                    </div>
                                </div>
                                <div className="form-box border-bottom">
                                    <form>
                                        <label for="card-name">A. 어떤 이름의 링크 카드를 만들어 볼까요?<span className="required">*</span></label>
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
                                        <div className="message">서브 타이틀 입력, 최대 16자</div>
                                    </form>
                                    <form>
                                        <label for="card-index">C. 연결 할 링크 주소를 적어주세요<span class="required">*</span></label>
                                        <input
                                            type="text"
                                            id="card-index"
                                            className="input-basic"
                                            placeholder="연결 할 링크 주소 전체를 입력해주세요"/>
                                        <div className="message">정확한 링크 주소를 입력해주세요</div>
                                    </form>
                                </div>
                                <div className="toggle-box">
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
                                { (name && sub) ? (
                                    <button className="btn-purple-filled enable" onClick={onSubmit}>링크 만들기 완료</button>
                                ) : (
                                    <button className="btn-purple-filled">링크 만들기 완료</button>
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
                                    <p className="size-s-error">📢 지금은 ‘L’ 사이즈 카드만 지원하고 있어요<br/>
                                        이른 시일 안에 선택 할 수 있도록 노력하겠습니다 🙇‍♂️</p>
                                </div>
                                <div className="card-box">
                                    <p>카드 크기 예시</p>
                                    <div className="card-wrap">
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
                                <button className="btn-purple-filled enable" onClick={toggleProcessing0}>카드 크기 적용하기</button>
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
                                                    <div>
                                                        <p>📷</p>
                                                        <p>이미지 올리기</p>
                                                        <p>클릭 후 이미지 파일을 선택하거나,<br/>
                                                        직접 끌어와서 업로드해주세요 </p>
                                                    </div>
                                                </label>
                                                <input type="file" id="card-img" className="input-basic"/>
                                                <div className="img-del-btn">
                                                    <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-trash.svg"} alt="이미지 삭제하기"></img></button>
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

export default Addcard;