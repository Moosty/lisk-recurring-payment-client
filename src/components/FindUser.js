import React, { useState } from 'react';
import { Select } from 'antd';
import _ from 'lodash';
import { config } from "../config/config";

export const FindUser = (props) => {
  const [data, setData] = useState([{text: "tester",}]);
  const [value, setValue] = useState(null);
  const {Option} = Select;

  function fetcher(value) {
    fetch(`${config.node}accounts?username=${value}`)
      .then(response => response.json())
      .then(d => {
        if (d.data && d.data[0] && _.findIndex(data, {text: d.data[0].username}) === -1) {
          setData([...data, {text: d.data[0].username, value: d.data[0].publicKey}]);
        }
      });

  }

  const handleSearch = (value) => {
    if (value) {
      fetcher(value);
    } else {
      setData([]);
    }
  };

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
      onChange={setValue}
      notFoundContent={null}
    >
      {options}
    </Select>
  );

}
