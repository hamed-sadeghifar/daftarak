import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BlogPost.css";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  console.log(slug);
  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${slug}`)
      .then((res) => res.json())
      .then(setPost);
  }, [slug]);
  if (!post) return null;

  return (
    <div className="blogpost-container">
      <img
        src={
          post.cover?.startsWith("http")
            ? post.cover
            : `http://localhost:5000${post.cover}`
        }
        alt={post.title}
      />
      <h1>{post.title}</h1>
      <span>منبع: {post.source}</span>
      <p>{post.content}</p>
    </div>
  );
}
