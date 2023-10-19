import { useEffect, useState } from "react";
import "./styles.css";

const apiUrl = "https://opengraph.io/api/1.1/site";
const appId = "58858c7bcf07b61e64257391";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");

  // on mount, go getbookmarks out of localStorage
  useEffect(() => {
    const lsBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(lsBookmarks);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const encodedUrl = encodeURIComponent(url);

    // fetch a url from the opengraph.io api
    fetch(`${apiUrl}/${encodedUrl}?app_id=${appId}`)
      .then((res) => res.json())
      .then((data) => {
        const newBookmark = {
          title: data.hybridGraph.title,
          image: data.hybridGraph.image,
          url: data.hybridGraph.url,
        };

        const newBookmarks = [...bookmarks, newBookmark];

        // add a bookmark to our bookmarks state variable
        setBookmarks(newBookmarks);

        // persist bookmarks to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      });
  }

  return (
    <>
      {/* bookmarks form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* bookmarks list */}
      <div id="container">
        {bookmarks.map((bookmark, index) => (
          <a
            key={index}
            href={bookmark.url}
            className="bookmark"
            target="_blank"
            rel="noreferrer"
          >
            <img src={bookmark.image} alt="bookmark title" />
            <span>{bookmark.title}</span>
          </a>
        ))}
      </div>
    </>
  );
}
