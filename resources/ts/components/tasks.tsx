import { useEffect, useState } from "react";


const Tasks = () => {
    const [tasks,setTasks] = useState([]);
    useEffect(() => {
        const fetchTasks = async() =>{
            try{
                const response = await fetch('http://127.0.0.1/api/tasks');
                if(!response.ok){
                    throw new Error('error fetch tasks');
                }
                const data = await response.json();

                const taskArray = data.map((task:{content:string,completed:number}) => ({
                    content: task.content,
                    completed:task.completed
                }));
                setTasks(taskArray);
            }catch(error){
                console.error('error fetch tasks',error);
            }
        };
        fetchTasks();
    }, []);

    console.log(tasks);

    return(
        <div>
            <h1>tasks</h1>
            <ul>
                {tasks.map((task,index)=>{
                    return(
                    <li key={index}>
                        {task.content} - {task.completed === 0 ? "Incomplete" : "Completed"}
                    </li>);
                })}
            </ul>
        </div>
    );
}

export default Tasks;