import React from 'react';
import { ContractItemIcon } from "./contract/ItemIcon";
import { ContractItemDetails } from "./contract/ItemDetails";
import { ContractItemActions } from "./contract/ItemActions";
import './Contract-item.less';

export const ContractItem = (props) => {

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

  let stateClass = "Status-";
  if (props.contract) {
    switch (props.contract.asset.state) {
      case "SENDER_REVIEW":
        stateClass += props.contract.asset.senderPublicKey === props.publicKey ? "review" : "review-other";
        break;
      case "RECIPIENT_REVIEW":
        stateClass += props.contract.asset.recipientPublicKey === props.publicKey ? "review" : "review-other";
        break;
      case "ACCEPTED":
        stateClass += "accepted";
        break;
      case "ACTIVE":
        stateClass += "active";
        break;
      case "ENDED":
        stateClass += "ended";
        break;
      case "TERMINATED_SENDER":
        stateClass += "terminated";
        break;
      case "TERMINATED_RECIPIENT":
        stateClass += "terminated";
        break;
      default:
        stateClass += "unknown";
    }
  }
  const className = `Contract-item ${isVisible ? ' is-visible' : ''}`;

  if (!props.noCts) {
    return (<div ref={domRef} className={className}>
      <ContractItemIcon contract={props.contract} />
      <ContractItemDetails contract={props.contract} publicKey={props.publicKey} />
      <ContractItemActions contract={props.contract} setCurrentView={props.setCurrentView}/>
    </div>);
  } else {
    return (<div ref={domRef} className={className}>No contracts</div>);
  }
}
