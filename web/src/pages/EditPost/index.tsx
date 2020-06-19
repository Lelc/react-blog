import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import api from "../../services/api";

import Header from "../../components/Header";

const EditPost = () => {
  const history = useHistory();

  const { postId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });
  const [postContent, setPostContent] = useState<string>("");

  useEffect(() => {
    api.get(`posts/${postId}`).then((response) => {
      setFormData({ title: response.data.title, image: response.data.image });
      setPostContent(response.data.content);
      console.log(response.data.content);
    });
  }, [postId]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { title, image } = formData;
    const content = postContent;

    const data = {
      title,
      image,
      content,
    };

    await api.put(`posts/${postId}`, data);

    alert("Post edited!");

    history.push("/");
  }

  return (
    <>
      <Header />
      <div className="container">
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            <span>Title:</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            ></input>
          </label>
          <label htmlFor="image">
            <span>Image:</span>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            ></input>
          </label>
          <label htmlFor="message">
            <span>Content:</span>
            <textarea
              value={postContent}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                setPostContent(e.target.value)
              }
            />
          </label>
          <button>Edit</button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
