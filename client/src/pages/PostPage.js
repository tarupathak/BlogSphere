import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';

const PostPage = () => {
    const [postInfo,setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    useEffect(() => {
      fetch(`http://localhost:8080/post/${id}`)
        .then(response => {
          response.json().then(postInfo => {
            setPostInfo(postInfo);
          });
        });
    }, []);
  
    if (!postInfo) return '';

  if (!postInfo) return "";
  return (
    <div>
      <img src={`http://localhost:8080/${postInfo.cover}`} alt="postimg" />
    </div>
  );
};

export default PostPage;
