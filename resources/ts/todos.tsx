import { createRoot } from 'react-dom/client';
import Header from './components/header';

createRoot(document.getElementById('todos')as HTMLElement).render(<Header />);