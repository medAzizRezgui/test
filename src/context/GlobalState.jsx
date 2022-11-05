import React, { useEffect, useReducer, useState } from "react";

import PropTypes from "prop-types";
import BookmarksContext from "./bookmarks-context";
import { DELETE_BOOKMARK, bookmarkReducers, EDIT_BOOKMARK } from "./reducers";

function GlobalState({ children }) {
  const InitialState = [
    {
      name: "Slice",
      url: "https://www.addslice.com",
      timeStamp: new Date().getTime(),
    },
    {
      name: "Google",
      url: "https://www.google.com",
      timeStamp: new Date().getTime(),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      timeStamp: new Date().getTime(),
    },
  ];
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || InitialState
  );
  useEffect(() => {
    const setBookMarksToLs = () => {
      if (localStorage.getItem("bookmarks") === null) {
        localStorage.setItem("bookmarks", JSON.stringify(InitialState));
        setItems(InitialState);
      }
    };
    setBookMarksToLs();
  }, []);
  const [bookmarksState, dispatch] = useReducer(bookmarkReducers, {
    bookmarks: items,
  });

  const updateBookmark = (payload) => {
    dispatch({
      type: EDIT_BOOKMARK,
      payload,
    });
  };

  const deleteBookmark = (name) => {
    dispatch({ type: DELETE_BOOKMARK, name });
  };

  const values = React.useMemo(
    () => ({
      bookmarks: bookmarksState.bookmarks,
      updateBookmark,
      deleteBookmark,
    }),
    [bookmarksState.bookmarks]
  );
  return (
    <BookmarksContext.Provider value={values}>
      {children}
    </BookmarksContext.Provider>
  );
}
GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};
export default GlobalState;
