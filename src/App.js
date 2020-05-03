import React from 'react';
import { Wallet } from './Wallet'
import './App.less';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: {
        "Alice": { view: "overview", id: null },
        "Bob": { view: "overview", id: null },
      },
      accounts: [
        {
          name: "Alice",
          passphrase: "creek own stem final gate scrub live shallow stage host concert they",
          balance: 123123.32,
          address: "11237980039345381032L",
          publicKey: "5c554d43301786aec29a09b13b485176e81d1532347a351aeafe018c199fd7ca",
          otherPublicKey: "bfdd0ed3914d6e1a3e9a039b6bdfda2b77f727cb708354c3d80d0ea945a8749a",
        },
        {
          name: "Bob",
          passphrase: "detail rose problem pupil they relief rice melt burden day pistol tiger",
          balance: 10000.05,
          address: "11495053542406076001L",
          publicKey: "bfdd0ed3914d6e1a3e9a039b6bdfda2b77f727cb708354c3d80d0ea945a8749a",
          otherPublicKey: "5c554d43301786aec29a09b13b485176e81d1532347a351aeafe018c199fd7ca",

        }
      ],
      contracts: [
        {
          contractId: "12345L",
          timestamp: 123,
          senderPublicKey: "5c554d43301786aec29a09b13b485176e81d1532347a351aeafe018c199fd7ca",
          recipientPublicKey: "bfdd0ed3914d6e1a3e9a039b6bdfda2b77f727cb708354c3d80d0ea945a8749a",
          unit: {
            type: "MINUTES",
            typeAmount: 1,
            amount: '10',
            prepaid: 10,
            total: 100,
            terminateFee: 5,
          },
          state: "REVIEW_RECIPIENT",
        },
        {
          contractId: "23409304934L",
          timestamp: 323,
          senderPublicKey: "bfdd0ed3914d6e1a3e9a039b6bdfda2b77f727cb708354c3d80d0ea945a8749a",
          recipientPublicKey: "5c554d43301786aec29a09b13b485176e81d1532347a351aeafe018c199fd7ca",
          unit: {
            type: "HOURS",
            typeAmount: 1,
            amount: '100',
            prepaid: 1,
            total: 100,
            terminateFee: 1,
          },
          state: "ACTIVE",
        }
      ],
      txs: [
        {
          type: 123,
          senderId: '11237980039345381032L',
          asset: {
            contractId: "12345L",
            timestamp: 123,
            senderPublicKey: "5c554d43301786aec29a09b13b485176e81d1532347a351aeafe018c199fd7ca",
            recipientPublicKey: "bfdd0ed3914d6e1a3e9a039b6bdfda2b77f727cb708354c3d80d0ea945a8749a",
            unit: {
              type: "MINUTES",
              typeAmount: 1,
              amount: '10',
              prepaid: 10,
              total: 100,
              terminateFee: 5,
            },
          },
        },
        {
          type: 123,
          senderId: '11495053542406076001L',
          asset: {
            contractId: "23409304934L",
            timestamp: 323,
            senderPublicKey: "bfdd0ed3914d6e1a3e9a039b6bdfda2b77f727cb708354c3d80d0ea945a8749a",
            recipientPublicKey: "5c554d43301786aec29a09b13b485176e81d1532347a351aeafe018c199fd7ca",
            unit: {
              type: "HOURS",
              typeAmount: 1,
              amount: '100',
              prepaid: 1,
              total: 100,
              terminateFee: 1,
            },
            data: '{}',
          },
        },
        {
          type: 124,
          senderId: '11237980039345381032L',
          asset: {
            contractId: "23409304934L",
            accept: false,
            unit: {
              typeAmount: 2,
            },
            data: '{}',
          },
        },
        {
          type: 124,
          senderId: '11495053542406076001L',
          asset: {
            contractId: "23409304934L",
            accept: true,
            data: '{}',
          },
        },
        {
          type: 125,
          senderId: '11237980039345381032L',
          asset: {
            contractId: "23409304934L",
            unit: 1,
            amount: 100,
            data: '{}',
          },
        },
        {
          type: 125,
          senderId: '11237980039345381032L',
          asset: {
            contractId: "23409304934L",
            unit: 2,
            amount: 100,
            data: '{}',
          },
        },
        {
          type: 8,
          senderId: '11237980039345381032L',
          asset: {
            recipientId: "23409304934L",
            amount: 2000,
            data: '{}',
          },
        },
        {
          type: 8,
          senderId: '11237980039345381032L',
          asset: {
            recipientId: "23409304934L",
            amount: 200,
            data: '{}',
          },
        },
      ],
    }
  }

  setView(id, view, viewId = null) {
    console.log(id, view, viewId)
    this.setState({
      currentView: { ...this.state.currentView, [id]: { view: view, id: viewId }}
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Wallet className="Wallet"
                  contracts={this.state.contracts}
                  currentView={this.state.currentView[this.state.accounts[0].name].view}
                  viewId={this.state.currentView[this.state.accounts[0].name].id}
                  setView={this.setView.bind(this)}
                  txs={this.state.txs}
                  account={this.state.accounts[0]}
          />
          <Wallet className="Wallet"
                  contracts={this.state.contracts}
                  currentView={this.state.currentView[this.state.accounts[1].name].view}
                  viewId={this.state.currentView[this.state.accounts[1].name].id}
                  setView={this.setView.bind(this)}
                  txs={this.state.txs}
                  account={this.state.accounts[1]} />
        </header>
      </div>
    );
  }
}

export default App;
