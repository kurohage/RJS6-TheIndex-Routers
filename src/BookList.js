import React, { Component } from "react";

// Components
//import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import BookRow from "./BookRow";

export default class BookList extends Component {
  state = {
    filteredBooks: this.props.books
  };

  filterBooks = query => {
    let filteredBooks = this.props.books.filter(book =>
      `${book.title}`.toLowerCase().includes(query.toLowerCase())
    );

    this.setState({ filteredBooks: filteredBooks });
  };

  render() {
    let bookCards = [];

    if (this.props.match.params.bookColor === undefined) {
      bookCards = this.state.filteredBooks.map(book => (
        <BookRow key={book.id} book={book} authors={book.authors} />
      ));
    } else {
      bookCards = this.state.filteredBooks.map(book =>
        book.color === this.props.match.params.bookColor ? (
          <BookRow key={book.id} book={book} authors={book.authors} />
        ) : (
          false
        )
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
