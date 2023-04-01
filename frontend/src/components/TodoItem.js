import React from 'react'

const TodoItem = (props) => {

    return (
        <div draggable onDragStart={props.onDragStart} className="bg-cyan-300 m-4 w-4/5 p-4 rounded-lg border-gray-400 border">
            <h3 className="text-lg font-bold">{props.title}</h3>
            <p className="text-gray-600 mb-2">{props.description}</p>
            <div className='flex justify-end'>
                <button className='font-bold text-xl' onClick={props.onClick}>Delete</button>
            </div>
        </div>
    );
}

export default TodoItem
