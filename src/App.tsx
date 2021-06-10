import React, {useContext} from 'react';

import BoardComponent from "./components/BoardComponent";
import GameContextProvider from "./context/GameContextProvider";
import GamesComponent from "./components/GamesComponent";
import GameContext from "./context/GameContext";

function App() {
    const{screenName} = useContext(GameContext)

    return (
        <div className="App">
            <header className="App-header">
            </header>
            {/*Context provider component below makes sure the context is accessible in any children components*/}
            <GameContextProvider>
                <GamesComponent/>
                <BoardComponent/>
                {/* try to make a context provicer dor screenname for app, aane parse that to the inner context provider
                    {
                        'Game': <GamesComponent/>,
                        'Board': <BoardComponent/>
                    }[screenName]

                    return the full list when making rest calls and update them in a then statement
                */
                }
            </GameContextProvider>
        </div>

    );
}

export default App;
