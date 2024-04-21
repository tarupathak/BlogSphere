import React from "react";
import { formatISO9075 } from "date-fns";

const Post = ({ title, summary, cover, content, createdAt,author }) => {
  return (
    <div className="flex items-start justify-between mt-8 border border-gray-300 rounded-lg p-4 mb-12">
      <div className="h-[100%] w-[80%]">
        <img
          src="https://miro.medium.com/v2/resize:fit:408/format:webp/1*eGA1BzYF6ETCn6wO09Gm-A.png"
          alt="image"
        />
      </div>
      <div>
        <div className="text-2xl font-bold">{title}</div>
        <p className="flex gap-4 text-xs font-bold text-[grey]">
          <div className="">{author}</div>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
