export const EDIT_BOOKMARK = "EDIT_BOOKMARK ";
export const DELETE_BOOKMARK = "DELETE_BOOKMARK";

const deleteBookmark = (name, state) => {
  const updatedBookmarks = [...state.bookmarks];
  const updatedBookmarkInx = updatedBookmarks.findIndex(
    (item) => item.name === name
  );

  updatedBookmarks.splice(updatedBookmarkInx, 1);
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  if ([...state.bookmarks]?.length === 1) {
    localStorage.clear();
  }
  return { ...state, bookmarks: updatedBookmarks };
};

const updateBookmark = (action, state) => {
  const updatedBookmarks = [...state.bookmarks];
  const updatedBookmarkInx = updatedBookmarks.findIndex(
    (item) => item.name === action.payload.name
  );
  const updatedBookmark = {
    ...updatedBookmarks[updatedBookmarkInx],
  };

  updatedBookmark.name = action.payload.newName;

  updatedBookmark.url = action.payload.newUrl;
  updatedBookmark.timeStamp = new Date().getTime();

  updatedBookmarks[updatedBookmarkInx] = updatedBookmark;
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));

  return { ...state, bookmarks: updatedBookmarks };
};
export const bookmarkReducers = (state, action) => {
  switch (action.type) {
    case EDIT_BOOKMARK:
      return updateBookmark(action, state);
    case DELETE_BOOKMARK:
      return deleteBookmark(action.name, state);
    default:
      return state;
  }
};
