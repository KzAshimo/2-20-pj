import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Tasks from './components/tasks';

createRoot(document.getElementById('todos')as HTMLElement).render(<Header />);
createRoot(document.getElementById('tasks')as HTMLElement).render(<Tasks />);