import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

const AccountDelete = ({refreshUser}) => {
    const history = useHistory();
    const [Proceeding, setProceeding] = useState(false);
    const [btnover, setbtnover] = useState(false);
    const [check, setcheck] = useState(false);
    const [password, setpassword] = useState("");
    const [pwshow, setpwshow] = useState(false);
    const [focuspassword, setfocuspassword] = useState(false);
    const [error, seterror] = useState(false);
    const getback = () => history.push("/Profile");
    const gethome = () => history.push("/");
    const toggleProceeding = () => setProceeding((prev) => !prev);

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "password"){
            setpassword(value);
        }
    }
    const reauthenticate = async () => {
        const user = authService.currentUser;
        try{
            let cred = await firebaseInstance.auth.EmailAuthProvider.credential(
                user.email,
                password
            );
            let reauth = await user.reauthenticateWithCredential(
                cred
            );
            if(reauth.message === undefined){
                setpassword("");
                return true
            } else{
                seterror(true);
                return false
            }
        } catch (err){
            console.log(err);
        }
    }
    const accountDelete = () => {
        const user = authService.currentUser;
        user.delete().then(function() {
            history.push("/");
            refreshUser();
        }).catch(function(error) {
            console.log(error);
        });
    }
    const btnstyle1 = (over) => ({
        borderRight: over ? "1px solid #fff" : "1px solid #ebebeb",
        borderTop: over ? "1px solid #fff" : "1px solid #ebebeb",
    });
    const btnstyle2 = (over) => ({
        borderTop: over ? "1px solid #fff" : "1px solid #ebebeb",
    });
    return(
        <div id="wrap" className={"ad-card account-delete " + (!Proceeding ? "" : "account-delete02 ") + "account"}>
            <header className="header">
                <div className="menu-wrap">
                    <button className="back" onClick={getback}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>계정삭제</p>
                    <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                </div>
            </header>
            <div className="content">
                { !Proceeding ? (
                    <>
                        <h2>
                            <span className="user-name">{authService.currentUser.email}</span>님의 계정을 삭제합니다<br/>
                            계정삭제 전, 아래 내용을 꼭 확인해주세요
                        </h2>
                        <ul className="text-box">
                            <li>📢 계정삭제 안내사항</li>
                            <li>👉 브리티계정 삭제 시 해당 계정으로 이용하던 서비스의 이용계약이 해지되어 더는 이용할 수 없습니다.</li>
                            <li>👉 브리티계정 정보 및 이용하였던 개별 서비스 데이터가 삭제됩니다.</li>
                            <li>👉 탈퇴한 회원의 정보와 서비스 이용기록은 복구할 수 없으며 일괄 삭제 처리됩니다.</li>
                        </ul>
                        <form className="check-circle">
                            <input type="checkbox" id="ddd" onClick={() => setcheck((prev) => !prev)} checked={check && "checked"}/>
                            <label for="ddd">위 내용을 모두 확인 했습니다, 이에 동의하며 계정삭제를 진행하겠습니다.</label>
                        </form>
                        {check ? (
                            <button className="btn-basic enable" onClick={toggleProceeding}>삭제하기</button>
                        ) : (
                            <button className="btn-basic">삭제하기</button>
                        )}
                        
                    </>
                ) : (
                    <>
                        <h2>
                            정보를 안전하게 보호하기 위해<br/>
                            계정삭제 전, 본인임을 인증해 주세요
                        </h2>
                        <div className="form-box">
                            <form className={(focuspassword ? "selected" : "") + (pwshow ? " pw-veiw" : " pw-hide") + (error ? " error" : "")}>
                                <label for="login-pw">비밀번호</label>
                                <input 
                                    type={pwshow ? "text" : "password"}
                                    className="input-basic" 
                                    id="login-pw" 
                                    name="password"
                                    onChange={onChange}
                                    onFocus={() => setfocuspassword(false)}
                                    onBlur={() => setfocuspassword(true)}
                                    value={password}
                                    placeholder="비밀번호를 입력하세요"/>
                                <button onClick={() => setpwshow((prev) => !prev)}></button>
                                <div className="message">비밀번호가 일치하지 않아요</div>
                            </form>
                        </div>
                        {password ? (
                            <Popup
                            trigger={<button className="btn-basic enable">완료하기</button>}
                            modal>
                                { close => (
                                    <div className="bg-opacity alert on">
                                        <div className="alert-wrap">
                                            <div className="alert-box">
                                                <div className="text-box">
                                                    <p className="p-header">계정삭제.. 하실 건가요?</p>
                                                    <p className="p-text">아쉽지만, 다음에 더 발전된 모습으로 찾아뵙겠습니다🙇‍♀️ 꼭 다시 만나요!</p>
                                                </div>
                                                <div className="btn-box">
                                                    <button onClick={close} onMouseEnter={() => setbtnover(true)} onMouseOut={() => setbtnover(false)} style={btnstyle1(btnover)}>취소❤️</button>
                                                    <button onClick={accountDelete} onMouseEnter={() => setbtnover(true)} onMouseOut={() => setbtnover(false)} style={btnstyle2(btnover)}>계정삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        ) : (
                            <button className="btn-basic">완료하기</button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default AccountDelete;