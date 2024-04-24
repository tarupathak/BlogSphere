import React from "react";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="flex items-start justify-between mt-8 border border-gray-300 rounded-lg p-4 mb-12">
      <div className="h-1/3 w-[30%]">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:8080/" + cover} alt="image" />
        </Link>
      </div>
      <div>
        <Link to={`/post/${_id}`}>
          <div className="text-2xl font-bold">{title}</div>
        </Link>
        <p className="flex gap-4 text-xs font-bold text-[grey]">
          <a className="">{author}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
