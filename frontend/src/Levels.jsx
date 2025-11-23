import './Levels.css'
import {useState} from "react"

function Levels({names, loggedIn}) {
    const [lvlPg, setLvlPg] = useState(0)

    const user = names.find(n => n.id === loggedIn)
    const levels = user ? user.lvl : []

    console.log(levels)

    function getLevels() {
        const giveLevels =[]
        const giveLevelsA = []
        const giveLevelsB = []

        const lvlPgA = lvlPg * 6
        const lvlPgB = lvlPg * 6 + 3

        for (let i = 0; i < 3; i++) {
            const completed = levels[lvlPgA + i] === true
            const lvlMes = completed ? "Completed" : "Not Completed"

            giveLevelsA.push(
                <div className={`level ${completed ? "" : "not"}`} key={"A" + lvlPgA + i}>
                    <h1 className="lvl-title">Level {lvlPgA + i + 1}</h1>
                    <h2 className="lvl-completed">{lvlMes}</h2>
                </div>
            )
        }
        for (let i = 0; i < 3; i++) {
            const completed = levels[lvlPgB + i] === true
            const lvlMes = completed ? "Completed" : "Not Completed"

            giveLevelsB.push(
                <div className={`level ${completed ? "" : "not"}`} key={"B" + lvlPgB + i}>
                    <h1 className="lvl-title">Level {lvlPgB + i + 1}</h1>
                    <h2 className="lvl-completed">{lvlMes}</h2>
                </div>
            )
        }

        giveLevels.push(
            <div className="levels-v" key={`lvlPg-${lvlPg}`}>
                <div className="levels-h a">
                    {giveLevelsA}
                </div>
                <div className="levels-h b">
                    {giveLevelsB}
                </div>
            </div>
        )

        return giveLevels
    }

    return(
        <>
        {getLevels()}
        </>
    )
}

export default Levels