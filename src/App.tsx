import { useEffect, useState } from 'react'
import './App.css'

function Clock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        setInterval(() => {
            const currentDate = new Date()
            const hour = currentDate.getHours().toString().padStart(2, "0");
            const minute = currentDate.getMinutes().toString().padStart(2, "0");
            const second = currentDate.getSeconds().toString().padStart(2, "0");

            setTime(`${hour}:${minute}:${second}`);
        }, 10);
    })

    return (
        <p>{time}</p>
    )
}

function CurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()

    return (
        <p>{`${year}/${month}/${day}`}</p>
    )
}

function App() {
    const [searchText, setSearchText] = useState("");

    return (
        <main className="p-8 text-white font-mono">
            <header className="flex justify-between text-2xl">
                <Clock />
                <CurrentDate />
            </header>
            <input
                name="searchText"
                type="text"
                className="h-10 w-[350px] md:w-[400px] lg:w-[500px] rounded-xl border border-neutral-700 bg-neutral-800 shadow-md px-3 py-1 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 mt-8 relative"
                onChange={e => setSearchText(e.target.value)}
            />
        </main>
    )
}

export default App
