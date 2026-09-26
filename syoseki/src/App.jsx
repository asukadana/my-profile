import BookCard from "./components/BookCard";

const books = [
  {id:1, title: "凍りのくじら", author: "辻村深月", rating: 5.0, comment: "名著！"},
  {id:2, title: "素敵な日本人", author: "東野圭吾", rating: 5.0, comment: "面白い！"},
  {id:3, title: "ドラえもん", author: "藤子・F・不二雄", rating: 5.0, comment: "懐かしい！"},
];

function App(){
  return (
    <div>
      <h1>書籍紹介ページ</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;