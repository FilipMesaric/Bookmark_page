import { useState } from "react";
const apiUrl = "https://opengraph.io/api/1.1/site";
const appId = "58858c7bcf07b61e64257391";

export default function BookmarkForm({ bookmarks, setBookmarks }) {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
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
        setIsProcessing(false);
        setUrl("");

        // persist bookmarks to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" disabled={isProcessing}>
        Add
      </button>
    </form>
  );
}
