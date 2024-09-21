import { useEffect, useState } from 'react'
import './App.css'
import googleIcon from "./assets/icons/google.svg"
import youtubeIcon from "./assets/icons/youtube.svg"
import wikipediaIcon from "./assets/icons/wikipedia.svg"
import globeIcon from "./assets/icons/globe.svg"

interface dropdownItemProps {
    type: string;
    text: string;
    website?: string;
    index: number;
    selected: number;
}

interface dropdownProps {
    inputText: string;
}

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

function DropdownItem({ type, text, website, index, selected }: dropdownItemProps) {

    let icon = "";
    switch (website) {
        case "Google":
            icon = googleIcon;
            break;
        case "Youtube":
            icon = youtubeIcon;
            break;
        case "Wikipedia":
            icon = wikipediaIcon;
            break;
        default:
            icon = globeIcon;
            break;
    }

    let displayText = "";
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

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Enter" && index === selected) {
                onClickCallback()
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        }
    })

    return (
        <div className={`flex space-x-4 p-2 rounded-md hover:bg-neutral-700 ${index === selected ? "bg-neutral-700" : "bg-neutral-800"}`} onClick={onClickCallback}>
            <img src={icon} width="16" />
            <p className="text-left text-neutral-400 select-none">{displayText}</p>
        </div>
    )
}

function Dropdown({ inputText }: dropdownProps) {
    let [selected, setSelected] = useState(0);

    const gotoDropdown = [{ type: "goto", text: inputText, website: "" }];
    const searchDropdowns = [
        { type: "search", text: inputText, website: "Google" },
        { type: "search", text: inputText, website: "Youtube" },
        { type: "search", text: inputText, website: "Wikipedia" },
    ];

    let allDropdowns = [];
    if (inputText.includes(".")) {
        allDropdowns = gotoDropdown;
    } else {
        allDropdowns = [...searchDropdowns, ...gotoDropdown,];
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
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

    return (
        <div className="mt-32 flex flex-col justify-center items-center relative">
            <p className="text-sm text-neutral-700">Where do you want to go?</p>
            <div className="relative">
                <input
                    name="searchText"
                    type="text"
                    autoFocus
                    className={`h-10 w-[350px] md:w-[400px] lg:w-[500px] rounded-x-xl rounded-t-xl border border-neutral-700 bg-neutral-800 shadow-md px-3 py-1 text-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 mt-8 ${!Boolean(searchText) ? "rounded-b-xl" : ""}`}
                    onChange={e => setSearchText(e.target.value)}
                />
                <div className={`absolute w-[350px] md:w-[400px] lg:w-[500px] max-h-96 overflow-auto bg-neutral-800 border-x border-b border-neutral-700 shadow-xl rounded-b-lg rounded-x-lg p-1 text-sm origin-top-right ${Boolean(searchText) ? "block" : "hidden"}`}>
                    <Dropdown inputText={searchText} />
                </div>
            </div>
        </div>
    )
}

function App() {
    return (
        <main className="p-8 text-white font-mono">
            <header className="flex justify-between text-lg md:text-2xl">
                <Clock />
                <CurrentDate />
            </header>
            <SearchBar />
        </main>
    )
}

export default App
