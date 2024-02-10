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
import signIn from "../assets/images/Mobile login-pana.svg";
import Helmet from "../components/Helmet/Helmet";
import "../styles/SignIn.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Check your email for password reset instructions.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Helmet title="Reset Password">
      <section>
        <Container>
          <Row>
            <Col
              md={6}
              sm={12}
              className="d-flex justify-content-center align-items-center"
            >
              <img src={signIn} className="w-75" alt="Sign In" />
            </Col>
            <Col md={6} sm={12} className=" justify-content-center ">
              <Card className="w-100" color="light" outline>
                <CardBody>
                  <h1 className="text-center">Reset Password</h1>

                  <form onSubmit={(e) => handleResetPassword(e)}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        required
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <FormFeedback>{error}</FormFeedback>
                    </FormGroup>

                    <div className="Submit d-flex justify-content-center">
                      <Button type="submit" className="SubmitBtn">
                        Reset Password
                      </Button>
                    </div>
                  </form>

                  <div className="text-center m-1">
                    <div className="w-100 text-cnter">
                      <Link to="/SignIn" className="mt-2">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="w-100 text-center mt-2">
                Need an account?
                <Link to="/register">Sign Up</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ForgetPassword;
