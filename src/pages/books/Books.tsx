import React, { useContext, useEffect, useState } from "react";
import "./books.scss";
import Logo from "../../assets/images/LogoDark.png";
import Book from "../../components/book/Book";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { BookModel } from "../../models/BookModel";
import BookService from "../../services/BookService";
import Quotes from "../../assets/images/Quotes.png";
import Chevron from "../../assets/images/chevron.png";

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookModel[]>();
  const [book, setBook] = useState<BookModel>();
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { signOut, userData } = useContext(AuthContext);
  const bookService = new BookService();

  async function fetchBooks(pageIndex: number): Promise<void> {
    const response = await bookService.fetchBooks(pageIndex, 12);
    const page = response.page;
    let pages = response.totalPages;
    pages = Math.ceil(pages);
    setCurrentPage(page);
    setTotalPages(pages);
    setBooks(response.data);
  }

  async function fetchBookById(id: string): Promise<void> {
    const response = await bookService.fetchBookById(id);
    setBook(response);
  }

  function openModal(): void {
    setShowModal(true);
  }

  function closeModal(): void {
    setShowModal(false);
  }

  function performSignOut(): void {
    signOut();
    navigate("/login");
  }

  useEffect(() => {
    fetchBooks(1);
  }, []);

  return (
    <>
      <div className="grid">
        <header className="header">
          <div className="logo-container">
            <img src={Logo} alt="ioasys logo" />
            <h1>Books</h1>
          </div>
          <nav className="nav-menu">
            <p>
              Bem vindo, <b>{userData.name} !</b>
            </p>
            <button className="action-btn" onClick={performSignOut}>
              X
            </button>
          </nav>
        </header>
        <main>
          <section className="content-container">
            {books?.map((item) => (
              <Book
                key={item.id}
                author={item?.authors.join(", ")}
                title={item.title}
                imageUrl={item.imageUrl}
                pages={item.pageCount}
                publishedAt={item.published}
                publisher={item.publisher}
                onClick={async () => {
                  await fetchBookById(item.id);
                  openModal();
                }}
              />
            ))}
          </section>
          <div className="page-navigation">
            <p>
              Página <b>{currentPage}</b> de <b>{totalPages}</b>
            </p>
            <button
              className="action-btn nav-btn left"
              onClick={() => {
                fetchBooks(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              <img src={Chevron} alt="voltar pagina" />
            </button>
            <button
              className="action-btn nav-btn"
              onClick={() => {
                fetchBooks(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
            >
              <img src={Chevron} alt="voltar pagina" />
            </button>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {showModal === true ? (
        <section className="modal-bg">
          <button className="action-btn close-btn" onClick={closeModal}>
            X
          </button>
          <div className="modal-container">
            <div className="modal">
              <img src={book?.imageUrl} alt="Capa do livro" />
              <div className="book-details">
                <div className="book-title">
                  <h1>{book?.title}</h1>
                  <h3>{book?.authors.join(", ")}</h3>
                </div>
                <div className="book-info">
                  <div>
                    <p>INFORMAÇÕES</p>
                  </div>
                  <div className="info-details">
                    <div className="info-keys">
                      <p>Páginas</p>
                      <p>Editora</p>
                      <p>Publicaçāo</p>
                      <p>Idioma</p>
                      <p>Título original</p>
                      <p>ISBN-10</p>
                      <p>ISBN-13</p>
                    </div>
                    <div className="info-values">
                      <p>{book?.pageCount} páginas</p>
                      <p>{book?.publisher}</p>
                      <p>{book?.published}</p>
                      <p>{book?.language}</p>
                      <p>{book?.title}</p>
                      <p>{book?.isbn10}</p>
                      <p>{book?.isbn13}</p>
                    </div>
                  </div>
                  <div className="sinopse-container">
                    <p>RESENHA DA EDITORA</p>
                    <div className="sinopse-text">
                      <p>
                        <img src={Quotes} alt="Aspas" />
                        {book?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Books;
