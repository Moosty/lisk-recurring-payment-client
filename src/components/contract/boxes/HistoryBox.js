import React from 'react';
import _ from 'lodash';
import { Timeline } from "antd";
import { useContractTransactions } from "../../../hooks/contractTransactions";
import { HistoryItem } from "./HistoryItem";

export const HistoryBox = (props) => {

  const [transactions] = useContractTransactions(props.contractPublicKey);
  const txs = _.orderBy(transactions, ['height'], ['desc']);
  const items = txs.map((tx, i) => {
    return (
      <HistoryItem {...props} lastId={txs[i - 1] ? txs[i - 1].blockId : null} key={tx.id} tx={tx}/>
    );
  });
  if (txs.length > 0 && props.contract.asset.state === "ENDED") {
    items.unshift(<HistoryItem {...props} lastId={txs[txs.length-1].blockId} key={"ended-history"} tx={{type: 99999, blockId: txs[txs.length-1].blockId}}/>)
  }
  return (
    <div style={{width: "100%"}}>
      {items.length > 0 && <Timeline mode={`alternate`} style={{width: "100%"}}>
        {items}
      </Timeline>}
    </div>
  );
}
