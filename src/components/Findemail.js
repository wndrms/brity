import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";

function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
}
const Findemail = () => {
    const [Proceeding, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({ type: 'INCREMENT' });
    };

    const onDecrease = () => {
        dispatch({ type: 'DECREMENT' });
    };
    return(
        <>
            <div id="wrap">
                <header id="header">
                    <button onClick={onDecrease}><img src={process.env.PUBLIC_URL + '02-icon-01-outline-chevron-left.svg'} alt="이전"></img>"</button>
                </header>
                <div id="content" className="content">
                {
                    (() => {
                        if (Proceeding === 0) {
                            <>
                                <div className="logo-wrap">
                                    <h2>계정 찾기 🔎</h2>
                                </div>
                                <p>전화번호를 입력하여 계정을 찾을 수 있어요 🧐</p>
                                <div className="form-box">
                                    <form>
                                        <label for="ph-number">휴대폰 번호<span className="required">*</span></label>
                                        <input type="number" id="ph-number" className="input basic" placeholder="휴대전화 번호를 입력하세요"/>
                                        <button type="submit"></button>
                                        <div className="message">다음 버튼을 누르면 인증번호가 발송됩니다.</div>
                                    </form>

                                    <form className="btn-wrap">
                                        <button className="btn-basic next" onClick={onIncrease}>다음</button>
                                    </form>
                                </div>
                            </>
                        }
                        else if (Proceeding === 1) {
                            <>
                                <div className="logo-wrap">
                                    <h2>번호인증</h2>
                                </div>
                                <p>인증번호가 발송되었습니다 💌<br/>
                                    오지 않았다면, 입력하신 번호를 다시 확인해주세요</p>
                                <div className="form-box">
                                    <div>
                                        <form>
                                            <label for="sms-num">인증번호<span className="required">*</span></label>
                                            <input type="text" className="input-basic" id="sms=num" placeholder=""/>
                                            <button type="submit"></button>
                                            <div className="message">인증번호가 발송되었습니다</div>
                                        </form>
                                        <form>
                                            <button type="submit" className="btn-purple enable">인증하기</button>
                                            <div className="message">입력시간</div>
                                        </form>
                                    </div>
                                    <form className="btn-wrap">
                                        <button className="btn-basic next" onClick={onIncrease}>다음</button>
                                    </form>
                                </div>
                            </>
                        }
                        else if(Proceeding === 2){
                            <>
                                <div className="logo-wrap">
                                    <h2>계정을 찾았어요 :)</h2>
                                </div>
                                <p>입력하신 전화번호로 등록한 계정을 찾았어요<br/>
                                    이어서 비밀번호를 재설정 할 수 있습니다</p>
                                <div className="text-box">
                                    <div>
                                        <p>e-mail</p>
                                        <p>milleniz@milleniz.com</p>
                                    </div>
                                    <form className="btn-wrap">
                                        <button type="submit" className="btn-basic pw">비밀번호 재설정</button>
                                    </form>
                                </div>
                                <form className="btn-wrap">
                                    <Link to="/">
                                        <button className="btn-purple">로그인 하기</button>
                                    </Link>
                                </form>
                            </>
                        }
                    })
                }
                    
                </div>
                <footer id="footer"></footer>
            </div>
        </>
    );
};

export default Findemail;