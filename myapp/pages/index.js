import Link from "next/link";
import { useEffect, useState } from "react";
import { serverUrl } from "./utils/server";
import { addMinutesToCurrentTime } from "./utils/utils";

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
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async (refresh_token) => {
    try {
      const response = await fetch(`${serverUrl}api/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refresh_token,
        }),
      });
      if (response == 401) {
        logout();
      } else {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("access_expires", addMinutesToCurrentTime(5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_expires");
    localStorage.removeItem("refresh_expires");
    setUser("");
    setIsLogin(false);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const access_expires = localStorage.getItem("access_expires");
      const refresh_expires = localStorage.getItem("refresh_expires");

      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      if (new Date(refresh_expires) > new Date()) {
        if (new Date(access_expires) < new Date()) {
          console.log("access 토큰 만료");
          // getAccessToken 호출하고 완료될 때까지 기다림
          await getAccessToken(refresh_token);
          // getAccessToken이 완료된 후에 새로운 access_token을 로컬 스토리지에서 다시 가져옴
          const updated_access_token = localStorage.getItem("access_token");
          setIsLogin(true);
          // 새로운 access_token으로 사용자 정보를 가져옴
          if (!user) {
            getUserInfo(updated_access_token).then((data) => {
              setUser(data.userName);
            });
          }
        } else {
          // access_token이 여전히 유효한 경우, 바로 사용자 정보를 가져옴
          setIsLogin(true);
          if (!user) {
            getUserInfo(access_token).then((data) => {
              setUser(data.userName);
            });
          }
        }
      } else {
        logout();
      }
    };

    checkAuthStatus();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

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
