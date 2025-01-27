import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Tasks from './components/tasks';
import '../css/app.css';
import AddTasks from './components/addTasks';

createRoot(document.getElementById('todos')as HTMLElement).render(<Header />);
createRoot(document.getElementById('addTasks')as HTMLElement).render(<AddTasks />);
createRoot(document.getElementById('tasks')as HTMLElement).render(<Tasks />);