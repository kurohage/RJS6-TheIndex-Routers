import React, { Component } from "react";

// Components
//import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import BookRow from "./BookRow";

class BookList extends Component {
  state = {
    filteredBooks: this.props.books
  };

  filterBooks = query => {
    let condition;
    if (this.props.match.params.bookColor === undefined) condition = "title";
    else condition = "color";

    let filteredBooks = this.props.books.filter(book =>
      `${book.title}`.toLowerCase().includes(query.toLowerCase())
    );

    this.setState({ filteredBooks: filteredBooks });
  };

  filterBooksByColor = () => {
    let query = this.props.match.params.bookColor.toLowerCase();
    console.log("Query for books: ", query);
    let books = this.props.books.filter(book =>
      book.color.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredBooks: books });
  };

  render() {
    let bookCards = [];

    if (this.props.match.params.bookColor === undefined) {
      bookCards = this.state.filteredBooks.map(book => (
        <BookRow key={book.id} book={book} authors={book.authors} />
      ));
    } else {
      bookCards = this.state.filteredBooks.filter(book =>
        (book.color == this.props.match.params.bookColor).map(book => {
          return <BookRow key={book.id} book={book} authors={book.authors} />;
        })
      );
    }

    return (
      <div>
        <h3>Book List</h3>
        <SearchBar onChange={this.filterBooks} />
        <table className="mt-3 table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Authors</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>{bookCards}</tbody>
        </table>
      </div>
    );
  }
}

export default BookList;
