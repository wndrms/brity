import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Addcard = ({userObj}) => {
    const history = useHistory();
    const [name, setname] = useState("");
    const [sub, setsub] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "name"){
            setname(value);
        } else if(name === "sub"){
            setsub(value);
        }
    }
    const onSubmit = async (event) => {
        if (name === "" || sub === "") {
            return;
        }
        event.preventDefault();
        const cardObj = {
            text: name,
            subtext: sub,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        }
        await dbService.collection("nweets").add(cardObj);
        setname("");
        setsub("");
        history.push("/");
    };
    const gethome = () => history.push("/");
    return(
        <div id="wrap" className="ad-card">
            <header className="header">
                <div className="menu-wrap">
                    <button className="back" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>🔗 링크 카드 만들기</p>
                    <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                </div>
            </header>
            <div className="content">
                <div className="exempli border-bottom">
                    <h2>카드 예시</h2>
                    <div className="card">
                        <h3><span>🛍</span>  |  B. (서브 타이틀)</h3>
                        <p>카카오톡 문의  |  A. (카드 이름)</p>
                    </div>
                </div>
                <div className="form-box border-bottom">
                    <form>
                        <label for="card-name">A. 어떤 이름의 링크 카드를 만들어 볼까요?<span class="required">*</span></label>
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
                </div>
                <div className="toggle-box">
                    <div className="toggle-on">
                        <p>링크 공개 여부<span>ON</span></p>
                        <button className="btn-toggle"><span></span></button>
                    </div>
                </div>
                <div className="card-size-box">
                    <button className="select">
                        <p>카드 크기 선택<span>LARGE</span></p>
                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="선택"/>
                    </button>
                    <button>
                        <p>카드 커버 선택<span>미선택</span></p>
                        <img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-right.svg"} alt="선택"/>
                    </button>
                </div>
                { (name && sub) ? (
                    <button className="btn-purple-filled enable" onClick={onSubmit}>링크 만들기 완료</button>
                ) : (
                    <button className="btn-purple-filled">링크 만들기 완료</button>
                )}
            </div>
        </div>
    );
}

export default Addcard;