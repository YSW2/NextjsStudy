import { useState } from "react";

export default function login() {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const changeIdValue = (e) => {
    setUserId(e.target.value);
  };

  const changePwValue = (e) => {
    setUserPw(e.target.value);
  };

  const onLogin = async () => {
    try {
      await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userPw: userPw,
        }),
      });
    } catch (error) {
      console.log("로그인 에러");
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
