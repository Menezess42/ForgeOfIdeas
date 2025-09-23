import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Shelf from './components/Shelf.jsx'

function App() {

  return (
      <>
      <div className="flex flex-col min-h-screen">
      {/* Topo */}
      <header className="bg-gray-800 text-white p-4 text-center text-xl font-bold">
      Forge Of Ideas
      </header>

      {/* Meio */}
      <main className="flex flex-1">
      {/* Estante */}
      <Shelf />

      {/* Bigorna */}
      {/* <Anvil /> */}

      {/* Forja */}
      {/* <Forge /> */}
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white p-4 text-center">
      Contact me | About | etc
      </footer>
      </div>
      </>
  )
}

export default App
