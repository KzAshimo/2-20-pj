interface Task {
    id: string;
    content: string;
    completed: number;
}

interface TasksProps {
    tasks: Task[];
    toggleCompleted: (id: string, currentCompleted: number) => void;
    deleteTask: (id: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, toggleCompleted, deleteTask }) => {
    return (
        <div className="text-white bg-black text-lg text-center p-4">
            <h1 className="text-3xl font-bold underline">Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center py-2">
                        <span>
                            {task.content} - {task.completed === 0 ? "Incomplete" : "Completed"}
                        </span>
                        <div>
                            <button className="px-2" onClick={() => toggleCompleted(task.id, task.completed)}>○</button>
                            <button className="px-2" onClick={() => deleteTask(task.id)}>×</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
