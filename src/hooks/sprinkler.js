/* global BigInt */
import { useEffect, useState } from 'react';

export const useSprinkler = (balance) => {

  const [canDoSprinkler, setCanDo] = useState(false);

  useEffect(() => {
    if (BigInt(balance) < BigInt(10 ** 8)) {
      setCanDo(true);
    } else {
      setCanDo(false);
    }
  }, [balance]);

  return [canDoSprinkler];
}
