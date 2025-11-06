export type Book = {
  id: string;
  title: string;
  author: string;
};

export type AddBook = {
  title: string;
  author: string;
};

export type DeleteBook = {
  id: string;
};
