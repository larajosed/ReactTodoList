import React, { useState } from "react";

export const TodoFormContext = React.createContext();

export function TodoFormContextProvider(props) {
  const [showModal, setShowModal] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const contextValue = {
    showModal,
    setShowModal,
    refreshTasks,
    setRefreshTasks,
    taskToEdit,
    setTaskToEdit,
    showInfo,
    setShowInfo,
    showSideBar,
    setShowSideBar,
    selectedTask,
    setSelectedTask,
  };

  return (
    <TodoFormContext.Provider value={contextValue}>
      {props.children}
    </TodoFormContext.Provider>
  );
}
