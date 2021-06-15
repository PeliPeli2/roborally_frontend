import {FunctionComponent, useContext, useState} from "react";
import {GameComponent} from "./GameComponent";
import {Board} from "../types/Board";
import styles from "../styling/GamesComponent.module.scss";
import bStyles from "../styling/BoardComponent.module.scss";
import GameContext from "../context/GameContext";

type GamesComponentProps = {}
const GamesComponent: FunctionComponent<GamesComponentProps> = () => {
    const{games,screenName, createBoard, selectedPlayer} = useContext(GameContext)
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
                <div className={bStyles.title}>
                    <h1 className={bStyles.titleText}>
                        Select your player : {selectedPlayer}
                    </h1>
                </div>
                {games.map((game,index)=>
                <GameComponent key ={"game" + index}game={game}/>
                )
                }
                <div className={styles.header}>
                <input
                    name="boardName"
                    value={board.boardName}
                    type='text'
                    onChange={changeBoardName}
                />
                <button type="submit" onClick={() => OnClickGame()}>create new game</button>
                </div>
            </div>
            :
            <div/>
    )

}
export default GamesComponent