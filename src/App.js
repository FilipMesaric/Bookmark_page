import { useEffect, useState } from "react";
import "./styles.css";
import BookmarkList from "./components/BookmarkList";
import BookmarkForm from "./components/BookmarkForm";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // on mount, go get bookmarks out of localStorage
  useEffect(() => {
    const lsBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(lsBookmarks);
  }, []);

  function removeBookmark(e, url) {
    e.preventDefault();
    const filtered = bookmarks.filter((bookmark) => {
      return bookmarks.url !== url;
    });

    setBookmarks(filtered);
  }

  return (
    <>
      <BookmarkForm bookmarks={bookmarks} setBookmarks={setBookmarks} />

      <div id="container">
        <BookmarkList bookmarks={bookmarks} remove={removeBookmark} />
      </div>
    </>
  );
}
