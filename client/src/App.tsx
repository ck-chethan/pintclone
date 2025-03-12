import './App.css'
import React from 'react'
import TopBar from './components/topBar/TopBar'
import Gallery from './components/gallery/Gallery'
import LeftBar from './components/leftBar/LeftBar'

const App: React.FC = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>
  )
}

export default App
