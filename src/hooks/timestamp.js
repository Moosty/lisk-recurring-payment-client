import { useState, useEffect } from 'react';
import { config } from "../config/config";

export const useTimestamp = () => {

  const [timestamp, setTimestamp] = useState(null);

  const setBlockId = (id) => {
    fetch(`${config.node}blocks?blockId=${id}`)
      .then(result => result.json())
      .then(data => {
        if (data && data.data) {
          setTimestamp(data.data[0].timestamp);
        }
      })
  }

  return [
    timestamp,
    setBlockId
  ]
}
