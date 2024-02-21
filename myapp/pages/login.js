import { useRouter } from "next/router";
import { useState } from "react";
import { serverUrl } from "./utils/server";
import { addMinutesToCurrentTime } from "./utils/utils";

export default function login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const router = useRouter();

  const changeIdValue = (e) => {
    setUserId(e.target.value);
  };

  const changePwValue = (e) => {
    setUserPw(e.target.value);
  };

  const onLogin = async () => {
    try {
      const response = await fetch(`${serverUrl}api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          password: userPw,
        }),
      });

      const data = await response.json(); // 응답 데이터를 JSON 형태로 파싱

      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("access_expires", addMinutesToCurrentTime(5));
        localStorage.setItem("refresh_expires", addMinutesToCurrentTime(60));
        router.push("/"); // 홈 페이지로 리디렉션
      } else {
        console.log("Login failed"); // 로그인 실패 처리
      }
    } catch (error) {
      console.log(error); // 네트워크 오류 등의 예외 처리
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <input
          type="text"
          value={userId}
          onChange={changeIdValue}
          placeholder="ID"
        ></input>
        <input
          type="password"
          value={userPw}
          onChange={changePwValue}
          placeholder="Password"
        ></input>
        <button onClick={onLogin}>로그인</button>
      </div>
    </div>
  );
}
