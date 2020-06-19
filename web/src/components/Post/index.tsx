import React from "react";

interface Props {
  post: {
    id: string;
    title: string;
    image: string;
    content: string;
  };
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <>
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <div>{post.content}</div>
    </>
  );
};

export default Post;
