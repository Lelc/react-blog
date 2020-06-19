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
      <h3>{post.title}</h3>
      <p>{post.image}</p>
      <div>{post.content}</div>
    </>
  );
};

export default Post;
