import { useEffect, useState } from "react";
import "../../css/app.css";

interface Task {
    id: string;
    content: string;
    completed: number;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // indx
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://127.0.0.1/api/tasks");
                if (!response.ok) {
                    throw new Error("error fetch tasks");
                }
                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("error fetch tasks", error);
            }
        };
        fetchTasks();
    }, []);

    console.log(tasks);

    // update
    const toggleCompleted = async (id: string, currentCompleted: number) => {
        try {
            const response = await fetch(`http://127.0.0.1/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: currentCompleted === 0 ? 1 : 0,
                }),
            });

            if (!response.ok) {
                throw new Error("update error");
            }

            const updatedTask: { todo: Task } = await response.json();

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id
                        ? { ...task, completed: updatedTask.todo.completed }
                        : task
                )
            );
        } catch (error) {
            console.error("Error update task", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold underline">tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>
                            {task.content} -{" "}
                            {task.completed === 0 ? "Incomplete" : "Completed"}
                        </span>
                        <button
                            onClick={() =>
                                toggleCompleted(task.id, task.completed)
                            }
                        >
                            ○
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
