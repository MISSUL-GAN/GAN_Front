import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMember } from "../redux/memberReducer";
import { getMember } from "../api/memberApi";
import { saveToken } from '../util/tokenUtil';
import { setAccessToken } from "../api/api";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = new URL(window.location.href).searchParams.get("accessToken");
  const refreshToken = new URL(window.location.href).searchParams.get("refreshToken");
  const name = new URL(window.location.href).searchParams.get("name");
  const isFirstTime = new URL(window.location.href).searchParams.get("firstTime");

  useEffect(() => {
    const loginDispatch = (member) => dispatch(setMember(member));
    setAccessToken(accessToken);
    saveToken(accessToken, refreshToken);
    getMember()
      .then(data => {
        loginDispatch(data);
        if (isFirstTime === 'true')
          navigate(`/join/${name}`);
        else
          navigate('/home');
      });
  }, [name, isFirstTime, accessToken, refreshToken, navigate, dispatch]);
}

export default Login;