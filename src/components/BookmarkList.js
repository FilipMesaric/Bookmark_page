export default function BookmarkList({ bookmarks, remove }) {
  return (
    <>
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

          <button class="close" onClick={(e) => remove(e, bookmarks.url)}>
            X
          </button>
        </a>
      ))}
    </>
  );
}
