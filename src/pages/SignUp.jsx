import  { useState } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Container,
  Card,
  CardBody,
  FormFeedback,
} from "reactstrap";
import signIn from "../media/images/Mobile login-pana.svg";
import Helmet from "../components/Helmet/Helmet";
import "../styles/SignIn.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  // GoogleAuthProvider,
  // signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import Googleimg from "../media/images/google.png";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../Firebase/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from "../components/Loader/Loader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();
  // const googleProvider = new GoogleAuthProvider();

  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     // Update user profile
  //     await updateProfile(user, {
  //       displayName: user.displayName || "New User",
  //       photoURL: user.photoURL || null,
  //     });

  //     const { displayName, email, photoURL, uid } = user;

  //     // Store user data in Firestore
  //     await setDoc(doc(db, "users", uid), {
  //       uid,
  //       displayName,
  //       email,
  //       photoURL,
  //       createdAt: Date.now(),
  //     });

  //     console.log("User signed in with Google", user);
  //     navigate("/SignIn");
  //   } catch (error) {
  //     console.error("Google Sign-In Error", error.message);
  //   }
  // };

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("User Signed Up ", user);

      // File upload
      if (file) {
        const storageRef = ref(storage, `images/${Date.now() + username}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (uploadError) => {
            setLoading(false);
            setError(uploadError);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                // Update user profile
                await updateProfile(user, {
                  displayName: username,
                  photoURL: downloadURL,
                });

                // Store user data in Firestore
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName: username,
                  email,
                  photoURL: downloadURL,
                  createdAt: Date.now(),
                });

                setLoading(false);
                navigate("/SignIn");
              })
              .catch((urlError) => {
                setLoading(false);
                setError(urlError.message);
              });
          }
        );
      } else {
        setLoading(false);
        navigate("/SignIn"); // If no file, navigate to Sign In directly
      }
    } catch (authError) {
      setLoading(false);
      setError(authError.message);
    }
  };

  return (
    <Helmet title="Sign Up">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img src={signIn} className="w-75" alt="Sign In" />
                </Col>
                <Col md={6} sm={12} className="justify-content-center">
                  <Card className="w-100" color="light" outline>
                    <CardBody>
                      <h1 className="text-center">Sign Up</h1>
                      <p className="text-center">Welcome To Yum Dash!</p>

                      <form onSubmit={signUp}>
                        <FormGroup>
                          <Label for="Username">Username</Label>
                          <Input
                            type="text"
                            name="Username"
                            id="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            id="email"
                          />
                          <FormFeedback>{error}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input
                            type="password"
                            name="password"
                            required
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <FormFeedback>{error}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            className="m-3"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </FormGroup>
                        <div className="Submit d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="SubmitBtn"
                            disabled={loading}
                          >
                            Submit
                          </Button>
                        </div>
                      </form>

                      <div className="text-center">
                        {/* <p className="m-2">or</p> */}
                        {/* <Button
                          onClick={signInWithGoogle}
                          className="GoogleSignInBtn"
                          disabled={loading}
                        >
                          <img
                            src={Googleimg}
                            alt="Googleimg"
                            className="Googleimg"
                            loading="lazy"
                          />
                          Sign Up with Google
                        </Button> */}
                      </div>
                    </CardBody>
                  </Card>
                  <div className="text-center w-100 mt-2">
                    Already have an account?
                    <Link to="/SignIn">Sign In</Link>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;
