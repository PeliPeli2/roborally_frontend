import {createContext} from "react";
import {Board} from "../types/Board";
import {Space} from "../types/Space";
import {Game} from "../types/Game";
import {Player} from "../types/Player";

export type GameContextType = {
    games: Game[],
    screenName:string,
    getGames:() => Promise<void>,
    selectGame:(game: Game) => Promise<void>,
    unselectGame: () => Promise<void>,
    createBoard: (board: Board) => Promise<void>,
    board: Board,
    selectedPlayer: string,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    addPlayer:(game:Game, player: Player) => Promise<void>,
    switchCurrentPlayer: () => Promise<void>
}
//Define a new context of type GameContextType
//Below we define the "default" values which are set upon initialization of the context

const GameContext = createContext<GameContextType>({
    games: [],

    getGames: async () => {},
    selectGame: async () => {},
    unselectGame: async () => {},
    createBoard: async () => {},


    screenName:"Game",
    board: {
        playerDtos: [],
        spaceDtos: [],
        boardId: -1,
        boardName: "",
        currentPlayerDto: undefined,
        height: 0,
        width: 0
    },
    selectedPlayer: "lol",
    setCurrentPlayerOnSpace: async () => {
    },
    addPlayer: async () => {
    },
    switchCurrentPlayer: async () => {
    }
});

export default GameContext