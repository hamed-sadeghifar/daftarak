import { useEffect, useState } from "react";
import "./Blog.css";

const API_URL = "http://localhost:5000/api/blogs";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <section id="blog">
      <div className="blog-list">
        {posts.map((post) => (
          <div
            key={post._id}
            className="blog-card"
            onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
          >
            <img
              src={
                post.cover?.startsWith("http")
                  ? post.cover
                  : `http://localhost:5000${post.cover}`
              }
              alt={post.title}
            />
            <div className="blog-info">
              <h3>{post.title}</h3>
              <span>{post.source}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
