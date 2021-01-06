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
    const togglepage = (num) => setpage(num);
    const toggleclassName = () => {
        if(page === 0) return "ad-card account-menu account"
        else if(page === 1) return "ad-card account-sns account"
        else if(page === 2) return "account-info01 account"
        else if(page > 2) return "account-info0" + (page-1).toString + " account account-info"
    }
    const togglemenuName = () => {
        if(page === 0) return "🛠 내 계정 관리"
        else if(page === 1) return "SNS 계정 정보"
        else if(page >= 2) return "개인 정보" 
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
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(3)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>생년월일</span>
                                            <p className="user-birth"></p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(4)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>성별</span>
                                            <p className="user-gender">여성</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(5)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>주소</span>
                                            <p className="user-address">
                                                <span>서울특별시 성북구 길음로 7길 20.</span>
                                                <span>서울 미디어랩 밀레니즈 290동102호</span>
                                            </p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(6)}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-box border-bottom">
                                    <div className="hover-style">
                                        <button>
                                            <span>이메일 주소</span>
                                            <p className="user-email">{authService.currentUser.email}</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(7)}/>
                                        </button>
                                    </div>
                                    <div className="hover-style">
                                        <button>
                                            <span>비밀번호</span>
                                            <p className="user-pw">••••••••</p>
                                            <img src={process.env.PUBLIC_URL + "02-icon-03-18-px-outline-chevron-right.svg"} alt="수정하기" onClick={() => togglepage(8)}/>
                                        </button>
                                    </div>
                                </div>
                                
                            </>
                        );
                    } else if(page === 3){
                        return(
                            <>
                                <h2>이름 수정하기</h2>
                                <p>🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <form>
                                        <label for="user-name">이름</label>
                                        <input
                                            type="text"
                                            id="user-name"
                                            className="input-basic"
                                            placeholder=""/>
                                        <button></button>
                                        <div className="message">이름을 입력해주세요</div>
                                    </form>
                                </div>
                                <button className="btn-purple fix-bottom enable">🔒저장하기</button>
                            </>
                        );
                    } else if(page === 4){
                        return(
                            <>
                                <h2>생일 수정하기</h2>
                                <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                    🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <p>생일</p>
                                    <div className="birth">
                                        <form>
                                            <label for="year"></label>
                                            <input
                                                type="number"
                                                id="year"
                                                min="1900"
                                                max="2020"
                                                className="input-basic"
                                                placeholder="연도"/>
                                        </form>
                                        <form>
                                            <label for="month"></label>
                                            <input
                                                type="number"
                                                id="month"
                                                min="1"
                                                max="12"
                                                className="input-basic"
                                                placeholder="월"/>
                                        </form>
                                        <form>
                                            <label for="date"></label>
                                            <input
                                                type="number"
                                                id="date"
                                                min="1"
                                                max="31"
                                                className="input-basic"
                                                placeholder="일"/>
                                        </form>
                                    </div>
                                </div>
                                <button className="btn-purple fix-bottom enable">🔒저장하기</button>
                            </>
                        );
                    } else if(page === 5){
                        return(
                            <>
                                <h2>성별 수정하기</h2>
                                <p>성별</p>
                                <div className="form-box hover-style">
                                    <form className="check-circle">
                                        <input type="checkbox" id="male"/>
                                        <label for="male">남자</label>
                                    </form>
                                    <form className="check-circle">
                                        <input type="checkbox" id="female"/>
                                        <label for="female">여자</label>
                                    </form>
                                    <form className="check-circle">
                                        <input type="checkbox" id="none"/>
                                        <label for="none">선택안함</label>
                                    </form>
                                </div>
                                <button className="btn-purple fix-bottom enable">🔒저장하기</button>
                            </>
                        );
                    } else if(page === 6){
                        return(
                            <>
                                <h2>주소 수정하기</h2>
                                <p>개인정보는 공개되지 않는 정보에요 🤫<br/>
                                    🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <form className="search-address">
                                        <label for="address">주소</label>
                                        <input
                                            type="text"
                                            className="input-basic"
                                            id="address"
                                            placeholder="우편번호를 입력하세요"/>
                                        <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-search.svg"} alt="검색"/></button>
                                        <div className="message">우편번호를 입력해주세요</div>
                                    </form>
                                    <form>
                                        <label for="detail-address"></label>
                                        <input
                                            type="text"
                                            className="input-basic"
                                            id="detail-address"
                                            placeholder="상세주소를 입력하세요" />
                                        <button></button>
                                        <div className="message">상세 주소를 입력해주세요</div>
                                    </form>
                                </div>
                                <button className="btn-purple fix-bottom enable">🔒저장하기</button>
                            </>
                        );
                    } else if(page === 7){
                        return(
                            <>
                                <h2>이메일 수정하기</h2>
                                <p>🖍 수정할 내용을 입력해 주세요</p>
                                <div className="form-box">
                                    <form>
                                        <label for="user-email">이메일</label>
                                        <input
                                            type="email"
                                            className="input-basic"
                                            id="user-email"
                                            placeholder="" />
                                        <button></button>
                                        <div className="message">이메일 형식이 올바르지 않아요</div>
                                    </form>
                                </div>
                                <button className="btn-purple fix-bottom enable">🔒저장하기</button>
                            </>
                        );
                    } else if(page === 8){
                        return(
                            <>
                                <h2>비밀번호 수정하기</h2>
                                <p>정보를 안전하게 보호하기 위해<br/>
                                    본인임을 인증해 주세요</p>
                                <div className="form-box">
                                    <form>
                                        <label for="user-pw">비밀번호</label>
                                        <input
                                            type="password"
                                            className="input-basic"
                                            id="user-email"
                                            placeholder="" />
                                        <button></button>
                                        <div className="message">비밀번호가 일치하지 않아요</div>
                                    </form>
                                </div>
                                <button className="btn-basic next" onClick={() => togglepage(9)}>계속</button>
                            </>
                        );
                    } else if(page === 9){
                        return(
                            <>
                                <h2>비밀번호 수정하기</h2>
                                <p>새로운 비밀번호로 변경하겠습니다 🤓<br/>
                                    앞으로 로그인할 때 변경한 비밀번호를 입력해 주세요</p>
                                <div className="form-box">
                                    <form>
                                        <label for="new-user-pw">새 비밀번호<span class="required">*</span></label>
                                        <input
                                            type="password"
                                            className="input-basic"
                                            id="new-user-pw"
                                            placeholder="새롭게 설정할 비밀번호를 입력하세요" />
                                        <button></button>
                                        <div className="message">8자 이상, 소문자 숫자가 포함되어야 합니다</div>
                                    </form>
                                </div>
                                <div className="form-box">
                                    <form>
                                        <label for="new-user-pw-re">새 비밀번호 확인<span class="required">*</span></label>
                                        <input
                                            type="password"
                                            className="input-basic"
                                            id="new-user-pw-re"
                                            placeholder="새 비밀번호를 확인해주세요" />
                                        <button></button>
                                        <div className="message">비밀번호가 일치하지 않아요</div>
                                    </form>
                                </div>
                                <button className="btn-purple fix-bottom enable" onClick={() => togglepage(2)}>🔒저장하기</button>
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