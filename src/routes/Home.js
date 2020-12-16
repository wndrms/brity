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
        <div className="container">
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
        </div>
    );
};
export default Home;