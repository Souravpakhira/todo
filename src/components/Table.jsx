import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import enUS from 'antd/lib/locale/en_US';
import {
  Button,
  Tag,
  Space,
  ConfigProvider,
  Popconfirm,
  message,
  Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import 'antd/dist/antd.css';
import '@ant-design/pro-table/dist/table.css';
import Form from './Form';
import { update, remove } from '../store/todoSlice';

const Table = () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const ref = useRef();
  const selectorData = useSelector((state) => state.todo);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setTableData(selectorData);
  }, [selectorData]);

  const columns = [
    {
      title: 'TimeStamp',
      dataIndex: 'timestamp',
      valueType: 'dateTime',
      width: 220,
      defaultSortOrder: 'descend',
      showSorterTooltip: false,
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      sortDirections: ['ascend', 'descend'],
      editable: false,
      search: false,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 200,
      showSorterTooltip: false,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 350,
      search: false,
      showSorterTooltip: false,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      valueType: 'date',
      showSorterTooltip: false,
      sorter: (a, b) => new Date(a.due_date) - new Date(b.due_date),
      sortDirections: ['ascend', 'descend'],
      align: 'center',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      search: true,
      render: (data) => (
        <Space
          style={{
            width: 200,
            flexWrap: 'wrap',
          }}
        >
          {data.length > 0 ? (
            data.map((tag) => (
              <Tag color='green' key={tag}>
                {tag}
              </Tag>
            ))
          ) : (
            <span style={{ position: 'absolute', left: '48%', top: '17.9px' }}>
              -
            </span>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      width: 100,
      dataIndex: 'status',
      search: true,
    },
    {
      title: 'Options',
      width: 180,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, record, _, action) => [
        <Tooltip title='Edit' key={record.id}>
          <Button
            type='primary'
            shape='square'
            key='editable'
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            <EditOutlined />
          </Button>
        </Tooltip>,
        <Popconfirm
          key={record.id}
          title='Do you want to delete this todo?'
          onConfirm={() => {
            dispatch(remove(record.id));
            message.success('Todo deleted successfully!');
          }}
          okText='Yes'
          cancelText='No'
        >
          <Tooltip title='Delete'>
            <Button type='danger' shape='square'>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        actionRef={ref}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 'max-content' }}
        style={{ padding: '20px 30px' }}
        rowKey='id'
        search={{
          filterType: 'query',
          searchText: 'Search',
          resetText: 'Clear',
        }}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
        }}
        onSubmit={(e) => {
          let searchData = [];
          console.log(e);
          if (e && e.title) {
            const data = tableData.filter(
              (item) => item.title.toLowerCase() === e.title.toLowerCase()
            );
            searchData = [...data];
          }
          if (e && e.due_date) {
            const data = tableData.filter(
              (item) => item.due_date === e.due_date
            );
            searchData = [...data, ...searchData];
          }
          if (e && e.tags) {
            const data = tableData.filter((item) => {
              return item.tags.some((t) => t === e.tags);
            });
            searchData = [...data, ...searchData];
          }
          if (e && e.status) {
            const data = tableData.filter((item) => item.status === e.status);
            searchData = [...data, ...searchData];
          }

          setTableData(searchData);
        }}
        onReset={() => {
          setTableData(selectorData);
        }}
        dateFormatter='string'
        headerTitle='Todo'
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            if (typeof data.tags === 'string') {
              const tags = data?.tags.replaceAll(' ', '');
              const temp = tags.split(',');
              data.tags = [...new Set(temp)];
            }
            dispatch(update(data));
            message.success('Todo updated successfully!');
          },
          onCancel: async (rowKey, data, row) => {},
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => {
            // console.log(row, config, defaultDom);
            return [defaultDom.save, defaultDom.cancel];
          },
        }}
        options={false}
        toolBarRender={() => [<Form tableRef={ref} />]}
      />
    </ConfigProvider>
  );
};

export default Table;
