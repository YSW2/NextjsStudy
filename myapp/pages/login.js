import { useRouter } from "next/router";
import { useState } from "react";
import { serverUrl } from "./utils/server";

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
      const response = await fetch(`${serverUrl}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          password: userPw,
        }),
      });
      const data = await response.json();

      if (data.login) {
        router.push("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
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
