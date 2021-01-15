import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const notice = ({number}) => {
    const history = useHistory();
    const [title, settitle] = useState("");
    const [subtitle, setsubtitle] = useState("");
    const [text, settext] = useState("");

    useEffect
    return(
        <div id="wrap" className="admin-home user-home-notice">
            <header className="header">
                <div className="menu-wrap bg-img">
                    <button onClick={() => history.push("/user")}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left-fff.svg"} alt="이전으로"/></button>
                    <h3 className="sub-title">{subtitle}</h3>
                    <p className="written day">2020.12.30</p>
                </div>
            </header>
            <div className="content">
                <div className="main-title"><p>{title}</p></div>
                <div className="user-name">test</div>
                <div className="text-area">
                    {text}
                </div>
                <button className="overflow-btn">더 보기</button>
                <div className="bg-opacity">
                    <div className="img-area"></div>
                </div>
                <p className="state">
                    <span>수정됨 .</span>
                    <span> 14시간 전</span>
                </p>
            </div>
            <footer className="footer"/>
        </div>
    );
}

export default notice;