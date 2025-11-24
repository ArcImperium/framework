import './Play.css'
import {useState, useEffect} from "react"
import FrameworkTransparent from './assets/framework_laptop_transparent.png'

function Play({playing, setPlaying}) {
    const [grid, setGrid] = useState([])
    const [path, setPath] = useState([])
    const [wireStarted, setWireStarted] = useState(false)

    const level1 = [
        ["start", "empty", "empty", "empty", "empty"],
        ["empty", "obstacle", "empty", "obstacle", "obstacle"],
        ["empty", "obstacle", "empty", "empty", "empty"],
        ["empty", "obstacle", "empty", "obstacle", "empty"],
        ["empty", "empty", "empty", "obstacle", "end"]
    ]

    function getLevel() {
        if (playing === 1) {
            setGrid(level1)
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

        }
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