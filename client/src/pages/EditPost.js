import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("id", id);
    if (file) {
      formData.append("file", file);
    }
    try {
      const response = await fetch(`http://localhost:8080/post/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        console.error("Failed to update post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFile(ev.target.files[0])} />
      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: "5px" }}>
        Update post
      </button>
    </form>
  );
}
