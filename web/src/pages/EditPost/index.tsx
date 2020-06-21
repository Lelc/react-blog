import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
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

const EditPost = () => {
  const history = useHistory();

  const { postId } = useParams();

  const [postImage, setPostImage] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [chooseImages, setChooseImages] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    api.get(`posts/${postId}`).then((response) => {
      setPostImage(response.data.image);
      setPostTitle(response.data.title);
      setPostContent(response.data.content);
    });
  }, [postId]);

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

  function handleImagePic(src: string) {
    setPostImage(src);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const image = postImage;
    const title = postTitle;
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
          <input
            type="text"
            name="image"
            value={chooseImages}
            placeholder="Change Image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setChooseImages(e.target.value)
            }
          ></input>
          <div className="imgs-gallery">
            {images.map((image) => (
              <div
                className="pic-image"
                key={image.id}
                onClick={() => handleImagePic(image.urls.regular)}
              >
                <img src={image.urls.regular} alt="" />
              </div>
            ))}
          </div>
          <input
            type="hidden"
            name="image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setPostImage(e.target.value)
            }
          ></input>
          <img src={postImage} alt="" />
          <TextareaAutosize
            name="title"
            value={postTitle}
            placeholder="Title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setPostTitle(e.target.value)
            }
            autoFocus
          />
          <TextareaAutosize
            value={postContent}
            placeholder="Content"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setPostContent(e.target.value)
            }
            minRows={5}
            autoFocus
          />
          <button>Edit</button>
        </form>
      </div>
    </>
  );
};

export default EditPost;
