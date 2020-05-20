import { useState } from "react";

export const useView = () => {

  const [currentView, setView] = useState({
    view: "overview",
  });

  const setCurrentView = (view, args) => {
    setView({view: view, ...args});
  }

  return [
    currentView, setCurrentView
  ]
}
