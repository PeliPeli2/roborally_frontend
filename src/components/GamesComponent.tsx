import {FunctionComponent, useContext, useEffect} from "react";
import GameContext from "../context/GameContext";
import {GameComponent} from "./GameComponent";

type GamesComponentProps = {}
const GamesComponent: FunctionComponent<GamesComponentProps> = () => {
    const{games,screenName} = useContext(GameContext)

    return (
        screenName =="Game" ?
            <div>
                {games.map((game,index)=>
                <GameComponent key ={"game" + index}game={game}/>
                )
                }
            </div>
            :
            <div/>
    )

}
export default GamesComponent