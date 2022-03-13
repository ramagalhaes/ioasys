export type BookModel = {
    authors: string;
    category: string;
    description: string;
    id: string;
    imageUrl: string;
    isbn10: string;
    isbn13: string;
    language: string;
    pageCount: string;
    publisher: string;
    published: string;
    title: string;
}

export type BooksResponse = {
    data: BookModel[];
    page: number;
    totalItems: number;
    totalPages: number;
}