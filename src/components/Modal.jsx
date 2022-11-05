import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/styles.module.css";
import BookmarksContext from "../context/bookmarks-context";

function Modal({ modal, setModal, item }) {
  const { deleteBookmark, updateBookmark } = useContext(BookmarksContext);

  const [name, setName] = useState(item.name);
  const [url, setUrl] = useState(item.url);
  const payload = {
    name: item.name,
    newName: name || item.name,
    newUrl: url || item.url,
  };
  const handleClose = () => {
    setName("");
    setUrl("");
    setModal(false);
  };
  const handleDelete = (n) => {
    deleteBookmark(n);
    handleClose();
  };
  const handleUpdate = () => {
    updateBookmark(payload);
    handleClose();
  };

  useEffect(
    () =>
      function Close() {
        setName("");
        setUrl("");
      },
    []
  );

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={modal ? styles.overlay : styles.close}
        onClick={() => handleClose()}
      />
      <div className={modal ? styles.modal : styles.close}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            defaultValue={item.name}
          />
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            className={styles.input}
            defaultValue={item.url}
          />
        </div>
        <div className={styles.cta}>
          <button type="button" onClick={() => handleDelete(item.name)}>
            Remove
          </button>

          <div>
            <button type="button" onClick={() => handleClose()}>
              Cancel
            </button>
            <button type="button" onClick={() => handleUpdate()}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
Modal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    timeStamp: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
};
export default Modal;
