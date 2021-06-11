import {FunctionComponent, useContext, useState} from "react";
import GameContext from "../context/GameContext";
import {GameComponent} from "./GameComponent";
import {Player} from "../types/Player";
import {Board} from "../types/Board";

type GamesComponentProps = {}
const GamesComponent: FunctionComponent<GamesComponentProps> = () => {
    const{games,screenName, createBoard} = useContext(GameContext)
    const [board, setBoard] = useState<Board>({"boardId" : -1,"boardName" : "BoardName","height" : 8,"width" : 8,"playerDtos" : [],"spaceDtos":[]})

    const OnClickGame = () => {
        createBoard(board)
    }

    const changeBoardName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoard({ ...board, [event.target.name]: event.currentTarget.value });
    };

    return (
        screenName==="Game" ?
            <div>
                {games.map((game,index)=>
                <GameComponent key ={"game" + index}game={game}/>
                )
                }
                <input
                    name="boardName"
                    value={board.boardName}
                    type='text'
                    onChange={changeBoardName}
                />
                <button type="submit" onClick={() => OnClickGame()}>create new game</button>
            </div>
            :
            <div/>
    )

}
export default GamesComponent