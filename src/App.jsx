import Characters from "./components/Characters"
import './index.css'

import CharacterDetails from './components/CharacterDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  )
}

export default App
