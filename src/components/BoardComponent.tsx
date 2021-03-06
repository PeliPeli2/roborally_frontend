import React, {FunctionComponent, useContext, useCallback} from 'react';
import {SpaceComponent} from "./SpaceComponent";
import styles from "../styling/BoardComponent.module.scss" //Import css module
import GameContext from "../context/GameContext";
import bStyles from "../styling/BoardComponent.module.scss";
/*
If the board component took any props/arguments they would be declared inside the type below
see the space component for an example.
 */

type BoardComponentProps = {}
const BoardComponent: FunctionComponent<BoardComponentProps> = () => {
    //{...} context is known as object destructuring
    const {board, screenName, unselectGame, selectedPlayer } = useContext(GameContext) //Hook form of Context.Consumer, used to access the context
    const OnClickGame = useCallback(() => {
        unselectGame()
    }, [])

    return (
        /*Apply css on div below*/
        screenName ==="Board" ?
            <div>
                <div className={styles.title}>
                    <h1 className={styles.titleText}>
                        You are : {selectedPlayer}
                        <br/>
                        current player : {board.currentPlayerDto?.playerName }
                        <br/>
                    </h1>

                </div>
                <div className={styles.title}>
                <h1 className={styles.titleText}>
                    {board.boardName}
                    <button onClick={OnClickGame} type="button">Return to overview</button>
                </h1>
                </div>
                <div className={styles.container}>
                    {board.spaceDtos.map((spaceArray, index) =>
                            <div key={"spaceArray" + index}>
                                {
                                    spaceArray.map((space, index) => <SpaceComponent key={"space" + index} space={space}/>)
                                }

                            </div>
                        )
                     }
                </div>
            </div>
            :
            <div/>

    )

}

export default BoardComponent


