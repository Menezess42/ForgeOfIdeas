import { useState } from 'react'
import shelf from './assets/shellf.png'
import anvil from './assets/anvil.png'
import furnace from './assets/furnace.png'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
        <div className="h-screen w-screen flex flex-col">
        {/* TOPO */}
        <header className="h-16 bg-black/40 flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">Forge Of Ideas</h1>
        </header>

        {/* MEIO */}
        <main className="flex-1 flex">
        {/* Estante */}
        <div
        className="flex-1 flex items-center justify-center bg-red-500/60"
        // depois você troca isso por:
        // style={{ backgroundImage: "url('/shelf.png')" }}
        >
        Estante
        </div>

        {/* Bigorna */}
        <div
        className="flex-1 flex items-center justify-center bg-green-500/60"
        // depois:
        // style={{ backgroundImage: "url('/anvil.png')" }}
        >
        Bigorna
        </div>

        {/* Fornalha */}
        <div
        className="flex-1 flex items-center justify-center bg-blue-500/60"
        // depois:
        // style={{ backgroundImage: "url('/furnace.png')" }}
        >
        Fornalha
        </div>
        </main>

        {/* RODAPÉ */}
        <footer className="h-12 bg-black/60 text-white flex items-center justify-center text-sm">
        © 2025 Forge Of Ideas — Contact me
        </footer>
        </div>
        </>
    )
}

export default App
