/* global BigInt */
import { useEffect, useState } from 'react';

export const useSprinkler = (balance) => {

  const [canDoSprinkler, setCanDo] = useState(false);

  useEffect(() => {
    if (BigInt(balance) < BigInt(8 ** 10)) {
      setCanDo(true);
    } else {
      setCanDo(false);
    }
  }, [balance]);

  return [canDoSprinkler];
}
