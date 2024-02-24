import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css"; // 스타일링을 위한 CSS 임포트
import dynamic from "next/dynamic";
import { serverUrl } from "../utils/server";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function write() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const isTitleValid = () => {
    if (title.length > 0) {
      return true;
    }
    window.alert("제목을 입력하세요");
  };

  const iscontentValid = () => {
    if (content.length > 0) {
      return true;
    }
    window.alert("내용을 입력하세요");
  };

  const handleSubmit = async () => {
    if (isTitleValid() && iscontentValid()) {
      try {
        const response = await fetch(`${serverUrl}board/write-post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
            author: 3,
          }),
        });
        if (response.ok) {
          router.push("/board");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>글쓰기</h1>
      <div className="title-container">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <div className="text-container">
        <ReactQuill theme="snow" value={content} onChange={setcontent} />
      </div>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
}
