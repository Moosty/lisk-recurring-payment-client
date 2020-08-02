import React, { useEffect } from 'react';
import { useTimestamp } from "../../../hooks/timestamp";
import { Timeline } from "antd";
import { config } from "../../../config/config";
import './HistoryItem.less';
export const HistoryItem = ({tx, className, lastId}) => {
  const [timestamp, setBlockId] = useTimestamp();
  const [timestampLast, setBlockIdLast] = useTimestamp();
  const types = {
    13010: "Created contract",
    13020: "Reviewed contract",
    13030: "Funded contract",
    13040: "Requested payment",
    13050: "Terminated contract",
    99999: "Contract Ended",
  }
  const colors = {
    13010: "green",
    13020: "blue",
    13030: "orange",
    13040: "green",
    13050: "red",
    99999: "green",
  }

  useEffect(() => {
    if (tx.blockId) {
      setBlockId(tx.blockId);
    }
    if (lastId) {
      setBlockIdLast(lastId);
    }
  }, [tx]);

  const date = new Date(1000 * (Math.floor(new Date(config.epoch) / 1000) + timestamp)).toDateString();
  const time = new Date(1000 * (Math.floor(new Date(config.epoch) / 1000) + timestamp)).toLocaleTimeString();
  const last = new Date(1000 * (Math.floor(new Date(config.epoch) / 1000) + timestampLast)).toDateString();
  return <Timeline.Item
    className={className}
    color={colors[tx.type]}
    label={`${last === date ? time : date }`}>
    {types[tx.type]}
  </Timeline.Item>;
}
