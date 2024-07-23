import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components';
import { BaseRoutes } from './routes/BaseRoutes';

function App() {
  return (
    <Router basename="/photo-editor-app/">
      <Navbar />
      <main>
        <BaseRoutes />
      </main>
    </Router>
  );
}

export default App;
