import {FunctionComponent, useCallback, useContext, useState} from "react";
import GameContext from "../context/GameContext";
import {Game} from "../types/Game";
import {Player} from "../types/Player";

export type GameComponentProps = {
    game: Game
}

export const GameComponent: FunctionComponent<GameComponentProps> =({game}) => {

    const {selectGame, screenName, addPlayer} = useContext(GameContext)
    const [player, setPlayer] = useState<Player>({"boardId" : game.id, "playerId" : -1, "playerName": "sup", "playerColor": "red" , "x" : 1, "y" : 1})

    const OnClickGame = useCallback(() => {
        selectGame(game)
        console.log(screenName)
    }, [])

    const addPlayerButton = useCallback(() => {
            addPlayer(game, player)
        }, [])


        return (
        <div>
            <h1>
                {game.id}:{game.name} <button onClick={() => OnClickGame()} type="button">Play</button>
            </h1>
            <ul>
                {game.users.map((user, index) => <li key={index}> {user.playerName} </li>)}
            </ul>
            <button onClick={() => addPlayerButton()} type="button">add Player</button>

        </div>
    )
}

