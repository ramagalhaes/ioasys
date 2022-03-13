import React from "react";
import "./Book.scss";
import Logo from "../../assets/images/Book 1.png";

type BookProps = {
  imageUrl: string;
  author: string;
  title: string;
  pages: string;
  publisher: string;
  publishedAt: string;
  onClick: any;
};

const Book: React.FC<BookProps> = ({
  imageUrl,
  author,
  title,
  pages,
  publisher,
  publishedAt,
  onClick,
}) => {
  return (
    <div className="book-container" onClick={onClick}>
      <img src={imageUrl} alt="" />
      <div className="info-container">
        <div className="title">
          <h2>{title}</h2>
          <h3>{author}</h3>
        </div>
        <div className="aditional-info">
          <p>{pages} páginas</p>
          <p>{publisher}</p>
          <p>Publicado em {publishedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
