import {FunctionComponent, useContext, useEffect} from "react";
import GameContext from "../context/GameContext";
import {GameComponent} from "./GameComponent";

type GamesComponentProps = {}
const GamesComponent: FunctionComponent<GamesComponentProps> = () => {
    const{games,loaded} = useContext(GameContext)
    useEffect(()=> {
    console.log("1")
    console.log(games)
    console.log("2")
    },[games])
    return (
        loaded ?
            <div>
                {games.map((game,index)=>
                <GameComponent key ={"game" + index}game={game}/>
                )
                }
            </div>
            :
            <div>
            hjælp mig

            </div>
    )

}
export default GamesComponent