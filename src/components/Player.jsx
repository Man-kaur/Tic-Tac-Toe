import { useState } from "react";

export default function Player({name, symbol, isActive, onPlayerChange}) {

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    function handleEditClick(){
        setIsEditing((IsEditing) => !IsEditing);
        if(isEditing){
            onPlayerChange(symbol, newName);
        }
    }


    let playerName = <span className="player-name">{newName}</span>
    
    if(isEditing){
        playerName =<input onChange={(e)=>setNewName(e.target.value)} type="text" value={newName}></input>
    }

    return (
        <li className={isActive?'active':undefined}>
            <span>
            {playerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    );
}


// One important point to note in here is two-way bindind, getting input frmo user and feeding it back to the element
