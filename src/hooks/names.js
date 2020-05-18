import { memo, useState, useEffect } from 'react';

export const useName = (id) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, []);

  return [name, setName];
};
