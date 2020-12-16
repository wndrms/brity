import React, { useEffect, useState } from "react";

const CertForm = (toggleProceeding) => {
    const [counter, setcounter] = useState(180);
    const [error, seterror] = useState();
    useEffect( () => {
        const timer = (counter > 0) && setInterval(() => setcounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    return(
        <>
            <p>인증번호가 발송되었습니다 💌<br/>
                오지 않았다면, 입력하신 번호를 다시 확인해주세요</p>
            <div className="form-box">
                <div className="certification-number">
                    <form action="">
                        <label for="name">인증번호</label>
                        <input type="text" className="input-basic" placeholder=""/>
                        <button type="button"></button>
                        <div className="message">{error}</div>
                    </form>
                    <form action="">
                        <label for="name"></label>
                        <input type="submit" className="input-basic" value="인증하기"/>
                        <button type="button"></button>
                        <div className="message">입력시간 : {Math.ceil(counter/60)} : {counter%60}</div>
                    </form>
                </div>
                <div className="btn-wrap">
                    <button className="btn-basic next" onClick={toggleProceeding}>다음</button>
                </div>
            </div>
        </>
    );
};

export default CertForm;