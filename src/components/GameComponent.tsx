import {FunctionComponent, useCallback, useContext, useState} from "react";
import GameContext from "../context/GameContext";
import {Game} from "../types/Game";

export type GameComponentProps = {
    game: Game
}

export const GameComponent: FunctionComponent<GameComponentProps> =({game}) => {

    const {selectGame, screenName} = useContext(GameContext)
    const OnClickGame = useCallback(() => {
        selectGame(game)
        console.log(screenName)
    }, [])


        return (
        <div onClick={OnClickGame}>
            <h1 >{game.id}:{game.name}</h1>
            <ul>
                {game.users.map((user, index) => <li key={index}> {user.playerName} </li>)}
            </ul>
        </div>
    )
}

