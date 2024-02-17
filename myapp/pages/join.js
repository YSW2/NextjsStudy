import { useState } from "react";
import { useRouter } from "next/router";
import { isEmailValid } from "./utils/validation";
import { serverUrl } from "./utils/server";

export default function join() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(null);

  const changeIdValue = (e) => {
    setUserId(e.target.value);
  };
  const changePwValue = (e) => {
    setUserPw(e.target.value);
  };
  const changeNameValue = (e) => {
    setUserName(e.target.value);
  };
  const changeEmailValue = (e) => {
    setUserEmail(e.target.value);
  };

  const checkIdDuplication = async (userId) => {
    try {
      const response = await fetch(`${serverUrl}user/id-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      return response.json();
    } catch (error) {
      console.log("중복확인 에러");
    }
  };

  const handleIdCheckButton = () => {
    checkIdDuplication(userId).then((data) => {
      if (data.success == true) {
        setIsDuplicate(false);
      } else {
        setIsDuplicate(true);
      }
    });
  };

  const submitJoin = async () => {
    if (isDuplicate == false && isEmailValid(userEmail)) {
      try {
        let response = await fetch(`${serverUrl}user/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            userPw: userPw,
            userName: userName,
            userEmail: userEmail,
          }),
        });

        if (response.ok) {
          router.push("/login");
        }
      } catch (error) {
        console.log("로그인 에러");
      }
    }
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <input
          type="text"
          value={userId}
          onChange={changeIdValue}
          placeholder="ID"
          disabled={isDuplicate == false}
        ></input>
        <button onClick={handleIdCheckButton}>ID 중복확인</button>
        <input
          type="password"
          value={userPw}
          onChange={changePwValue}
          placeholder="Password"
        ></input>
        <input
          type="text"
          value={userName}
          onChange={changeNameValue}
          placeholder="Name"
        ></input>
        <input
          type="text"
          value={userEmail}
          onChange={changeEmailValue}
          placeholder="Email"
        ></input>
        <button onClick={submitJoin}>가입</button>
      </div>
    </div>
  );
}
