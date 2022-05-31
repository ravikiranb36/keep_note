import React, { useState } from "react";
import { useReducer } from "react";
import Draggable from "react-draggable";
import { TextField } from "@mui/material";
import { mdiContentSave, mdiDelete, mdiPin } from "@mdi/js";
import Icon from "@mdi/react";

const initialTodos = [
  {
    title: "Note 1",
    content: "Default Content",
  },
  {
    title: "Note 2",
    content: "Default Content",
    pinned:true
  },
];

const reducer = (state, action) => {
  let noteList = state.slice();
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { title: action.title, content: "" }]
    case "UPDATE_CONTENT":
      let noteToUpdateContent = noteList[action.id]
      noteToUpdateContent.content = action.content;
      noteList.splice(action.id, 1, noteToUpdateContent);
      return noteList;
    case "UPDATE_PINNED":
      let noteToUpdatePinned = noteList[action.id]
      noteToUpdatePinned.pinned = action.pinned;
      noteList.splice(action.id, 1, noteToUpdatePinned);
      return noteList;
    case "SAVE_CONTENT":
      let noteToUpdate = noteList[action.id]
      noteToUpdate.content = action.content;
      noteToUpdate.title = action.title;
      noteToUpdate.pinned = action.pinned;
      noteList.splice(action.id, 1, noteToUpdate);
      return noteList;
    case 'DELETE_NOTE':
      noteList.splice(action.id, 1);
      return noteList;
    default:
      return state;
  }
};

function KeepNotes() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);


  const addTodo = () => {
    dispatch({ type: "ADD_TODO", title: "New TODO", content: "Content" })
  }
  const updateContent = (index, content) => {
    dispatch({ type: "UPDATE_CONTENT", id: index, content: content })
  }
  const saveNote = (index, title, content, pinned) => {
    dispatch({ type: "SAVE_NOTE", id: index, content: content, title: title, pinned: pinned })
  }
  const deleteNote = id => {
    dispatch({ type: "DELETE_NOTE", id: id })
  }
  const updatePinned = (id, pinned) => {
    dispatch({ type: "UPDATE_PINNED", id: id, pinned: !pinned })
  }
  const [bgColor, setBgColor] = useState('#eff0bd');
  return (

    <>
      <button onClick={addTodo}>Add TODO</button>
      <hr/>
      <div>
        <label>Note Background Colo :</label>
        <input value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
      </div>
      <div key='pinned' style={{margin:'20px'}}>
        <span>PINNED</span>
        {todos.map((note, index) => (
          <>
            {note.pinned ?
              <div key={`note_${index}`} style={{margin:'20px'}}>
                {note.pinned}
                <Draggable >
                  <div>
                    <TextField label={`Note ${index + 1}`} placeholder='Write Note' value={note.content}
                      onChange={(e) => updateContent(index, e.target.value)}
                      style={{ backgroundColor: bgColor }}
                      minRows={3}
                      required multiline
                    />
                    <div>
                      <button ><Icon path={mdiContentSave} size={0.5} onClick={() => saveNote(index, note.title, note.content, note.pinned)} /></button>
                      <button ><Icon path={mdiDelete} size={0.5} onClick={() => deleteNote(index)} /></button>

                      {note.pinned ?
                        <button ><Icon path={mdiPin} size={0.5} onClick={() => updatePinned(index, note.pinned)} style={{ backgroundColor: '#d66915' }} /></button>
                        :
                        <button ><Icon path={mdiPin} size={0.5} onClick={() => updatePinned(index, note.pinned)} /></button>}
                    </div>

                  </div>
                </Draggable>
              </div> : <></>}
          </>
        ))}
      </div>
      <div key='unpinned' style={{margin:'20px'}}>
        <span>OTHERS</span>
        {todos.map((note, index) => (
          <>
            {!note.pinned ?
              <div key={`note_${index}`} style={{margin:'20px'}}>
                {note.pinned}
                <Draggable >
                  <div>
                    <TextField label={`Note ${index + 1}`} placeholder='Write Note' value={note.content}
                      onChange={(e) => updateContent(index, e.target.value)}
                      style={{ backgroundColor: bgColor }}
                      minRows={3}
                      required multiline
                    />
                    <div>
                      <button ><Icon path={mdiContentSave} size={0.5} onClick={() => saveNote(index, note.title, note.content, note.pinned)} /></button>
                      <button ><Icon path={mdiDelete} size={0.5} onClick={() => deleteNote(index)} /></button>

                      {note.pinned ?
                        <button ><Icon path={mdiPin} size={0.5} onClick={() => updatePinned(index, note.pinned)} style={{ backgroundColor: '#d66915' }} /></button>
                        :
                        <button ><Icon path={mdiPin} size={0.5} onClick={() => updatePinned(index, note.pinned)} /></button>}
                    </div>

                  </div>
                </Draggable>
              </div> : <></>}
          </>
        ))}
      </div>

    </>
  );
}

export default KeepNotes;