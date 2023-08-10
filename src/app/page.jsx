"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  let [notes, setNotes] = useState([]);
  let [newNote, setNewNote] = useState({
    id: 1,
    name: "",
    status: false,
  });
  let [editTask, setEditTask] = useState(null);
  let [editedTaskContent, setEditedTaskContent] = useState("");
  let [selectedCompletedTasks, setSelectedCompletedTasks] = useState([]);

  {
    /* Este handler tiene la función de actualizar el estado 'notes', agregando una nueva nota ('newNote') al arreglo.
 Al mismo tiempo, prepara el estado de ('newNote') para el ingreso de la proxima tarea, definiendo que el id de la proxima nota
sea mayor por 1 digito que el id de la nota anterior.

    Actualización 8/8 --> se agrego una validación de entrada que verifique que si el usuario esta intentando agregar una tarea que ya 
    está agregada o esta ingresando una tarea vacia, la misma no se agregue a la lista.

    */
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.name.trim() === "") {
      return;
    }

    if (notes.some((note) => note.name === newNote.name)) {
      return;
    }

    setNotes([...notes, newNote]);
    setNewNote({
      id: newNote.id + 1,
      name: "",
      status: false,
    });
  };

  {
    /* Este handler actualiza el estado 'newNote' cada vez que el input cambia. al input se le proporciona un value es igual al 
name de newnote. */
  }

  const handleInputChange = (e) => {
    setNewNote({
      ...newNote,
      name: e.target.value,
    });
  };

  {
    /* Handler que nos permite marcar como completadas todas las notas. */
  }

  const completedAllNotes = () => {
    setNotes((allNotes) =>
      allNotes.map((note) => ({
        ...note,
        status: true,
      }))
    );
  };

  {
    /* Este handler tiene como finalidad que cada vez que se presione el boton "Eliminar tarea"
se llame a la nota con el noteId correspondiente y se elimine del estado de notes.
Al usar filter, no estamos modificando el estado de notes directamente, si no que estamos creando
un nuevo arreglo que reemplaza al arreglo anterior que tenia la tarea que acabamos de eliminar. */
  }

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  {
    /* Creacion de una variable con utilizacion del metodo sort para ordenar las tareas que estan completadas por debajo de la lista general. */
  }

  const orderByStatus = (notes) => {
    const sortedNotes = [...notes];
    sortedNotes.sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1));
    return sortedNotes;
  };

  {
    /* Handler mas completo, que permite seleccionar las tareas que han sido completadas y permite eliminar al mismo tiempo todas las
tareas que han sido seleccionadas. */
  }

  const handleCompletedTasks = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, status: !note.status } : note
      )
    );
    setSelectedCompletedTasks((prevTasks) =>
      prevTasks.includes(noteId)
        ? prevTasks.filter((id) => id !== noteId)
        : [...prevIds, noteId]
    );
  };

  const deleteCompletedTasks = () => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => !selectedCompletedTasks.includes(note.id))
    );
    setSelectedCompletedTasks([]);
  };

  const handleEditTask = (noteId) => {
    const taskToEdit = notes.find((note) => note.id === noteId);
    setEditTask(noteId);
    setEditedTaskContent(taskToEdit.name);
  };

  const updateTask = (noteId) => {
    const updatedTasks = notes.map((note) =>
      note.id === noteId ? { ...note, name: editedTaskContent } : note
    );
    setNotes(updatedTasks);
    setEditTask(null);
  };

  const cancelUpdateTask = () => {
    setEditTask(null);
    setEditedTaskContent("");
  };

  return (
    <main>
      <h2>TO DO APP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Inserte una nueva tarea..."
          name="text"
          value={newNote.name}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar tarea</button>
      </form>
      {notes.map((note) => (
        <li key={note.id}>
          {editTask === note.id ? (
            <>
              <input
                type="text"
                value={editedTaskContent}
                onChange={(e) => setEditedTaskContent(e.target.value)}
              />
              <button onClick={() => updateTask(note.id)}>Actualizar</button>
              <button onClick={cancelUpdateTask}>Cancelar</button>
            </>
          ) : (
            <>
              {note.name}
              <input
                type="checkbox"
                checked={note.status}
                onChange={() => handleCompletedTasks(note.id)}
              />
              <button onClick={() => deleteNote(note.id)}>
                Eliminar Tarea
              </button>
              <button onClick={() => handleEditTask(note.id)}>
                Editar Tarea
              </button>
            </>
          )}
        </li>
      ))}

      <div>
        <h3>
          Marcar como 'completas' todas las tareas. Y si deseas, eliminarlas
        </h3>
        <button onClick={completedAllNotes}>Finalizar Tareas</button>
        <button onClick={deleteCompletedTasks}>Eliminar Tareas</button>
        <button onClick={() => setNotes(orderByStatus(notes))}>
          Ordenar Tareas
        </button>
      </div>
    </main>
  );
}
