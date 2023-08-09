export const saveTasksToLocalStorage = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const loadTasksFromLocalStorage = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};
