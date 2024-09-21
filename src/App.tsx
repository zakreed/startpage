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

function DropdownItem({ type, text, website, index, selected }) {
    let displayText = ""
    if (type == "search") {
        displayText = `Search ${text} with ${website}`
    } else if (type == "goto") {
        displayText = `Go to ${text}`
    }

    function onClickCallback() {
        if (type == "goto") {
            window.location.assign(`http://www.${text}`)
        }
        else if (type == "search" && website == "Google") {
            window.location.assign(`http://www.${website}.com/search?q=${text}`)
        }
        else if (type == "search" && website == "Youtube") {
            window.location.assign(`http://www.${website}.com/results?search_query=${text}`)
        }
        else if (type == "search" && website == "Wikipedia") {
            window.location.assign(`http://en.${website}.org/wiki/${text}`)
        }
    }

    return (
        <div className={`p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 ${index === selected ? "bg-neutral-700" : ""}`} onClick={onClickCallback}>
            <p className="text-left text-neutral-400 select-none">{displayText}</p>
        </div>
    )
}

function Dropdown({ inputText }) {
    let [selected, setSelected] = useState(0);

    const gotoDropdown = [{ type: "goto", text: inputText }];
    const searchDropdowns = [
        { type: "search", text: inputText, website: "Google" },
        { type: "search", text: inputText, website: "Youtube" },
        { type: "search", text: inputText, website: "Wikipedia" },
    ];

    let allDropdowns = [];
    if (inputText.includes(".")) {
        allDropdowns = gotoDropdown;
    } else {
        allDropdowns = [...gotoDropdown, ...searchDropdowns];
    }

    useEffect(() => {
        function handleKeyDown(e) {
            console.log(selected)
            if (e.key === "ArrowDown") {
                if (selected >= allDropdowns.length - 1) {
                    setSelected(0);
                } else {
                    setSelected(selected += 1);
                }
            }
            if (e.key === "ArrowUp") {
                if (selected <= 0) {
                    setSelected(allDropdowns.length - 1);
                } else {
                    setSelected(selected -= 1);
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        }
    })

    const listItems = allDropdowns.map((element, index) =>
        <DropdownItem type={element.type} text={element.text} website={element.website} key={index} index={index} selected={selected} />
    )

    return (
        <>
            {listItems}
        </>
    )
}

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [isSearchSelected, setIsSearchSelected] = useState(true)

    const isDropdownVisible: boolean = isSearchSelected && Boolean(searchText)

    return (
        <div className="mt-32 flex flex-col justify-center items-center">
            <p className="text-sm text-neutral-700">Where do you want to go?</p>
            <input
                name="searchText"
                type="text"
                autoFocus
                className={`h-10 w-[350px] md:w-[400px] lg:w-[500px] rounded-x-xl rounded-t-xl border border-neutral-700 bg-neutral-800 shadow-md px-3 py-1 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 mt-8 relative ${!isDropdownVisible ? "rounded-b-xl" : ""}`}
                onFocus={() => setIsSearchSelected(true)}
                onBlur={() => setIsSearchSelected(false)}
                onChange={e => setSearchText(e.target.value)}
            />
            <div className={`absolute w-[350px] md:w-[400px] lg:w-[500px] max-h-96 overflow-auto bg-neutral-800 border-x border-b border-neutral-700 shadow-xl rounded-b-lg rounded-x-lg p-1 text-sm mt-[500px] ${Boolean(searchText) ? "block" : "hidden"}`}>
                <Dropdown inputText={searchText} />
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
