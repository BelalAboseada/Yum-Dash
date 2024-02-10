import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import Loader from "../components/Loader/Loader";
import Helmet from "../components/Helmet/Helmet";
import { Button, Container } from "reactstrap";
import "../styles/Dashpord.scss"
import userImg from "../assets/images/usericonimg.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState(null);
  const Navigate =  useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserName(user.displayName);

        if (user.photoURL) {
          setUserPhotoURL(user.photoURL);
        } else {
          setUserPhotoURL("userImg");
        }
      } else {
        setUserName(null);
        setUserPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const SignOut = async () => {
    try {
      await auth.signOut();
      alert("Signed out Succesfully!")
      Navigate("/")

    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Helmet title="Dashpord">
      <Container>
        {userName ? (
          <div className="text-center">
            {userImg ? (
              <img src={userPhotoURL} alt="User img" className="Userimg m-3" />
            ) : (
              <img src={userImg} alt="User img" className="Userimg m-3" />
            )}

            <h2 className="m-3">Hello, {userName}!</h2>
            <Button className="SignOutBtn mb-2" onClick={SignOut}>Sign out</Button>
          </div>
        ) : (
          <Loader />
        )}
      </Container>
    </Helmet>
  );
};

export default Dashboard;
