import { dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import Popup from 'reactjs-popup';
import CardDragList from "components/CardDragList";
import { useHistory } from "react-router-dom";

const Home = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [nweets, setNweets] = useState([]);
    const [isDelete ,setisDelete] = useState(false);
    const [fix, setfix] = useState(false);
    const [delcards, setdelcards] = useState([]); 
    const ref = useRef(null);
    const handleScroll = () => {
        if(ref.current) {
            setfix(ref.current.getBoundingClientRect().top <= 0);
        }
    };
    useEffect(() => {
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);
    const toggleaddcard1 = () => history.push("/addcard");
    const toggleaddcard2 = () => history.push("/addnotice");
    const togglemenu1 = () => history.push("/Profile");
    const togglemenu2 = () => history.push("/help");
    const toggleisDelete = () => setisDelete((prev) => !prev);
    const toggleuser = () => history.push("/user");
    const adddelcard = (cardid) => {
        let cardArray = delcards;
        if(!cardArray.includes(cardid)){
            cardArray = [cardid,
                ...cardArray];
        }
        else cardArray = cardArray.filter(id => id!=cardid);
        setdelcards(cardArray);
    }
    const emptydelcard = () => setdelcards([]);
    const deletecards = async () => {
        let cardArray = delcards;
        await cardArray.map((card) => {
            dbService.doc(`nweets/${card}`).delete();
        });
        setdelcards([]);
        history.push("/");
    }
    return (
        <div id="wrap" className="admin-home">
            <header className={`header${fix ? ' fix' : ''}`} ref={ref}>
                <div className="menu-wrap home-menu-btn">
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
                                            <button onClick={toggleuser}>바로이동👉</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <p><span className="admin">Admin</span>with by <u>brity</u></p>
                    <button type="submit" className="menu">
                        <Popup
                            trigger={<img src={process.env.PUBLIC_URL + "02-icon-01-outline-bars.svg"} alt="menu"/>}
                            modal
                            closeOnDocumentClick>
                            <nav className="bg-opacity on" style={{height: "calc(100% - 200px)"}}>
                                <div className="sheet-wrap nav-sheet">
                                    <div className="sheet-box">
                                        <button className="drag-btn"><span></span></button>
                                        <div className="sheet-name">메뉴</div>
                                        <ul className="sheet-list">
                                            <li><button onClick={togglemenu1}>🛠 내 계정 관리</button></li>
                                            <li><button onClick={togglemenu2}>🧑‍🔧 고객 도움</button></li>
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
                                <Popup
                                    trigger={<button><img src={process.env.PUBLIC_URL + "02-icon-01-outline-check-000.svg"} alt="체크"/>카드선택 및 삭제</button>}
                                    closeOnDocumentClick={false}
                                    onOpen={toggleisDelete}
                                    onClose={toggleisDelete}>
                                    { close => (
                                        <div className="card-del-wrap on">
                                            <div className="card-del-box">
                                                <button onClick={close}><img src={process.env.PUBLIC_URL + "02-icon-01-outline-times.svg"} alt="닫기"/></button>
                                                {delcards.length > 0 ? (
                                                    <p className="del-message "><span className="count">{delcards.length}</span>개의 카드가 선택 되었어요</p>
                                                ) : (
                                                    <p className="del-message "><span className="count"></span>삭제할 카드를 선택하세요</p>
                                                )}
                                                <form className="check-circle-all-del">
                                                    <input type="checkbox" id="all-del"/>
                                                    <label for="all-del" className="all-del">전체 선택</label>
                                                </form>
                                                <div className="btn-wrap">
                                                    { delcards.length > 0 ? (
                                                        <>
                                                            <button className="btn-purple enable" onClick={emptydelcard}>선택 해제</button>
                                                            <button className="btn-purple-filled enable" onClick={deletecards}>선택 삭제하기</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="btn-purple">선택 해제</button>
                                                            <button className="btn-purple-filled">선택 삭제하기</button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                                
                            </div>
                            <div className="card-wrap">
                                {!isDelete ? (
                                    <CardDragList nweets={nweets}/>
                                ) : (
                                    nweets.map((nweet) => (
                                        <div className="card del">
                                            <h3>{nweet.subtitle}</h3>
                                            <button onClick={() => adddelcard(nweet.id)}>
                                                { delcards.includes(nweet.id) ? (
                                                    <img src={process.env.PUBLIC_URL + "02-icon-01-outline-check-000.svg"} alt="삭제 체크" />
                                                ) : (
                                                    <img src={process.env.PUBLIC_URL + "02-icon-02-solid-check-circle.svg"} alt="삭제 체크" />
                                                )}
                                                </button>
                                            <p>{nweet.title}</p>
                                        </div>
                                    ))
                                )}
                                
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
                            <div className="bg-opacity on" style={{height: "calc(100% - 200px)"}}>
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