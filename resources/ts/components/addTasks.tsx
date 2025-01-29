import { useState } from "react";

interface Task {
    id: string;
    content: string;
    completed: number;
}

interface AddTasksProps {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTasks: React.FC<AddTasksProps> = ({ setTasks }) => {
    const [newTask, setNewTask] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddTask = async () => {
        if (!newTask.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://127.0.0.1/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newTask }),
            });

            if (!response.ok) throw new Error("Failed to create new task.");

            const data = await response.json();
            setTasks((prevTasks) => [...prevTasks, data.todo]);
            setNewTask(""); // 入力フィールドをクリア
        } catch (error) {
            console.error("Error creating task:", error);
            setError("Failed to create task. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
                disabled={isLoading}
            >
                {isLoading ? "Adding..." : "Add Task"}
            </button>
        </div>
    );
};

export default AddTasks;
