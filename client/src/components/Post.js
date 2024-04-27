import React from "react";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="grid grid-cols-6 items-start gap-6 mt-8 border border-gray-300 rounded-lg p-4 mb-12">
  <div className="h-auto col-span-1 w-40">
    <Link to={`/post/${_id}`}>
      <img src={"http://localhost:8080/" + cover} alt="image" />
    </Link>
  </div>
  <div className="grid col-span-5  gap-4">
    <Link to={`/post/${_id}`}>
      <div className="text-2xl font-bold">{title}</div>
    </Link>
    <p className="text-xs font-bold text-gray">
      {/* <a className="">{author}</a> */}
      <time>{formatISO9075(new Date(createdAt))}</time>
    </p>
    <p>{summary}</p>
  </div>
</div>


  );
};

export default Post;
