import { dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

const UserHome = ({userObj}) => {
    const history = useHistory();
    const [nweets, setNweets] = useState([]);
    const [fix, setfix] = useState(false);
    const [check, setcheck] = useState(true);
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
    return(
        <div id="wrap" className="user-home admin-home">
            <header className={`header${fix ? ' fix' : ''}`} ref={ref}>
                <div className="menu-wrap home-menu-btn">
                    <Popup
                        trigger={<p className="user-name">{userObj.displayName}</p>}
                        modal>
                        { close => (
                            <div className="bg-opacity alert on">
                                <div className="alert-wrap">
                                    <div className="alert-box small">
                                        <div className="text-box">
                                            <p className="p-header">{userObj.displayName}</p>
                                            <p className="p-text">링크 주소가 복사되었어요</p>
                                        </div>
                                        <div className="btn-box">
                                            <button onClick={close}>닫기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <p>with by <u>brity</u></p>
                    <button className="menu">
                        <Popup
                            trigger={<img src={process.env.PUBLIC_URL + "02-icon-01-outline-bars.svg"} alt="menu"/>}
                            modal
                            closeOnDocumentClick>
                            <div className="user-home">
                                <nav className="bg-opacity on" style={{height: "calc(100% - 200px)"}}>
                                    <div className="sheet-wrap sns-sheet">
                                        <div className="sheet-box">
                                            <button className="drag-btn"><span></span></button>
                                            <div className="sheet-name">SNS</div>
                                            <ul className="sheet-list">
                                                { check ? (
                                                    <>
                                                        <li>
                                                            <button>
                                                                <img src={process.env.PUBLIC_URL + "instagram-icon.svg"} alt="instagram"/>
                                                                <p>Instagram</p>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button>
                                                                <img src={process.env.PUBLIC_URL + "facebook-icon.svg"} alt="facebook"/>
                                                                <p>facebook</p>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button>
                                                                <img src={process.env.PUBLIC_URL + "youtube-icon.svg"} alt="youtube"/>
                                                                <p>youtube</p>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button>
                                                                <img src={process.env.PUBLIC_URL + "tiktok-icon.svg"} alt="Tiktok"/>
                                                                <p>tiktok</p>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button>
                                                                <img src={process.env.PUBLIC_URL + "twitter-icon.svg"} alt="twitter"/>
                                                                <p>twitter</p>
                                                            </button>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <li className="none-sns-message">현재 등록된 SNS 주소가 없어요😯</li>
                                                )}
                                            </ul>
                                            <p>go to. <u>Brity</u></p>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </Popup>
                    </button>
                </div>
            </header>
            <div className="content">
                {nweets.map((nweet) => (
                    <div className="card"
                        style={nweet.cardcolor ? (
                            {background:nweet.cardcolor}
                        ) : ({
                                background: `url(${nweet.cardImage})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            let link
                            if(nweet.link){
                                link = nweet.link;
                                
                                if(link.indexOf('https://') === -1){
                                    link = "https://" + link;
                                    console.log(link);
                                } 
                                
                                window.location.href=link;
                            } else {
                                link = nweet.id;
                                history.push("/notice/" + link);
                            }
                        }}>
                        <h3>{nweet.subtitle}</h3>
                        <p>{nweet.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserHome;