import React, { useState } from "react";

export const TodoSidebarContext = React.createContext();

export function TodoSidebarContextProvider(props) {
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const contextValue = {
    showSideBar,
    setShowSideBar,
    selectedTask,
    setSelectedTask,
  };

  return (
    <TodoSidebarContext.Provider value={contextValue}>
      {props.children}
    </TodoSidebarContext.Provider>
  );
}
