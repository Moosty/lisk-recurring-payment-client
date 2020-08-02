import { useState, useEffect } from 'react';

export const useName = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, []);

  return [name, setName];
};
