import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";

  return (
    <div className="">
      <div className="flex flex-col justify-around p-6">
        <h1 className="text-2xl text-center font-bold mb-4">
          {postInfo.title}
        </h1>
        <time className="text-gray-600 flex flex-col items-center">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        {/* <div className="author">by @{postInfo.author.username}</div> */}
        <div className="flex flex-col items-center justify-around">
          {userInfo.id === postInfo.author._id && (
            <div className="mt-4">
              <Link
                className="group relative w-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                to={`/edit/${postInfo._id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <span>Edit this post</span>
              </Link>
            </div>
          )}
          <div className="mt-4">
            <img
              src={`http://localhost:8080/${postInfo.cover}`}
              alt="cover image"
              className="w-full max-w-md h-auto rounded-md"
            />
          </div>
          <div className="mt-4 max-w-full overflow-x-auto">
  <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
</div>

        </div>
      </div>
    </div>
  );
}
