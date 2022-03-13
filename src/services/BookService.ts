import { BookModel, BooksResponse } from "../models/BookModel";
import Api from "./Api";
import { refreshToken } from "./AuthContext";

export default class BookService {
  async fetchBooks(page: number, amount: number): Promise<BooksResponse> {
    try {
      const response = await Api.get(`/books?page=${page}&amount=${amount}`, {
        "axios-retry": { retries: 2, retryDelay: () => 500 }
      });
      const data = await response.data;
      return data;
    } catch (error) {
      await refreshToken();
      throw new Error("API call failed");
    }
  }

  async fetchBookById(id: string): Promise<BookModel> {
    try {
      const response = await Api.get(`/books/${id}`, {
        "axios-retry": { retries: 2 }
      });
      const data = await response.data;
      return data as BookModel;
    } catch (error) {
      await refreshToken();
      throw new Error("API call failed");
    }
  }
}
