import './App.css'
import Index from './Index.tsx'
import Devlog from './Devlog.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPanel from './AdminPanel.tsx'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/devlog" element={<Devlog/>} />
        <Route path="/admin-panel" element={<AdminPanel/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
