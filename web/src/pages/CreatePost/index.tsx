import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import axios from "axios";

import Header from "../../components/Header";
import apikey from "../../apikey";

interface Image {
  id: number;
  urls: {
    regular: string;
  };
}

const CreatePost = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });
  const [postContent, setPostContent] = useState<string>("");
  const [chooseImages, setChooseImages] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&orientation=landscape&query=${chooseImages}&client_id=${apikey.unsplash}`
      )
      .then((response) => {
        console.log(response.data.results);
        setImages(response.data.results);
      });
  }, [chooseImages]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleImagePic(src: string) {
    setFormData({ ...formData, image: src });
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
      <div className="container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            <span>Title:</span>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
            ></input>
          </label>
          <label htmlFor="image">
            <span>Image:</span>
            <input
              type="text"
              name="image"
              value={chooseImages}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setChooseImages(e.target.value)
              }
            ></input>
          </label>
          <div className="imgs-gallery">
            {images.map((image) => (
              <div
                className="pic-image"
                key={image.id}
                onClick={() => handleImagePic(image.urls.regular)}
              >
                <img src={image.urls.regular} />
              </div>
            ))}
          </div>
          <input
            type="hidden"
            name="image"
            onChange={handleInputChange}
          ></input>
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
      </div>
    </>
  );
};

export default CreatePost;
