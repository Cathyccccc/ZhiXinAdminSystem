import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import selectMap from '../selectMap';
import moment from 'moment';

const EditableContext = React.createContext(null);

// 编辑行
export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// 编辑单元格
export const EditableCell = ({
  title,
  editable,
  children,
  type,
  dataIndex,
  record,
  rules,
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
    if (type == 'dateNode') {
      form.setFieldsValue({
        [dataIndex]: moment(record[dataIndex]), // 处理过的日期为普通字符串，点击修改时，需要改成日期格式，否则报错
      })
    } else {
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
  };
  const save = async () => {
    try { // 验证通过
      const values = await form.validateFields([dataIndex]);
      if (values[dataIndex] != record[dataIndex]) { // 新值和旧值不同
        toggleEdit();
        handleSave({ // 更新数据
          _id: record._id,
          type: dataIndex,
          updateVal: values[dataIndex]
        });
      } else { // 新值和旧值相同，失去焦点
        setEditing(!editing);
      }
    } catch (errInfo) { // 验证没有通过
      setEditing(!editing); // 值和维持原来的值
    }
  };
  const nodeList = [
    {
      type: 'selectNode',
      render: (
        <Select ref={inputRef} onChange={save} onBlur={save}>
          {selectMap[dataIndex] && selectMap[dataIndex].map((item, index) => (item && <Select.Option key={index} value={dataIndex === 'education' ? index + 1 : index}>{selectMap[dataIndex][index]}</Select.Option>))}
        </Select>
      )
    },
    {
      type: 'dateNode',
      render: (
        <DatePicker ref={inputRef} onChange={save} onBlur={save} />
      )
    },
    {
      type: 'inputNode',
      render: (
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      )
    }
  ]
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={rules}
      >
        {nodeList.find(item => item.type == type).render}
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
