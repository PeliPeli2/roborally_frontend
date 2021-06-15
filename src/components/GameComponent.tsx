import {FunctionComponent, useCallback, useContext, useState} from "react";
import {Game} from "../types/Game";
import {Player} from "../types/Player";
import {Space} from "../types/Space";
import styles from "../styling/GameComponent.module.scss";
import GameContext from "../context/GameContext";


export type GameComponentProps = {
    game: Game
}

export const GameComponent: FunctionComponent<GameComponentProps> =({game}) => {

    const {selectGame, screenName, addPlayer, selectedPlayer, changeSelectedPlayer} = useContext(GameContext)
    const [playerName, setPlayerName] = useState<string>(selectedPlayer)
    const [playerId, setPlayerId] = useState<number>(-1)
    const [player, setPlayer] = useState<Player>({"boardId" : game.id, "playerId" : playerId, "playerName": "Player name", "playerColor": "red" , "x" : 0, "y" : 0})
    const [space, setSpace] = useState<Space>({"playerId" : -1, "x" : 0, "y" : 0})

    const options = [
        {value: 'red', label: 'red'},
        {value: 'green', label: 'green'},
        {value: 'blue', label: 'blue'},
        {value: 'yellow', label: 'yellow'},
        {value: 'brown', label: 'brown'},
        {value: 'purple', label: 'purple'},
    ];


    const OnClickGame = useCallback((game: Game) => {
        console.log(game)
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

    const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeSelectedPlayer(event.currentTarget.value)
    };

        return (
        <div className={styles.game}>
            <h1>
                {game.id}:{game.name}
                {game.started ?
                    <button onClick={() => OnClickGame(game)} type="button">Play</button>
                    :
                    <div/>
                }
            </h1>
            Select the player you want to play as <br/>
            <select name="selectedPlayer"
                    value={selectedPlayer}
                    onChange={changeSelect}>
                {game.users.map((user, index) => <option key={index} value={user.playerName}> {user.playerName} </option>)}
            </select>
            <ul className={styles.list}>
                {game.users.map((user, index) => <li key={index}> {user.playerName} </li>)}
            </ul>

            <select name="playerColor"
                    value={player.playerColor}
                    onChange={changePlayerColor}>
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="brown">brown</option>
                <option value="purple">purple</option>
            </select>
            <input
                name="x"
                value={player.x}
                type='number'
                min="0"
                max="8"
                onChange={changePlayer}
            />
            <input
                name="y"
                value={player.y}
                type='number'
                min="0"
                max="8"
                onChange={changePlayer}
            />

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

