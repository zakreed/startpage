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

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [isSearchSelected, setIsSearchSelected] = useState(true)
    const isDropdownVisible = false;

    return (
        <div className="mt-32 flex flex-col justify-center items-center">
            <p className="text-sm text-neutral-700">Where do you want to go?</p>
            <input
                name="searchText"
                type="text"
                autoFocus
                className={`h-10 w-[350px] md:w-[400px] lg:w-[500px] rounded-x-xl rounded-t-xl border border-neutral-700 bg-neutral-800 shadow-md px-3 py-1 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 mt-8 relative ${!isDropdownVisible ? "rounded-b-xl" : ""}`}
                onChange={e => setSearchText(e.target.value)}
            />
            <div className={`absolute w-[350px] md:w-[400px] lg:w-[500px] bg-neutral-800 border-x border-b border-neutral-700 shadow-xl rounded-b-lg rounded-x-lg p-4 text-sm mt-[125px] ${isDropdownVisible ? "block" : "hidden"}`}>
            </div>
        </div>
    )
}

function App() {
    return (
        <main className="p-8 text-white font-mono">
            <header className="flex justify-between text-2xl">
                <Clock />
                <CurrentDate />
            </header>
            <SearchBar />
        </main>
    )
}

export default App
