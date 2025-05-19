import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddNote/>} />
      <Route path="/edit/:id" element={<EditNote/>} />
    </Routes>
  );
}

export default App;