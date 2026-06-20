import  { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: ""
  });

  const [books, setBooks] = useState([]);

  // Handle Input
  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/books", book);

      alert("Book Added Successfully");

      setBook({
        title: "",
        author: "",
        price: "",
        category: ""
      });

      getBooks();

    } catch (error) {
      console.log(error);
    }
  };

  // Get Books
  const getBooks = async () => {
    const response = await axios.get("http://localhost:5000/books");
    setBooks(response.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container">

      <h1>Book Store Management System</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={book.author}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Book Price"
          value={book.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

      </form>

      <h2>Saved Books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b, index) => (
            <tr key={index}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.price}</td>
              <td>{b.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;