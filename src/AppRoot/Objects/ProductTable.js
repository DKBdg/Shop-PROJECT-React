/*        let CartData=[];
    for(let i = 0 ; i<Current.Cart.length;i++ ){
        CartData.push({ProductID:Current.Cart[i].ProductID,ProductName:Current.Cart[i].ProductName,CategoryID:Current.Cart[i].Details.CategoryID,
            Color:Current.Cart[i].Details.Color,Price:Current.Cart[i].Price,Currency: Current.Cart[i].Currency,
            Company: Current.Cart[i].Company,Description:Current.Cart[i].Details.Description 
            ,Key:Current.Cart[i].Key});
    }
    
    console.log(CartData,1111);*/

import 'antd/dist/antd.css';
import '../../App.css';
import { observer } from 'mobx-react-lite';
import ShopStore from '../Stores/ShopStore';

import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const ProductTable = observer(({Current,TotalChange}) => {

    let CartData=[];
    for(let i = 0 ; i<Current.Cart.length;i++ ){
        CartData.push({ProductID:Current.Cart[i].ProductID,ProductName:Current.Cart[i].ProductName,CategoryID:Current.Cart[i].Details.CategoryID,
            Color:Current.Cart[i].Details.Color,Price:Current.Cart[i].Price,Currency: Current.Cart[i].Currency,
            Company: Current.Cart[i].Company,Description:Current.Cart[i].Details.Description 
            ,key:i});
    }
    
    
    const [dataSource, setDataSource] = useState(CartData);
    const [count, setCount] = useState(2);
    
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);

        ShopStore.DeleteCartProductByKey(key);
        TotalChange(ShopStore.GetTotal(ShopStore.GetCurrentUser()));
        setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'Key',
      dataIndex: 'key',
      width: '30%'
    },
    {
      title: 'ProductID',
      dataIndex: 'ProductID',
    },
    {
      title: 'ProductName',
      dataIndex: 'ProductName',
    },
    {
        title: 'Color',
        dataIndex: 'Color',
      },
      {
        title: 'Company',
        dataIndex: 'Company',
      },
      {
        title: 'Description',
        dataIndex: 'Description',
      },
      {
        title: 'Price',
        dataIndex: 'Price',
      },
      {
        title: 'Currency',
        dataIndex: 'Currency',
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];



  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
});

export {ProductTable};