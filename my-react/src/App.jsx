import { useState, useEffect } from "react";

function App() {
  // タスク一覧
  const [tasks, setTasks] = useState([]);

  // 入力欄
  const [input, setInput] = useState("");

  // タスクを追加
  const addTask = () => {
    // 空文字なら追加しない
    if (input.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
    };

    setTasks([...tasks, newTask]);

    // 入力欄を空にする
    setInput("");
  };

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // タスクを削除
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // tasksが変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        タスク管理アプリ
      </h1>

      {/* 入力欄 */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="タスクを入力してください"
          className="flex-1 rounded border p-2"
        />

        <button
          onClick={addTask}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          追加
        </button>
      </div>

      {/* タスク一覧 */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-3 flex items-center gap-2"
          >
            <span
              className={
                task.done
                  ? "flex-1 text-gray-400 line-through"
                  : "flex-1"
              }
            >
              {task.text}
            </span>

            <button
              onClick={() => toggleTask(task.id)}
              className="rounded bg-green-500 px-3 py-1 text-white"
            >
              {task.done ? "未完了" : "完了"}
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
