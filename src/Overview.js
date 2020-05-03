import React from "react";
import _ from 'lodash';
import { List, Button, Skeleton, Avatar, Icon } from 'antd';
import reqwest from 'reqwest';
import { ContainerOutlined, HistoryOutlined, DollarOutlined,AuditOutlined, } from '@ant-design/icons';

import './Wallet.less';

const avatars = {
  '124-a': <Avatar icon={<ContainerOutlined/>} style={{backgroundColor: '#87d068'}}/>,
  '124-b':  <Avatar icon={<ContainerOutlined/>} style={{backgroundColor: '#ffcc00'}}/>,
  123: <Avatar icon={<AuditOutlined/>} style={{backgroundColor: '#87d068'}}/>,
  125: <Avatar style={{backgroundColor: '#87d068'}} icon={<HistoryOutlined/>}/>,
  8: <Avatar style={{backgroundColor: '#ff0000'}} icon={<DollarOutlined/>}/>,
};

const titles = {
  124: "Review Recurring Payment",
  123: "Created Recurring Payment",
  125: "Request Recurring Payment",
  8: "Transfer",
}
export class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,
      loading: false,
      data: [],
      list: [],
    }
  }

  componentDidMount() {
    this.getData(res => {
      const list = _.shuffle(res);
      this.setState({
        initLoading: false,
        data: list,
        list: list,
      });
    });
  }

  getData = callback => {

        setTimeout(() => {
          callback(this.props.txs);
        }, 500);
  };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([5].map(() => ({ loading: true, name: {} }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(_.shuffle(res));
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>load more</Button>
        </div>
      ) : null;

    return (
      <div className={`Overview`}>
        <List
          className="OverviewList"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          split={true}
          renderItem={item => {
            const avatar = item.type === 124 ? item.asset.accept ? avatars['124-a'] : avatars['124-b'] : avatars[item.type];
            const title = titles[item.type];
            return (
              <List.Item
                actions={[item.type !== 8 ? <a key="view" onClick={() => this.props.setView(this.props.account.name, 'contract', item.asset.contractId)}>view</a> : `----`]}
              >
                <Skeleton avatar title={true} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={avatar}
                    title={title}
                    description={randomDate(new Date(2020, 0, 1), new Date())}
                  />
                </Skeleton>
                <div style={{textAlign: "right"}}>
                  <b>{item.type !== 124 ? 'Amount' : item.asset && item.asset.accept ? "Accepted" : "Updated"}</b><br />
                  <i>{item.asset && item.asset.amount ? `${item.asset.amount} LSK` : item.asset && item.asset.unit && item.asset.unit.amount ? `${item.asset.unit.amount} LSK` : ""}</i>
                </div>
              </List.Item>
            )
          }}
        />
      </div>
    )
  }
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
}
