import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Header from "../../components/Header";
import Post from "../../components/Post";

interface Post {
  id: string;
  title: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("posts").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);

  async function handleButtonDelete(id: string) {
    await api.delete("posts", { data: { id: id } });

    let filtered = posts.filter((post) => post.id !== id && post);

    setPosts(filtered);
  }

  return (
    <>
      <Header />
      <div className="container">
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <section key={post.id}>
              <Post key={post.id} post={post} />
              <div className="btns">
                <Link to={`/edit-post/${post.id}`}>Edit</Link>
                <button onClick={() => handleButtonDelete(post.id)}>
                  Delete
                </button>
              </div>
            </section>
          ))}
      </div>
    </>
  );
};

export default Home;
