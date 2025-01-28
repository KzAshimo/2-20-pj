import React, { useState } from "react";

const AddTasks = () => {
    const [newTask, setNewTask] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [tasks, setTasks] = useState<any[]>([]); // 新しいタスクを追加するために必要なステート

    const handleAddTask = async () => {
        if (!newTask.trim()) return; // 空白タスクを送信しないようにする

        setIsLoading(true);
        setError(null); // リセットエラー

        try {
            const response = await fetch("http://127.0.0.1/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newTask }),
            });

            if (!response.ok) {
                throw new Error("Failed to create new task.");
            }

            const data = await response.json();

            // 新しいタスクを追加
            setTasks((prevTasks) => [...prevTasks, data.todo]);
            setNewTask(""); // 入力フィールドをクリア

        } catch (error) {
            console.error("Error creating task:", error);
            setError("Failed to create task. Please try again.");
        } finally {
           return setIsLoading(false); // リクエスト後にボタンを再度有効にする
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* エラーメッセージ */}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter task content"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                />
            </div>

            <button
                onClick={handleAddTask}
                className="bg-black text-white px-4 py-2 rounded my-2 disabled:bg-gray-400"
                disabled={isLoading} // ローディング中はボタンを無効にする
            >
                {isLoading ? "Adding..." : "Add Task"}
            </button>
        </div>
    );
};

export default AddTasks;
