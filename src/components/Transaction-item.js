import React from 'react';
import './Transaction-item.less';
import { TransactionIcon } from "./transaction/icon";
import { TransactionDetails } from "./transaction/Details";
import { TransactionActions } from "./transaction/Actions";

export const TransactionItem = (props) => {

  const domRef = React.useRef();

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

  const className = `Transaction-item ${isVisible ? ' is-visible' : ''}`;

  if (!props.noTxs) {
    return (<div ref={domRef} className={className}>
      <TransactionIcon type={props.tx.type} />
      <TransactionDetails tx={props.tx} />
      <TransactionActions tx={props.tx} />
    </div>);
  } else {
    return (<div ref={domRef} className={className}>No transactions</div>);
  }
}
