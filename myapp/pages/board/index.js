import Link from "next/link";

export default function board() {
  return (
    <div>
      <h1>게시판</h1>
      <Link href="/board/write">글쓰기</Link>
    </div>
  );
}
