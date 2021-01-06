import { authService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [page, setpage] = useState(0);
    const [fix, setfix] = useState(false);
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
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    };
    const gethome = () => history.push("/");
    const getdelete =() => history.push("/delete");
    const togglepage0 = () => setpage(0);
    const togglepage1 = () => setpage(1);
    const togglepage2 = () => setpage(2);
    const toggleclassName = () => {
        if(page === 0) return "ad-card account-menu account"
        else if(page === 1) return "account-info01 account"
        else if(page === 2) return "ad-card account-sns account"
    }
    const togglemenuName = () => {
        if(page === 0) return "🛠 내 계정 관리"
        else if(page === 1) return "개인 정보"
        else if(page === 2) return "SNS 계정 정보" 
    }
    return (
        <div id="wrap" className={toggleclassName()}>
            <header className={`header${fix ? ' fix' : ''}`} ref={ref}>
                <div className="menu-wrap">
                    <button className="back" onClick={togglepage0}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-chevron-left.svg"} alt="이전으로"/></button>
                    <p>{togglemenuName()}</p>
                    <button className="close" onClick={gethome}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                </div>
            </header>
            <div className="content">
                { 
                    (() => {
                    if (page === 0){
                        return(
                            <>
                                <div className="form-box border-bottom">
                                    <form className="hover-style"><button onClick={togglepage1}>SNS 계정 정보<img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="바로가기"/></button></form>
                                    <form className="hover-style"><button onClick={togglepage2}>개인 정보<img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="바로가기"/></button></form>
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
                                    <form className="hover-style"><button onClick={getdelete}>계정삭제</button></form>
                                </div>
                            </>
                        );
                    } else if(page === 1){
                        return(
                            <>
                                <div className="form-box">
                                    <form>
                                        <label for="insta-id">Instagram</label>
                                        <input id="insta-id" type="text" placeholder="아이디를 입력해주세요"/>
                                    </form>
                                    <form>
                                        <label for="facebook-id">Facebook</label>
                                        <input id="facebook-id" type="text" placeholder="아이디를 입력해주세요"/>
                                    </form>
                                    <form>
                                        <label for="youtube-id">YouTube</label>
                                        <input id="youtube-id" type="text" placeholder="채널 주소를 입력해주세요"/>
                                    </form>
                                    <form>
                                        <label for="tiktok-id">TikTok</label>
                                        <input id="tiktok-id" type="text" placeholder="아이디를 입력해주세요"/>
                                    </form>
                                    <form>
                                        <label for="twitter-id">Twitter</label>
                                        <input id="twitter-id" type="text" placeholder="아이디를 입력해주세요"/>
                                    </form>
                                </div>
                                <Popup
                                    trigger={<button className="btn-purple fix-bottom enable">🔒저장하기</button>}
                                    modal
                                    onClose={togglepage0}>
                                        {close => (
                                            <div className="bg-opacity alert on">
                                                <div className="alert-wrap">
                                                    <div className="alert-box small">
                                                        <div className="text-box">
                                                            <p className="p-header">🔒 저장완료</p>
                                                            <p className="p-text">입력하신 정보가 저장 되었어요 👍</p>
                                                        </div>
                                                        <div className="btn-box">
                                                            <button onClick={close}>닫기</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </Popup>
                            </>
                        );
                    } else if(page === 2){
                        return(
                            <>
                                <div className="form-box border-bottom">
                                    <div className="hover-style">
                                        <button>
                                            <span>이름</span>
                                            <p className="user-name"></p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기"/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>생년월일</span>
                                            <p className="user-birth"></p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기"/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>성별</span>
                                            <p className="user-gender">여성</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기"/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>주소</span>
                                            <p className="user-address">
                                                <span>서울특별시 성북구 길음로 7길 20.</span>
                                                <span>서울 미디어랩 밀레니즈 290동102호</span>
                                            </p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-box border-bottom">
                                    <div className="hover-style">
                                        <button>
                                            <span>이메일 주소</span>
                                            <p className="user-email">{authService.currentUser.email}</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="hover-style">
                                    <button>
                                        <span>비밀번호</span>
                                        <p className="user-pw">••••••••</p>
                                        <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기"/>
                                    </button>
                                </div>
                            </>
                        );
                    } 
                })()
            }     
            </div>
            <footer className="footer"></footer>
        </div>
    );
}

export default Profile;