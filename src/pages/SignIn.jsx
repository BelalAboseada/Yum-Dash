import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
// import Googleimg from "../assets/images/google.png";
import Loader from "../components/Loader/Loader";
import signIn from "../assets/images/Mobile login-pana.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set authentication persistence when component mounts
    setPersistence(auth, browserSessionPersistence)
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log("persistence set")
      })
      .catch((error) => {
        console.error("Error setting persistence", error);
      });
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);

      const user = userCredential.user;
      console.log("User Signed In ", user);
      navigate("/");
    } catch (authError) {
      setLoading(false);
      setError(authError.message);
      if (authError.code === "auth/user-not-found") {
        setError("Account not found. Please create an account.");
      } else if (authError.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError(authError.message);
      }
    }
  };

  // const signInWithGoogle = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("User signed in with Google", user);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Google Sign-In Error", error.message);
  //   }
  // };

  return (
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
                  <h1 className="text-center">Sign In</h1>
                  <p className="text-center">Welcome back!</p>

                  <form onSubmit={handleSignIn}>
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
                        invalid={error !== null}
                      />
                      <FormFeedback>{error}</FormFeedback>
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

                  <div className="text-center m-1">
                    <Link to="/ForotPassword">Forget Password?</Link>
                    <p className="m-1">or</p>
                    {/* <Button
                      onClick={signInWithGoogle}
                      className="GoogleSignInBtn"
                      disabled={loading}
                    >
                      <img
                        src={Googleimg}
                        alt="Googleimg"
                        className="Googleimg"
                      />
                      Sign In with Google
                    </Button> */}
                  </div>
                </CardBody>
              </Card>
              <div className="text-center w-100 mt-2">
                Create an account? <Link to="/register">Sign Up</Link>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default SignIn;
