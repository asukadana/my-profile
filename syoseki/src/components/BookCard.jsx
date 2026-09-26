function BookCard({ book }) {
  return (
    <div className="book-card">
      <h2 className="text-lg font-bold">タイトル：{book.title}</h2>
      <p className="text-gray-500">著者：{book.author}</p>
      <p className="mt-2">Rating: {book.rating}</p>
      <p>Comment: {book.comment}</p>
    </div>
  );
}

export default BookCard;