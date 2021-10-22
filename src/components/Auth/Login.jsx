import { Button } from "@material-ui/core";
import styled from "styled-components";
//import chatImg from "../../assets/chat.png";
import { auth, googleAuthProvider } from "../../firebase-config";
import { setUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import loaderFile from "../../assets/loader.gif";

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userData);

  const signIn = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .catch((err) => toast.error("login failed", err));
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setUsers(user));
      } else {
        toast.error("No User Found!!");
      }
    });
  }, [dispatch]);
  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "px " }}>
        <img src={loaderFile} alt="Loading...." />
      </div>
    );
  }

  return (
    <Container>
      <title>Login</title>

      <LoginContainer>
        <img
          src="https://www.nicepng.com/png/detail/252-2527941_new-delhi-october-08-hike-messenger-logo-png.png"
          alt=""
        />
        <Button
          variant="contained"
          style={{
            background: "#56C0FB",
            color: "#0c0b0b",
            textShadow: "2px 2px 9px rgba(4,4,4,0.56)",
          }}
          onClick={signIn}
        >
          Sign in with google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: -30px 42px 29px -19px rgba(31, 31, 31, 1);
  -webkit-box-shadow: -30px 42px 29px -19px rgba(31, 31, 31, 1);
  -moz-box-shadow: -30px 42px 29px -19px rgba(31, 31, 31, 1);
`;
/* 
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
 */
