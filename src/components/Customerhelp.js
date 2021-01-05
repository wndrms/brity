import React from "react";
import { useHistory } from "react-router-dom";

const Customerhelp = () => {
    const history = useHistory();
    const gethome = () => history.push("/");
    return(
        <div id="wrap" className="customer-help join">
            <header id="header">
                <p>👨‍🔧 고객 도움</p>
                <button onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
            </header>
            <div id="content" className="content">
                <h2>도움이 필요하시거나, 문의 사항이 있으시다면<br/>
                    아래 주소로 문의메일을 남겨주세요 📧📬</h2>
                <a href="mailto:contact@milleniz.com">contact@milleniz.com</a>
                <p>응대 시간 냉로 최대한 빠른 도움 드리겠습니다🙇‍♂️</p>
            </div>
            <footer id="footer"></footer>
        </div>
    );
}

export default Customerhelp;