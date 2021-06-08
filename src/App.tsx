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
            </GameContextProvider>
        </div>
    );
}

export default App;
