import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../redux/tokenReducer";
import { setMember } from "../redux/memberReducer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = new URL(window.location.href).searchParams.get("accessToken");
  const refreshToken = new URL(window.location.href).searchParams.get("refreshToken");
  const name = new URL(window.location.href).searchParams.get("name");
  const isFirstTime = new URL(window.location.href).searchParams.get("firstTime");

  useEffect(() => {
    const loginDispatch = (token, member) => {
      dispatch(login(token));
      dispatch(setMember(member));
    };
    axios.get("https://api.missulgan.art/member/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => {
        const { data: member } = res;
        loginDispatch({ accessToken, refreshToken }, member);
        if (isFirstTime === true) //isFirstTime 들어갈 자리
          navigate(`/join/${name}`);
        else
          navigate('/home');
      });
  }, [name, isFirstTime, accessToken, refreshToken, navigate, dispatch]);
}

export default Login;