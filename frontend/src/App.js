import TodoList from "./components/TodoList.js";
import MyState from './Context/MyState';


function App() {
  return (
    <>
      <MyState>
        <TodoList />
      </MyState>
    </>
  );
}

export default App;
