import './Play.css'
import {useState, useEffect} from "react"
import FrameworkTransparent from './assets/framework_laptop_transparent.png'

function Play({setNames, playing, setPlaying, loggedIn}) {
    const [grid, setGrid] = useState([])
    const [path, setPath] = useState([])
    const [wireStarted, setWireStarted] = useState(false)

    const level0 = [
        ["empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty"]
    ]
    const level1 = [
        ["start", "empty", "empty", "empty", "empty"],
        ["empty", "obstacle", "empty", "obstacle", "obstacle"],
        ["empty", "obstacle", "empty", "empty", "empty"],
        ["empty", "obstacle", "empty", "obstacle", "empty"],
        ["empty", "empty", "empty", "obstacle", "end"]
    ]
    const level2 = [
        ["empty", "empty", "obstacle", "obstacle", "empty"],
        ["start", "obstacle", "empty", "empty", "empty"],
        ["empty", "obstacle", "end", "obstacle", "empty"],
        ["empty", "empty", "obstacle", "empty", "empty"],
        ["obstacle", "empty", "empty", "empty", "obstacle"]
    ]

    function getLevel() {
        if (playing === 1) {
            setGrid(level1)
        }
        else if (playing === 2) {
            setGrid(level2)
        }
        else {
            setGrid(level0)
        }
    }

    useEffect(() => {
        getLevel()
    }, [playing])

    function handleClick(x, y) {
        const cell = grid[x][y]

        if (!wireStarted) {
            if (cell !== "start") {return}
            setWireStarted(true)
            setPath([{x, y}])
            return
        }

        const last = path[path.length - 1]
        const adjacent = ((Math.abs(last.x - x) === 1) && (last.y === y)) || ((Math.abs(last.y - y) === 1) && (last.x === x))
        
        if (!adjacent) {return}
        if (cell === "obstacle") {return}

        const newPath = [...path, {x, y}]
        setPath(newPath)

        if (cell === "end") {
            finishLevel()
            setPath([])
            setWireStarted(false)
        }
    }

    function finishLevel() {
        fetch(`http://localhost:4000/names/${loggedIn}/level`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                lvlIndex: (playing - 1),
                value: true
            })
        })
        .then(res => res.json())
        .then(updated => {
            console.log("Level updated:", updated);

            setNames(prevNames =>
                prevNames.map(n => 
                    n.id === loggedIn 
                    ? {...n, lvl: updated.user.lvl} 
                    : n
                )
            );

            setPlaying(0);
        })
        .catch(err => console.error(err));
    }

    return(
        <>
        <img src={FrameworkTransparent} className="t-fw"/>
        <button className="back-btn" onClick={() => {setPlaying(0)}}>BACK</button>
        <div className="grid-container">
            <div className="grid">
                {grid.map((row, x) =>
                    row.map((cell, y) => {
                        const wire = path.some(p => p.x === x && p.y === y)

                        return(
                            <div 
                                key={`${x}-${y}`} 
                                className={`cell ${cell} ${wire ? "wire" : ""}`} 
                                onClick={() => {handleClick(x, y)}}
                            >
                            </div>
                        )
                    })
                )}
            </div>
        </div>
        </>
    )
}

export default Play