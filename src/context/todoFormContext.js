import React, { createContext, useState } from "react";

export const TodoFormContext = React.createContext();

export function TodoFormContextProvider(props) {
  const [showModal, setShowModal] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const contextValue = {
    showModal,
    setShowModal,
    refreshTasks,
    setRefreshTasks,
    taskToEdit,
    setTaskToEdit,
  };

  return (
    <TodoFormContext.Provider value={contextValue}>
      {props.children}
    </TodoFormContext.Provider>
  );
}
