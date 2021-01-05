import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [onDelete, setonDelete] = useState(false);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    };
    const accountDelete = () => {
        const user = authService.currentUser;
        user.delete().then(function() {
            history.push("/");
            refreshUser();
        }).catch(function(error) {
            console.log(error);
        });
    }
    const gethome = () => history.push("/");
    const toggleonDelete = () => setonDelete((prev) => !prev);
    return (
        <div id="wrap" className={"ad-card account-menu" + (!onDelete ? ("") : ("-delete"))+" account"}>
            <header className="header">
                <div className="menu-wrap">
                    <button className="back" onClick={toggleonDelete}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>{!onDelete ? ("🛠 내 계정 관리") : ("계정삭제") }</p>
                    <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                </div>
            </header>
            <div className="content">
                { !onDelete ? (
                    <>
                        <div className="form-box border-bottom">
                            <form className="hover-style"><button>SNS 계정 정보<img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="바로가기"/></button></form>
                            <form className="hover-style"><button>개인 정보<img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="바로가기"/></button></form>
                        </div>
                        <div className="form-box">
                            <form className="hover-style"><Popup
                                trigger={<button>로그아웃</button>}
                                modal>
                                {close => (<div className="bg-opacity alert on">
                                    <div className="alert-wrap">
                                        <div className="alert-box">
                                            <div className="text-box">
                                                <p className="p-header">😨 로그아웃 하실 건가요?</p>
                                                <p className="p-text">정말로 로그아웃 하시는 거라면<br/>
                                                    아쉽지만, 다음에 또 만나요 🙋‍♀️</p>
                                            </div>
                                            <div className="btn-box">
                                                <button onClick={close}>취소</button>
                                                <button onClick={onLogOutClick}>로그아웃</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </Popup></form>
                            <form className="hover-style"><button onClick={toggleonDelete}>계정삭제</button></form>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>
                            <span className="user-name">{userObj.email}</span>님의 계정을 삭제합니다<br/>
                            계정삭제 전, 아래 내용을 꼭 확인해주세요
                        </h2>
                        <ul className="text-box">
                            <li>📢 계정삭제 안내사항</li>
                            <li>👉 브리티계정 삭제 시 해당 계정으로 이용하던 서비스의 이용계약이 해지되어 더는 이용할 수 없습니다.</li>
                            <li>👉 브리티계정 정보 및 이용하였던 개별 서비스 데이터가 삭제됩니다.</li>
                            <li>👉 탈퇴한 회원의 정보와 서비스 이용기록은 복구할 수 없으며 일괄 삭제 처리됩니다.</li>
                        </ul>
                        <form className="check-circle">
                            <input type="checkbox" id="ddd"/>
                            <label for="ddd">위 내용을 모두 확인 했습니다, 이에 동의하며 계정삭제를 진행하겠습니다.</label>
                        </form>
                        <button className="btn-basic enable" onClick={accountDelete}>삭제하기</button>
                    </>
                )}
                
            </div>
            <footer className="footer"></footer>
        </div>
    );
}

export default Profile;