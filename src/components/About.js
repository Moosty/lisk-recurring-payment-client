import React from 'react';
import { Typography, Divider } from 'antd';
import './About.less';

const {Title, Paragraph, Text} = Typography;

export const About = (props) => {

  return (
    <div className="AboutContainer">
      <div className="About">
        <Typography>
          <Title>Recurring Payments</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus ea laboriosam molestiae
            voluptates.
            Ad architecto <Text code>axure</Text> cumque cupiditate esse ipsam magni perferendis voluptas? Accusamus
            accusantium, distinctio ipsum
            iusto quae quam.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus ea laboriosam molestiae
            voluptates.
            Ad architecto <Text code>axure</Text> cumque cupiditate esse ipsam magni perferendis voluptas? Accusamus
            accusantium, distinctio ipsum
            iusto quae quam.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus ea laboriosam molestiae
            voluptates.
            Ad architecto <Text code>axure</Text> cumque cupiditate esse ipsam magni perferendis voluptas? Accusamus
            accusantium, distinctio ipsum
            iusto quae quam.
          </Paragraph>
          <Title level={2}>Guidelines and Resources</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus ea laboriosam molestiae
            voluptates.
            Ad architecto <Text code>axure</Text> cumque cupiditate esse ipsam magni perferendis voluptas? Accusamus
            accusantium, distinctio ipsum
            iusto quae quam.
          </Paragraph>
        </Typography>
      </div>
    </div>);
}
