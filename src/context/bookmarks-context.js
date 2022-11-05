import React from "react";

export default React.createContext({
  bookmarks: [],
  updateBookmark: () => {},
  deleteBookmark: () => {},
});
