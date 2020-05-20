import React, { useEffect } from 'react';
import TimeAgo from 'react-time-ago';
import { Tooltip } from 'antd';
import { TransactionIcon } from "./transaction/icon";
import { TransactionDetails } from "./transaction/Details";
import { TransactionActions } from "./transaction/Actions";
import './Transaction-item.less';
import { useTimestamp } from "../hooks/timestamp";
import { config } from "../config/config";

export const TransactionItem = (props) => {

  const domRef = React.useRef();
  const [timestamp, setBlockId] = useTimestamp()
  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);
        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);

  useEffect(() => {
    if (props.tx) {
      setBlockId(props.tx.blockId)
    }
  }, [props.tx])

  const className = `Transaction-item ${isVisible ? ' is-visible' : ''}`;

  if (!props.noTxs) {
    return (
      <Tooltip title={<TimeAgo date={new Date(1000 * (Math.floor(new Date(config.epoch) / 1000) + timestamp))}/>}>
        <div ref={domRef} className={className}>
          <TransactionIcon tx={props.tx}/>
          <TransactionDetails tx={props.tx}/>
          <TransactionActions tx={props.tx} setCurrentView={props.setCurrentView}/>
        </div>
      </Tooltip>);
  } else {
    return (<div ref={domRef} className={className}>No transactions</div>);
  }
}
