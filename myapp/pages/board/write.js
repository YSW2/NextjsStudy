import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // 스타일링을 위한 CSS 임포트
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function write() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const isTitleValid = () => {
    if (title.length > 0) {
      return true;
    }
    window.alert("제목을 입력하세요");
  };

  const isTextValid = () => {
    if (text.length > 0) {
      return true;
    }
    window.alert("내용을 입력하세요");
  };

  const handleSubmit = () => {
    if (isTitleValid() && isTextValid()) {
      console.log("제목: ", title);
      console.log("내용: ", text);
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
        <ReactQuill theme="snow" value={text} onChange={setText} />
      </div>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
}
