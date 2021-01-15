import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Notice = ({match}) => {
    const history = useHistory();
    const number = match.params.number;
    const [title, settitle] = useState("");
    const [subtitle, setsubtitle] = useState("");
    const [text, settext] = useState("");
    const [year, setyear] = useState();
    const [month, setmonth] = useState();
    const [date, setdate] = useState();
    const [background, setbackground] = useState();
    const [atttachment, setAttachment] = useState();

    useEffect(async() => {
        await dbService.collection('nweets').doc(number)
        .onSnapshot(doc => {
            settitle(doc.data().title);
            setsubtitle(doc.data().subtitle);
            settext(doc.data().text);
            let timestamp = doc.data().createdAt;
            let date = new Date(timestamp);
            setyear(date.getFullYear());
            setmonth(date.getMonth());
            setdate(date.getDate());
            if(doc.data().cardcolor) setbackground(doc.data().cardcolor)
            else setbackground(doc.data().cardImage)
            setAttachment(doc.data().atttachment);
        });
    }, []);
    const gethome = () => history.goBack();
    return(
        <div id="wrap" className="admin-home user-home-notice">
            <header className="header">
                <div className="menu-wrap bg-img" style={{background: background}}>
                    <button onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left-fff.svg"} alt="이전으로"/></button>
                    <h3 className="sub-title">{subtitle}</h3>
                    <p className="written day">{year + "." + month + "." + date}</p>
                </div>
            </header>
            <div className="content">
                <div className="main-title"><p>{title}</p></div>
                <div className="user-name">test</div>
                <div className="text-area">
                    {text}
                </div>
                <button className="overflow-btn">더 보기</button>
                {atttachment && (
                    <div className="bg-opacity">
                        <div className="img-area" style={{backgroundImage:`url${atttachment}`}}></div>
                    </div>
                )}
                
                <p className="state">
                    <span>수정됨 .</span>
                    <span> 14시간 전</span>
                </p>
            </div>
            <footer className="footer"/>
        </div>
    );
}

export default Notice;