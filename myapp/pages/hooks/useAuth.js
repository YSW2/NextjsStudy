import { useEffect } from "react";
import { addMinutesToCurrentTime } from "../utils/utils";

const useAuth = () => {
  useEffect(() => {
    const refreshToken = async () => {
      const access_expires = localStorage.getItem("access_expires");
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token && access_expires < new Date()) {
        // refresh_token을 사용하여 access_token 갱신 시도
        const response = await fetch(
          "http://localhost:8000/api/token/refresh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refresh_token }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // 갱신된 access_token을 로컬 스토리지에 저장
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("access_expires", addMinutesToCurrentTime(5));
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_expires");
          localStorage.removeItem("refresh_expires");
        }
      }
    };

    refreshToken();
  }, []);

  // 필요한 경우 추가 로직 구현
};

export default useAuth;
