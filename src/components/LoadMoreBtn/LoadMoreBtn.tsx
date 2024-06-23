import React from "react";
import style from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={style.wrapper}>
      <button className={style.loadMoreBtn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
