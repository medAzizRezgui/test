import React, { useContext, useState } from "react";
import styles from "../styles/styles.module.css";
import Modal from "./Modal";
import BookmarksContext from "../context/bookmarks-context";

function Bookmarks() {
  const { bookmarks } = useContext(BookmarksContext);

  const [modal, setModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  const [idx, setIdx] = useState(null);

  const handleOpenModal = (item) => {
    setModal(true);
    setSelectedItem(item);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookmarks}>
        {bookmarks
          ?.sort((a, b) => a.timeStamp - b.timeStamp)
          ?.map((item, i) => (
            <div
              key={item.name}
              className={styles.bookmark}
              onMouseEnter={() => setIdx(i)}
              onMouseLeave={() => setIdx(null)}
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div
                className={idx === i ? styles.dots : styles.dots_hide}
                onClick={() => handleOpenModal(item)}
              >
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <a
                href={item.url}
                style={{ textDecoration: "none", color: "black" }}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.image}
                  src={`https://icon.horse/icon/${new URL(
                    item?.url
                  ).hostname.replace("www.", "")}`}
                  alt=""
                />
                <h4>{item.name}</h4>
              </a>
            </div>
          ))}
      </div>
      <Modal modal={modal} setModal={setModal} item={selectedItem} />
    </div>
  );
}

export default Bookmarks;
