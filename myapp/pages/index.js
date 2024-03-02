import Link from "next/link";
import { useEffect, useState } from "react";
import { serverUrl } from "./utils/server";

export default function Home() {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const getUserInfo = async (access_token) => {
    try {
      const response = await fetch(`${serverUrl}user/get-info`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      setUser(data.userName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
      getUserInfo(token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_expires");
    localStorage.removeItem("refresh_expires");
    setUser("");
    setIsLogin(false);
  };

  function online() {
    return (
      <div>
        <h1>Hi, {user}!</h1>
        <p>{localStorage.getItem("access_expires")}</p>
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
