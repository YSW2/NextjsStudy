import Link from "next/link";

const navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">홈</Link>
      <Link href="/board">게시판</Link>
    </div>
  );
};
export default navbar;
