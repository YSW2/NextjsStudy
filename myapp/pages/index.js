import Link from "next/link";
import { useEffect, useState } from "react";
import { serverUrl } from "./utils/server";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const getUserInfo = async (access_token) => {
    try {
      const response = await fetch(`${serverUrl}user/get-info`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUserName("");
    setIsLogin(false);
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      setIsLogin(true);
      getUserInfo(access_token).then((data) => {
        if (data && data.userName) {
          setUserName(data.userName);
        } else {
          // 토큰이 유효하지 않은 경우 로그아웃 처리
          logout();
        }
      });
    }
  }, []);

  function online() {
    return (
      <div>
        <h1>Hi, {userName}!</h1>
        <button onClick={logout}>로그아웃</button>
      </div>
    );
  }

  function offline() {
    return (
      <div>
        <h1>로그인 해주세요</h1>
        <Link href="/login">로그인</Link>
      </div>
    );
  }

  return <div>{isLogin ? online() : offline()}</div>;
}
