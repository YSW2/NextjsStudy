import Link from "next/link";

export default function Home() {
  let name = "YSW";
  return (
    <div>
      <h4 className="title">쿠팡후레시</h4>
      <p className="title-sub">by {name}</p>
    </div>
  );
}
