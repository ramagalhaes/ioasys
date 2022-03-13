import { BookModel, BooksResponse } from "../models/BookModel";
import Api from "./Api";

export default class BookService {
  async fetchBooks(page: number, amount: number): Promise<BooksResponse> {
    try {
      const response = await Api.get(`/books?page=${page}&amount=${amount}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return {} as BooksResponse;
    }
  }

  async fetchBookById(id: string): Promise<BookModel> {
    try {
      const response = await Api.get(`/books/${id}`);
      const data = await response.data;
      return data as BookModel;
    } catch (error) {
      return {} as BookModel;
    }
  }
}
