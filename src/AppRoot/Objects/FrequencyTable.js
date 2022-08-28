import { Badge, Descriptions } from 'antd';

const FrequencyTable = () => (
  <Descriptions bordered>
    <Descriptions.Item label="Product Arrives at">  19:00:00</Descriptions.Item>
    <Descriptions.Item label="Product Comes from the Depot at"> 15:00:00</Descriptions.Item>
    <Descriptions.Item label="Transportation fee">17.55$</Descriptions.Item>
    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
    <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="A new pile of products is currently upcoming" />
    </Descriptions.Item>
    <Descriptions.Item label="Satisfactory supplies">2345</Descriptions.Item>
    <Descriptions.Item label="Failed">67</Descriptions.Item>
    <Descriptions.Item label="Compenstaion">$60.00</Descriptions.Item>
    <Descriptions.Item label="Company Info">
      Company Name : Bushida
      <br />
      Workers Count: 12352
      <br />
      Average Salary: 2000$
      <br />
      Rates: 4.3 stars
      <br />
      Replication factor: 3
      <br />
      Region: North Kazakhstan<br />
    </Descriptions.Item>
  </Descriptions>
);

export {FrequencyTable};