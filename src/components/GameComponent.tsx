import {FunctionComponent, useContext} from "react";
import GameContext from "../context/GameContext";
import {Game} from "../types/Game";

export type GameComponentProps = {
    game: Game
}

export const GameComponent: FunctionComponent<GameComponentProps> =({game}) => {

    const {selectGame} = useContext(GameContext)
    const OnClickGame = async () => {
        selectGame(game)
    }

    return (
        <div onClick={OnClickGame}>
            <h1>{game.id}:{game.name}</h1>
            <ul>
                {game.users.map((user, index) => <li key={index}> {user.playerName} </li>)}
            </ul>
        </div>
    )
}

