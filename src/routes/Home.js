import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import CardDragList from "components/CardDragList";
import { useHistory } from "react-router-dom";

const Home = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [nweets, setNweets] = useState([]);
    const [addcard, setaddcard] = useState(0);
    useEffect(() => {
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    };
    const linkaddcard = () => {
        if(addcard === 1){
            history.push("/addcard");
        } else if(addcard === 2){
            history.push("/addnotice");
        }
    }
    const toggleaddcard1 = () => history.push("/addcard");
    const toggleaddcard2 = () => history.push("/addnotice");
    return (
        <div id="wrap" className="admin-home">
            <button onClick={onLogOutClick}>로그아웃</button>
            <header className="header">
                <div className="menu-wrap">
                    <Popup
                        trigger={<p className="user-name">{userObj.displayName}</p>}
                        modal>
                        { close => (
                            <div className="bg-opacity alert on">
                                <div className="alert-wrap">
                                    <div className="alert-box">
                                        <div className="text-box">
                                            <p className="p-header">@{userObj.displayName}</p>
                                            <p className="p-text">링크 주소가 복사되었습니다.<br/>
                                                바로 이동할까요?</p>
                                        </div>
                                        <div className="btn-box">
                                            <button onClick={close}>닫기</button>
                                            <button>바로이동👉</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <p><span className="admin">admin</span>with by <u>brity</u></p>
                    <button type="submit" className="menu">
                        <Popup
                            trigger={<img src={process.env.PUBLIC_URL + "02-icon-01-outline-bars.svg"} alt="menu"/>}
                            modal
                            closeOnDocumentClick>
                            <nav className="bg-opacity on">
                                <div className="sheet-wrap nav-sheet">
                                    <div className="sheet-box">
                                        <button className="drag-btn"><span></span></button>
                                        <div className="sheet-name">메뉴</div>
                                        <ul className="sheet-list">
                                            <li><button>🛠 내 계정 관리</button></li>
                                            <li><button>🧑‍🔧 고객 도움</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </Popup>
                    </button>
                </div>
            </header>
            <div className="content">
                {
                    (nweets.length > 0 ? (
                        <>
                            <div className="del-text-box">
                                <button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-check.svg"} alt="체크"/>카드선택 및 삭제</button>
                            </div>
                            <div className="card-wrap">
                                <CardDragList nweets={nweets}/>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="empty-box">
                                <p>💁</p>
                                <p>생성된 카드가 아직 없어요</p>
                                <p>버튼을 눌러 새로운 카드를<br/>
                                    만들어 볼까요?</p>
                            </div>
                        </>
                    ))
                }
                <div className={"ad-card-btn" + (!nweets.length ? " emrty-ani" : "")}>
                    <img src={process.env.PUBLIC_URL + "02-icon-01-outline-plus.svg"} alt="카드만들기"/>
                    <Popup
                        trigger={<p>카드만들기</p>}
                        modal
                        >
                        { close => (
                            <div className="bg-opacity on">
                                <div className="sheet-wrap ad-card">
                                    <div className="sheet-box">
                                        <button className="drag-btn"><span></span></button>
                                        <div className="sheet-name">메뉴</div>
                                        <ul className="sheet-list">
                                            <li><button onClick={event => {
                                                close();
                                                toggleaddcard1();
                                                }}>🔗 링크 카드 만들기</button></li>
                                            <li><button onClick={event => {
                                                close();
                                                toggleaddcard2();
                                                }}>📢 공지 카드 만들기</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    );
};
export default Home;