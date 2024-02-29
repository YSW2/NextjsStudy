import { serverUrl } from "@/pages/utils/server";
import DOMPurify from "isomorphic-dompurify";

export default function Posts({ post }) {
  return (
    <div className="post">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          작성자 {post.author_name} | 작성일{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
      <PostContent htmlContent={post.content} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${serverUrl}board/posts/${id}`);
  const post = await res.json();

  return { props: { post } };
}

function PostContent({ htmlContent }) {
  const cleanHtmlContent = DOMPurify.sanitize(htmlContent);
  return (
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: cleanHtmlContent }}
    />
  );
}
