import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import Header from "../../components/Header";

const CreatePost = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });
  const [postContent, setPostContent] = useState<string>("");

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

    await api.post("posts", data);

    alert("Post created!");

    history.push("/");
  }

  return (
    <>
      <Header />
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <span>Title:</span>
          <input type="text" name="title" onChange={handleInputChange}></input>
        </label>
        <label htmlFor="image">
          <span>Image:</span>
          <input type="text" name="image" onChange={handleInputChange}></input>
        </label>
        <label htmlFor="message">
          <span>Content:</span>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setPostContent(e.target.value)
            }
          />
        </label>
        <button>Create</button>
      </form>
    </>
  );
};

export default CreatePost;
