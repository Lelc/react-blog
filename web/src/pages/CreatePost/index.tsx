import React, { useState, useEffect, MouseEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
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

const CreatePost = () => {
  const history = useHistory();

  const [postImage, setPostImage] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chooseImages, setChooseImages] = useState("");
  const [chosenImage, setChosenImage] = useState("");
  const [loadMore, setLoadMore] = useState(1);
  const [loadMoreLimit, setloadMoreLimit] = useState(0);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&orientation=landscape&query=${chooseImages}&client_id=${apikey.unsplash}`
      )
      .then((response) => {
        console.log(response.data.results);
        setloadMoreLimit(response.data.total_pages);
        setImages(response.data.results);
      });
  }, [chooseImages]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=${loadMore}&orientation=landscape&query=${chooseImages}&client_id=${apikey.unsplash}`
      )
      .then((response) => {
        console.log(response.data);
        setImages(images.concat(response.data.results));
      });
  }, [loadMore]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    setChooseImages(searchQuery);
  }

  function handleImagePic(src: string) {
    setChosenImage(src);
    setPostImage(src);
  }

  function handleLoadMore(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    loadMoreLimit > loadMore && setLoadMore(loadMore + 1);
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

    await api.post("posts", data);

    alert("Post created!");

    history.push("/");
  }

  return (
    <>
      <Header />
      <div className="container">
        <h1>Create Post</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            name="image"
            placeholder="Search for an image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchQuery(e.target.value)
            }
          ></input>
          <button>Search</button>
        </form>
        <form onSubmit={handleSubmit}>
          <div className="imgs-gallery">
            {images.map((image) => (
              <div
                className={`pic-image ${
                  image.urls.regular === chosenImage ? "picked" : ""
                }`}
                key={image.id}
                onClick={() => handleImagePic(image.urls.regular)}
              >
                <img src={image.urls.regular} alt="" />
              </div>
            ))}
          </div>
          {loadMoreLimit > loadMore && (
            <a className="load-more" href="#" onClick={handleLoadMore}>
              Load More
            </a>
          )}
          <img src={postImage} alt="" />
          <TextareaAutosize
            name="title"
            placeholder="Title"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setPostTitle(e.target.value)
            }
            autoFocus
          />
          <TextareaAutosize
            placeholder="Content"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
              setPostContent(e.target.value)
            }
            minRows={5}
            autoFocus
          />
          <button>Create</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
