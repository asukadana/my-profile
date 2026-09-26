import { useState, useEffect } from "react";

function App() {
  const [year, setYear] = useState(2026);
  const [date, setDate] = useState("");
  const [eventText, setEventText] = useState("");

  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = localStorage.getItem("diaries");

    try {
      return savedDiaries ? JSON.parse(savedDiaries) : [];
    } catch {
      return [];
    }
  });

  const [comment, setComment] = useState("");

  // 「今日あったこと」を追加する
  const addEvent = () => {
    if (eventText === "") return;

    if (date === "") return;

    const diaryIndex = diaries.findIndex(
      (diary) => diary.date === date
    );

    // まだその日の日記がない場合
    if (diaryIndex === -1) {
      const newDiary = {
        year: year,
        date: date,
        events: [eventText],
        comment: "",
      };

      setDiaries([...diaries, newDiary]);
    } else {
      // すでにその日の日記がある場合
      const updatedDiaries = [...diaries];

      updatedDiaries[diaryIndex] = {
        ...updatedDiaries[diaryIndex],
        events: [
          ...updatedDiaries[diaryIndex].events,
          eventText,
        ],
      };

      setDiaries(updatedDiaries);
    }

    // 入力欄を空にする
    setEventText("");
  };

  // 「今日の一言」を追加する
  const addComment = () => {
    if (comment === "") return;

    if (date === "") return;

    const diaryIndex = diaries.findIndex(
      (diary) => diary.date === date
    );

    // まだその日の日記がない場合
    if (diaryIndex === -1) {
      const newDiary = {
        year: year,
        date: date,
        events: [],
        comment: comment,
      };

      setDiaries([...diaries, newDiary]);
    } else {
      // すでにその日の日記がある場合
      const updatedDiaries = [...diaries];

      updatedDiaries[diaryIndex] = {
        ...updatedDiaries[diaryIndex],
        comment: comment,
      };

      setDiaries(updatedDiaries);
    }

    // 入力欄を空にする
    setComment("");
  };

  // 今選んでいる日の日記を探す
  const selectedDiary = diaries.find(
    (diary) => diary.date === date
  );

  // diariesが変更されたらlocalStorageに保存する
  useEffect(() => {
    localStorage.setItem(
      "diaries",
      JSON.stringify(diaries)
    );
  }, [diaries]);

  return (
    <div>
      <h1>日記アプリ</h1>

      {/* 年を選ぶ */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2026">2026年</option>
        <option value="2027">2027年</option>
        <option value="2028">2028年</option>
      </select>

      {/* 日付を選ぶ */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* 今日あったこと */}
      <h2>今日あったこと</h2>

      <input
        type="text"
        value={eventText}
        onChange={(e) => setEventText(e.target.value)}
        placeholder="今日あったことを書こう"
      />

      <button onClick={addEvent}>
        追加
      </button>

      {/* 選んだ日の出来事を表示 */}
      {selectedDiary && (
        <div>
          {selectedDiary.events.map((event, index) => (
            <p key={index}>
              ・{event}
            </p>
          ))}
        </div>
      )}

      {/* 今日の一言 */}
      <h2>今日の一言</h2>

      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="今日の一言を書こう"
      />

      <button onClick={addComment}>
        一言を追加
      </button>

      {/* 今日の一言を表示 */}
      {selectedDiary && selectedDiary.comment && (
        <p>
          今日の一言：{selectedDiary.comment}
        </p>
      )}
    </div>
  );
}

export default App;