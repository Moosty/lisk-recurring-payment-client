import { useEffect, useState } from 'react';

export const useSprinkler = (balance) => {

  const [canDoSprinkler, setCanDo] = useState(false);

  useEffect(() => {
    if (balance < 1) {
      setCanDo(true);
    } else {
      setCanDo(false);
    }
  }, [balance]);

  return [canDoSprinkler];
}