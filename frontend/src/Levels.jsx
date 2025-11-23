import './Levels.css'
import {useState} from "react"

function Levels() {
    const [lvlPg, setLvlPg] = useState(0)

    const levels = [true, true, false, false, true, true, false, false, true, true]

    function getLevels() {
        const giveLevels =[]
        const giveLevelsA = []
        const giveLevelsB = []

        const lvlPgA = lvlPg * 6
        const lvlPgB = lvlPg * 6

        for (l = 0; l < 3; l++) {
            giveLevelsA.push(
                <div className="level">
                    <h1 className="lvl-title">Level {lvlPgA + l + 1}</h1>
                </div>
            )
        }
        for (l = 0; l < 3; l++) {
            giveLevelsB.push(
                <div className="level">
                    <h1 className="lvl-title">Level {lvlPgB + l + 1}</h1>
                </div>
            )
        }

        giveLevels.push(
            <div className="levels-v">
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