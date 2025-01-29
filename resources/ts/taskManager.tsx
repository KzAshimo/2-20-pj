import { useState, useEffect } from "react";
import AddTasks from "./components/addTasks";
import Tasks from "./components/tasks";

interface Task {
    id: string;
    content: string;
    completed: number;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // index
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://127.0.0.1/api/tasks");
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks.");
                }
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // update
    const toggleCompleted = async (id: string, currentCompleted: number) => {
        try {
            const response = await fetch(`http://127.0.0.1/api/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: currentCompleted === 0 ? 1 : 0 }),
            });

            if (!response.ok) throw new Error("Failed to update task.");

            const updatedTask: { todo: Task } = await response.json();

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, completed: updatedTask.todo.completed } : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // delete
    const deleteTask = async (id: string) => {
        try {
            const response = await fetch(`http://127.0.0.1/api/tasks/${id}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Failed to delete task.");

            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <AddTasks setTasks={setTasks} />
            <Tasks tasks={tasks} toggleCompleted={toggleCompleted} deleteTask={deleteTask} />
        </div>
    );
};

export default TaskManager;
