import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import CardDragList from "components/CardDragList";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);
    return (
        <div id="wrap">
            <header className="header">
                <div className="menu-wrap">
                    <p className="user-name">{userObj.displayName}</p>
                    <p><span className="admin">admin</span>with by <u>brity</u></p>
                    <button type="submit" className="menu">
                        <img src="" alt="menu"/>
                    </button>
                </div>
            </header>
            <div className="content">
                {
                    (nweets.length > 0 ? (
                        <>
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
                <div className="ad-card-btn">
                    <img src="" alt="카드만들기"/>
                    <p>카드만들기</p>
                </div>
            </div>
        </div>
        /*<div className="container">
            <div style={{marginTop: 30}}>
                <CardDragList nweets={nweets}></CardDragList>
            </div>
            <Popup 
                trigger={<button>+</button>} 
                position="top center"
                className="menu">
                    <div className="menu">
                        <div className="menu-header">카드 만들기</div>
                        <Popup
                            trigger={<div className="menu-item">🔗 Link Card 만들기</div>}
                            modal
                            contentStyle={{width: "80%", height: "80%"}}
                        >
                            <div className="menu-header">🔗 Link Card 만들기</div>
                            <div>
                                <span>홈 카드에 보여질 이름을 적어주세요</span>
                            </div>
                            <div>
                                <input type="text" placeholder="어떤 이름의 링크를 만들어드릴까요?"></input>
                            </div>
                            <div>
                                <span>연결 할 링크 주소를 입력해주세요</span>
                            </div>
                            <div>
                                <input type="text" placeholder="연결할 링크 주소 전체를 입력해주세요"></input>
                            </div>
                            <div>
                                <label>링크 공개 여부</label>
                            </div>
                            <button>링크 만들기 완료</button>
                        </Popup>
                        <Popup
                            trigger={<div className="menu-item">📢Notice Card 만들기</div>}
                            modal
                            contentStyle={{width: "80%", height: "80%"}}
                        >
                            <div className="menu-header">📢Notice Card 만들기</div>
                            <div>
                                <span>홈 카드에 보여질 이름을 적어주세요*</span>
                            </div>
                            <div>
                                <input type="text" placeholder="어떤 이름의 링크를 만들어드릴까요?"></input>
                            </div>
                            <div>
                                <span>연결 할 링크 주소를 입력해주세요*</span>
                            </div>
                            <div>
                                <input type="text" placeholder="연결할 링크 주소 전체를 입력해주세요"></input>
                            </div>
                            <div>
                                <label>공지 공개 여부</label>
                            </div>
                            <button>공지 만들기 완료</button>
                        </Popup>
                    </div>
            </Popup>
            </div>*/
    );
};
export default Home;