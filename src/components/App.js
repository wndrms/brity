import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import { authService, dbService } from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        dbService.collection("nweets").onSnapshot(snapshot => {
          const nweetArray = snapshot.docs.map((doc) => ({
              id:doc.id, 
              ...doc.data(),
          }));
          setNweets(nweetArray);
      });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? ( 
        <AppRouter 
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj}
          nweets={nweets}/>
       ) : ("Initialization...")}
    </>
  );
}

export default App;
