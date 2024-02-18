import Link from "next/link";
import { useEffect, useState } from "react";
import { serverUrl } from "./utils/server";

export default function Home() {
  const [userName, setUserName] = useState("");

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

  useEffect(() => {
    getUserInfo(localStorage.getItem("access_token")).then((data) => {
      setUserName(data.userName);
    });
  });

  return (
    <div>
      <h4 className="title">쿠팡후레시</h4>
      <p className="title-sub">by {userName}</p>
      <Link href="/login">로그인</Link>
    </div>
  );
}
