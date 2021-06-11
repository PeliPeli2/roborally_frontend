import {FunctionComponent, useCallback, useContext, useState} from "react";
import GameContext from "../context/GameContext";
import {Game} from "../types/Game";
import {Player} from "../types/Player";

export type GameComponentProps = {
    game: Game
}

export const GameComponent: FunctionComponent<GameComponentProps> =({game}) => {

    const {selectGame, screenName, addPlayer} = useContext(GameContext)
    const [player, setPlayer] = useState<Player>({"boardId" : game.id, "playerId" : -1, "playerName": "Player name", "playerColor": "red" , "x" : 1, "y" : 1})
    const options = [
        {value: 'red', label: 'red'},
        {value: 'green', label: 'green'},
        {value: 'blue', label: 'blue'},
    ];


    const OnClickGame = useCallback(() => {
        selectGame(game)
        console.log(screenName)
    }, [])

    const addPlayerButton = () => {
            addPlayer(game, player)
        }

    const changePlayer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer({ ...player, [event.target.name]: event.currentTarget.value });
    };
    const changePlayerColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPlayer({ ...player, [event.target.name]: event.currentTarget.value });
    };


        return (
        <div>
            <h1>
                {game.id}:{game.name} <button onClick={() => OnClickGame()} type="button">Play</button>
            </h1>
            <ul>
                {game.users.map((user, index) => <li key={index}> {user.playerName} </li>)}
            </ul>

            <select name="playerColor"
                    value={player.playerColor}
                    onChange={changePlayerColor}>
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
            </select>

            <input
                name="playerName"
                value={player.playerName}
                type='text'
                onChange={changePlayer}
            />
            <button onClick={() => addPlayerButton()} type="button">add Player</button>

        </div>
    )
}

