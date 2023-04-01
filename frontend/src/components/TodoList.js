import { useState, useContext, useEffect, useRef } from 'react';
import TodoItem from './TodoItem';
import MyContext from '../Context/MyContext'

function TodoList() {

    const context = useContext(MyContext)
    const { notes, fetchnotes, addNote, deleteNote } = context;
    const tasksRef = useRef([]);

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        id: "",
        title: "",
        description: "",
        status: "todo",
    });
    useEffect(() => {
        fetchnotes()
        tasksRef.current = tasks;
    }, [tasks, fetchnotes])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleAddTask = () => {
        addNote(newTask.title, newTask.description, newTask.status)
        setTasks([...tasks, newTask]);
        setNewTask({ title: "", description: "" });
    };

    const handleDragStart = (event, id) => {
        event.dataTransfer.setData("id", id);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (event, status) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("id");
        const taskIndex = notes.findIndex((task) => task._id === taskId);

        if (taskIndex !== -1) {
            const taskToUpdate = tasksRef.current[taskIndex]
            const updatedTask = { ...taskToUpdate, status };

            try {
                const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                });

                if (!response.ok) {
                    throw new Error(`Failed to update task ${taskId}`);
                }
                const updatedTaskFromServer = await response.json();
                const updatedTasks = [...notes];
                updatedTasks[taskIndex] = updatedTaskFromServer;
                setTasks(updatedTasks);
            } catch (error) {
                console.error(error);
            }
        }
    };



    const handleDeleteTask = (id) => {
        deleteNote(id)
    }

    return (
        <>
            <div className='text-center font-bold pt-5 text-4xl text-blue-500 bg-slate-300'>Todo List</div>
            <div className="flex justify-center items-start pt-10 h-fit bg-slate-300">

                <div className="flex flex-col w-1/3 items-center border-e border-t border-gray-700 h-screen overscroll-none"
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDrop(event, "todo")}>
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">To Do</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newTask.title}
                            name='title'
                            onChange={handleInputChange}
                            className="w-full p-2 mb-2 rounded-lg border-gray-400"
                        />
                        <textarea
                            placeholder="description"
                            value={newTask.description}
                            name='description'
                            onChange={handleInputChange}
                            className="w-full p-2 mb-2 rounded-lg border-gray-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                            onClick={handleAddTask}
                        >
                            Add Todo
                        </button>
                    </div>
                    {notes
                        .filter((todo) => todo.status === "todo")
                        .map((todo) => {
                            return <TodoItem onDragStart={(event) => handleDragStart(event, todo._id)} key={todo.id} title={todo.title} description={todo.description} onClick={() => { handleDeleteTask(todo._id) }} />
                        })}

                </div>
                <div className="flex flex-col w-1/3 items-center h-40 border-e border-t border-gray-700 h-screen"
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDrop(event, "progress")}>
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">In Progress</h2>
                    {notes
                        .filter((todo) => todo.status === "progress")
                        .map((todo) => {
                            return <TodoItem onDragStart={(event) => handleDragStart(event, todo._id)} key={todo.id} title={todo.title} description={todo.description} onClick={() => { handleDeleteTask(todo._id) }} />
                        })}
                </div>
                <div className="flex flex-col w-1/3 items-center h-40 border-t border-gray-700 h-screen"
                    onDragOver={(event) => handleDragOver(event)}
                    onDrop={(event) => handleDrop(event, "completed")}>
                    <h2 className="text-2xl font-bold mb-4 text-blue-500">Completed</h2>
                    {notes
                        .filter((todo) => todo.status === "completed")
                        .map((todo, index) => {
                            return <TodoItem onDragStart={(event) => handleDragStart(event, todo._id)} key={todo.id} title={todo.title} description={todo.description} onClick={() => { handleDeleteTask(todo._id) }} />
                        })}
                </div>
            </div>
        </>
    );
}


export default TodoList;

