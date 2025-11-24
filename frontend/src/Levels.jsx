import './Levels.css'
import {useState} from "react"
import {useParams} from "react-router-dom"
import Play from './Play.jsx'
import Construction from './assets/construction.png'

function Levels({names, loggedIn, setLoggedIn}) {
    const {id} = useParams()

    const [lvlPg, setLvlPg] = useState(0)

    const [playing, setPlaying] = useState(0)

    const user = names.find(n => n.id === id)
    const levels = user ? user.lvl : []

    function getLevels() {
        const giveLevels =[]
        const giveLevelsA = []
        const giveLevelsB = []

        const lvlPgA = lvlPg * 6
        const lvlPgB = lvlPg * 6 + 3

        for (let i = 0; i < 3; i++) {
            const completed = levels[lvlPgA + i] === true
            const lvlMes = completed ? "Completed" : "Not Completed"
            let construct = false

            if ((lvlPgA + i) > 1) {
                construct = true
            }

            if ((lvlPgA + i) < levels.length) {
                giveLevelsA.push(
                    <div className={`level ${completed ? "" : "not"}`} key={"A" + lvlPgA + i} onClick={() => {setPlaying(lvlPgA + i + 1)}}>
                        <h1 className="lvl-title">Level {lvlPgA + i + 1}</h1>
                        <h2 className="lvl-completed">{lvlMes}</h2>
                        {construct && (<img src={Construction} className="construction"/>)}
                    </div>
                )
            }   
        }
        for (let i = 0; i < 3; i++) {
            const completed = levels[lvlPgB + i] === true
            const lvlMes = completed ? "Completed" : "Not Completed"

            if ((lvlPgB + i) < levels.length) {
                giveLevelsB.push(
                    <div className={`level ${completed ? "" : "not"}`} key={"B" + lvlPgB + i} onClick={() => {setPlaying(lvlPgB + i + 1)}}>
                        <h1 className="lvl-title">Level {lvlPgB + i + 1}</h1>
                        <h2 className="lvl-completed">{lvlMes}</h2>
                        <img src={Construction} className="construction"/>
                    </div>
                )
            }
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
        {(playing === 0) && (<>
            {getLevels()}
            {(lvlPg < Math.floor(levels.length / 6)) && (<button className="next-pg r" onClick={() => {setLvlPg(prev => prev + 1)}}>→</button>)}
            {(lvlPg > 0) && (<button className="next-pg l" onClick={() => {setLvlPg(prev => prev - 1)}}>←</button>)}
        </>)}
        {(playing > 0) && (<Play playing={playing} setPlaying={setPlaying}/>)}
        </>
    )
}

export default Levels