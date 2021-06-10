import {FunctionComponent, useContext, useState, useCallback} from "react";
import GameContext from "../context/GameContext";
import {GameComponent} from "./GameComponent";
import {Player} from "../types/Player";
import {Board} from "../types/Board";

type GamesComponentProps = {}
const GamesComponent: FunctionComponent<GamesComponentProps> = () => {
    const{games,screenName, createBoard, getGames} = useContext(GameContext)
    const [player, setPlayer] = useState<Player[]>([{"boardId" : -1, "playerId" : 0, "playerName": "sup", "playerColor": "red" , "x" : 1, "y" : 1}])
    const [board, setBoard] = useState<Board>({"boardId" : -1,"boardName" : "lol","height" : 8,"width" : 8,"playerDtos" : player,"spaceDtos":[]})



    //  boardId : number,
    //  boardName : string,
    //  height : number,
    //  width : number,
    //  spaceDtos : Space[][],
    //  playerDtos : Player[],
    //  currentPlayerDto? : Player
    const OnClickGame = useCallback(() => {
        createBoard(board)
        getGames()
    }, [])

    return (
        screenName==="Game" ?
            <div>
                {games.map((game,index)=>
                <GameComponent key ={"game" + index}game={game}/>
                )
                }
                <button onClick={() => OnClickGame()} type="button">create new game</button>
            </div>
            :
            <div/>
    )

}
export default GamesComponent