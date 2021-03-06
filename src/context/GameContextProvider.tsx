import React, {ReactNode, useCallback, useEffect, useMemo, useState} from "react"
import GameContext from "./GameContext"
import {Player} from "../types/Player";
import {Board} from "../types/Board";
import {Space} from "../types/Space";
import GameApi from "../api/GameApi";
import {Game} from "../types/Game";

type GameContextProviderPropsType = {
    children: ReactNode
}


const GameContextProvider = ({children}: GameContextProviderPropsType) => {
    const [games, setGames] = useState<Game[]>([])
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<string>("")
    const playerCount = useMemo(() => players.length, [players])
    const [screenName, setScreenName] = useState<string>("Game")
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
    const [currentPlayer, setCurrentPlayer] = useState<Player>({playerId : -1,playerColor:"red",boardId : -1,playerName : ""})
    const [spaces, setSpaces] = useState<Space[][]>([])
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [gameId, setGameId] = useState<number>(0)
    const [gameName, setGameName] = useState<string>("hi")
    //The code below is executed when the provider is rendered (inside App.tsx)
    //The code should fetch the data from the API instead of using a static assignment
    //Define a useState variable, note that useState returns an array, containing that state itself aswell as
    // a function to set a new state value, here we use array destructuring (the [..., ...] notation).
    // we also declare that the state variable and setter should be of type /take type Player[]


    useEffect(() => {
        GameApi.getGames().then((ga:Game[]) => {
            setGames(ga)
        }).catch(()=>{
            console.error("error when getting games")
        })
    }, [])

    const changeSelectedPlayer = useCallback((name:string)=> {
            setSelectedPlayer(name)
    },[])


    const getGames = useCallback(async()=> {
        GameApi.getGames().then((ga:Game[]) => {
            setGames(ga)
        }).catch(()=>{
            console.error("error when getting games")
        })
    },[])

    const addPlayer = useCallback(async(game:Game, player:Player)=> {
        GameApi.addPlayer(game.id, player).then(() => {
              getGames()
        }).catch((e: any)=>{
            alert(e.request.response)
        })
    },[])


    const createBoard = useCallback(async(board:Board)=> {
        console.log("Create")
            GameApi.createBoard(board).then(() => {
                getGames()
            }).catch(() => {
                console.error("Error when creating board")
            })
    },[])

    const selectGame = useCallback(async(game:Game)=> {
        console.log("SELECT")
        console.log(game)
        if(game.started){
            GameApi.getBoard(game.id).then((board: Board) => {
                if (board.playerDtos.length >0) {
                    setSpaces(board.spaceDtos)
                    setPlayers(board.playerDtos)
                    setWidth(board.width)
                    setHeight(board.height)
                    setGameId(board.boardId)
                    setGameName(board.boardName)
                    if (board.currentPlayerDto) {
                        setCurrentPlayer(board.currentPlayerDto)
                        board.playerDtos.forEach((player, index) => {
                            if (player.playerId === board.currentPlayerDto?.playerId) {
                                setCurrentPlayerIndex(index)
                            }
                        })


                    }
                    console.log("screenName set")
                    setScreenName("Board")
                }
            }).catch(() => {
                console.error("Error while fetching board from backend")
            })
        }else{
                console.error("Selected game" + game.name +"is not started yet")
        }
        console.log("SELECT END")
    },[])


    const unselectGame = useCallback(async () => {
        console.log("UNSELECT")
        setGameId(-1);
        setScreenName("Game")
    }, [])

    const selectGameId = useCallback(async(gameID:number)=> {
        GameApi.getBoard(gameID).then((board: Board) => {
            if (board.playerDtos.length >0) {
                setSpaces(board.spaceDtos)
                setPlayers(board.playerDtos)
                setWidth(board.width)
                setHeight(board.height)
                setGameId(board.boardId)
                setGameName(board.boardName)
                if (board.currentPlayerDto) {
                    setCurrentPlayer(board.currentPlayerDto)
                    board.playerDtos.forEach((player, index) => {
                        if (player.playerId === board.currentPlayerDto?.playerId) {
                            setCurrentPlayerIndex(index)
                        }
                    })


                }
                console.log("screenName set")
            }
        }).catch(() => {
            console.error("Error while fetching board from backend")
        })
    },[screenName])



    //Define a function used to set a player ona  specific space
    const setPlayerOnSpace = useCallback(async (space: Space) => {
        //Check if space already has a player standing on it
        if (!space.playerId) {
            await GameApi.moveCurrentPlayer(gameId, {...space, playerId: currentPlayer.playerId}).then(() => {
                let tempSpaces = [...spaces] //Use spread operator to copy spaces array, needed for making immutable changes
                //See https://bit.ly/2My8Bfz, until the section about Immutable.js
                tempSpaces[space.x][space.y].playerId = currentPlayer.playerId //Set the player on the new space they clicked on

                if (currentPlayer.x !== undefined && currentPlayer.y !== undefined) { //If the player was standing on a space previously, remove them from that space
                    tempSpaces[currentPlayer.x][currentPlayer.y].playerId = undefined
                }
                setSpaces(tempSpaces)
                let tempPlayers = [...players]
                tempPlayers[currentPlayerIndex].x = space.x; //Update the players array to reflect the changes
                tempPlayers[currentPlayerIndex].y = space.y; //Update the players array to reflect the changes
                setPlayers(tempPlayers)
                setCurrentPlayer({...currentPlayer, x: space.x, y: space.y}) //Update current player

            }).catch(() => {
                console.error("Error while moving player")
            })

        }

    }, [currentPlayer, currentPlayerIndex, gameId, players, spaces])

    const switchToNextPlayer = useCallback(async () => {
        await GameApi.switchPlayer(gameId).then(()=>{
            const newPlayerIndex = (currentPlayerIndex + 1) % playerCount
            console.log("old player index", currentPlayerIndex, "new player index", newPlayerIndex)
            setCurrentPlayer(players[newPlayerIndex])
            setCurrentPlayerIndex(newPlayerIndex)
        }).catch(()=>console.error("Error while switching player"))
        
    }, [currentPlayerIndex, gameId, playerCount, players])
    const board = useMemo<Board>(() => {
        return ({
            spaceDtos: spaces,
            playerDtos: players,
            currentPlayerDto: currentPlayer,
            currentPlayerIndex: currentPlayerIndex,
            width: width,
            height: height,
            boardName: gameName,
            boardId: gameId
        })
    }, [currentPlayer, currentPlayerIndex, gameId, gameName, height, players, spaces, width])

    useEffect(()=>{
        const interval =setInterval(async()=>{
            console.log("start interval")
            console.log(screenName)
            console.log(gameId)
            if(screenName==="Board"){
                console.log("get GAME ID")
                selectGameId(gameId)
                }
            else if (screenName==="Game")
            {
                console.log("GET games")
                getGames()
            }
            console.log("end interval")

            },5000)
        return ()=>{clearInterval(interval)}
        }, [screenName])



    return (
        <GameContext.Provider
            value={
                {
                    games: games,
                    screenName: screenName,
                    getGames: getGames,
                    selectGame: selectGame,
                    unselectGame: unselectGame,
                    createBoard: createBoard,
                    board: board,
                    selectedPlayer: selectedPlayer,
                    setCurrentPlayerOnSpace: setPlayerOnSpace,
                    addPlayer: addPlayer,
                    changeSelectedPlayer: changeSelectedPlayer,
                    switchCurrentPlayer: switchToNextPlayer
                }
            }>
            {children} {/*See: https://reactjs.org/docs/composition-vs-inheritance.html*/}
        </GameContext.Provider>
    )
}

export default GameContextProvider