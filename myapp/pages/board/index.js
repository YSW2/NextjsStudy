import Link from "next/link";
import { useEffect, useState } from "react";
import { serverUrl } from "../utils/server";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [pageNum, setPageNum] = useState([]);

  const getPostList = async () => {
    try {
      const response = await fetch(
        `${serverUrl}board?page=${page}&page_size=${pageSize}`
      );
      const data = await response.json();

      let totalPage = [];
      for (let i = 1; i <= Math.ceil(data.count / pageSize); i++) {
        totalPage.push(i);
      }

      console.log(data);
      setPageNum(totalPage);
      setPosts(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPage(1);
  };

  const routePrev = () => {
    setPage(page - 1);
  };

  const routeNext = () => {
    setPage(page + 1);
  };

  const routePage = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    getPostList();
  }, [page]);

  return (
    <div>
      <h1>게시판</h1>
      <Link href="/board/write">글쓰기</Link>
      <ul>
        {posts?.map((post) => {
          return (
            <li key={post.id}>
              <span>{post.author_name}</span>
              <Link href={`board/posts/${post.id}`}>{post.title}</Link>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button disabled={!prevUrl} onClick={routePrev}>
          &lt; 이전
        </button>
        {pageNum?.map((p) => {
          return (
            <button key={p} onClick={() => routePage(p)}>
              {p}
            </button>
          );
        })}
        <button disabled={!nextUrl} onClick={routeNext}>
          다음 &gt;
        </button>
      </div>
    </div>
  );
}
