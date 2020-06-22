import React from "react";

interface Props {
  post: {
    id: string;
    title: string;
    image: string;
    content: string;
    created_at: string;
    updated_at: string;
  };
}

function formatDate(date: string) {
  let formatedDate = new Date(date);
  let year = formatedDate.getFullYear();
  let rawMonth = formatedDate.getMonth();
  let month = rawMonth < 10 ? "0" + rawMonth : rawMonth;
  let rawDay = formatedDate.getDay();
  let day = rawDay < 10 ? "0" + rawDay : rawDay;
  let rawHours = formatedDate.getHours();
  let hours = rawHours < 10 ? "0" + rawHours : rawHours;
  let rawMinutes = formatedDate.getMinutes();
  let minutes = rawMinutes < 10 ? "0" + rawMinutes : rawMinutes;

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <>
      <img src={post.image} alt={post.title} />
      <div className="date">
        <span>created at: {formatDate(post.created_at)}</span>
        {post.created_at !== post.updated_at && (
          <span>updated at: {formatDate(post.updated_at)}</span>
        )}
      </div>
      <h3>{post.title}</h3>
      <div>{post.content}</div>
    </>
  );
};

export default Post;
