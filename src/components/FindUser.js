import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { config } from "../config/config";

export const FindUser = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(props.value);
  const {Option} = Select;

  const fetcher = (value) => {
    if (value) {
      fetch(`${config.extendedNode}username/${value}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            setData(data.map(d => {
              return {text: d.username, value: d.publicKey}
            }))
          }
        });
    }
  }

  const fetcherReverse = (value) => {
    if (value) {
      fetch(`${config.node}accounts/?publicKey=${value}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.data && data.data[0]) {
            setData([{text: data.data[0].username, value: value}]);
          }
        });
    }
  }

  const setValueHandle = (value) => {
    setValue(value);
    props.setValue(value);
  }

  const handleSearch = (value) => {
    if (value) {
      fetcher(value);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    fetcherReverse(props.value);
    setValue(props.value)
  }, [props.value])

  const options = data.map(d => <Option key={`${d.value}-option`} value={d.value}>{d.text}</Option>);

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={setValueHandle}
      notFoundContent={null}
    >
      {options}
    </Select>
  );

}
