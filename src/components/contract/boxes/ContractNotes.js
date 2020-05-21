import React from 'react';
import { useContractTransactions } from "../../../hooks/contractTransactions";
import './ContractNotes.less'
export const ContractNotes = ({contractPublicKey}) => {

  const [transactions] = useContractTransactions(contractPublicKey);

  const filterd = transactions.filter(tx => tx.asset.data);
  return <ol className="ContractNotesList">
    {filterd.map(tx => {
      return <li key={tx.id}>{tx.asset.data}</li>
    })}
  </ol>;
}
