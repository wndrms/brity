import React from "react";
import { Link } from "react-router-dom";

const Findemail = () => {

    return(
        <>
            <div id="wrap" className="find-email join">
                <header id="header">
                    <Link to="/">
                        <button><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img></button>            
                    </Link>
                </header>
                <div id="content" className="content">
                    <h2>계정 찾기</h2>
                    <p>계정관련 문제가 있을 땐,<br/>
                        아래 주소로 문의메일을 남겨주세요 📧📬</p>
                    <a href="mailto:contact@milleniz.com">contact@milleniz.com</a>
                    <p>응대 시간 내로 최대한 빠른 도움 드리겠습니다🙇‍♂️</p>
                </div>
                
                <footer id="footer"></footer>
            </div>
        </>
    );
};

export default Findemail;