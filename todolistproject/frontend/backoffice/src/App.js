'./App.css';
import TodosMaster from "./components/TodosMaster";

import todos from './data/todos';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div>
        <TodosMaster todos={todos} />
      </div>
    </div>
  );
}

export default App;
