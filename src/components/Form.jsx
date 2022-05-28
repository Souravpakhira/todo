import React from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useDispatch } from 'react-redux';
import { add } from '../store/todoSlice';
import moment from 'moment';
import { nanoid } from 'nanoid';

const Form = ({ tableRef }) => {
  const dispatch = useDispatch();

  function disabledDate(current) {
    console.log(current);
    // Can not select days before today and today
    // return current && current < moment().endOf('day');
    return current && current.valueOf() < Date.now();
  }
  return (
    <ModalForm
      title='Create a new Todo'
      trigger={
        <Button type='primary' style={{ marginLeft: '10%' }}>
          Add
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={(values) => {
        console.log('enter', values);
        if (values.tags === undefined || values.tags.trim().length === 0) {
          values.tags = [];
        } else {
          const tags = values.tags.replaceAll(' ', '');
          const temp = tags.split(',');
          values.tags = [...new Set(temp)];
        }
        if (
          values.due_date === undefined ||
          values.due_date.trim().length === 0
        ) {
          values.due_date = null;
        }
        values.timestamp = moment().toISOString();
        values.id = nanoid();
        tableRef.current.reload();
        dispatch(add(values));
        message.success('Todo added!');
        return true;
      }}
    >
      <ProFormText
        name='title'
        label='Task Title'
        tooltip='Example : Todo1'
        placeholder='Enter title here'
        rules={[{ required: true, message: 'Please enter the title!' }]}
      />
      <ProFormTextArea
        name='description'
        label='Description'
        tooltip='Example : Todo description'
        placeholder='Enter Description'
        rules={[{ required: true, message: 'Please enter the description!' }]}
      />
      <ProForm.Group style={{ width: '100%' }}>
        <ProFormSelect
          width='sm'
          name='status'
          label='Select task opration'
          defaultValue='WORKING'
          options={[
            { label: 'OPEN', value: 'OPEN' },
            { label: 'WORKING', value: 'WORKING' },
            { label: 'DONE', value: 'DONE' },
            { label: 'OVERDUE', value: 'OVERDUE' },
          ]}
          placeholder='Select a task operation'
          rules={[
            { required: true, message: 'Please select a task operation' },
          ]}
        />
        <ProFormDatePicker
          name='due_date'
          label='Pick a due Date'
          width='sm'
          format='YYYY-MM-DD'
          disabledDate={() => disabledDate(moment().format('YYYY-MM-DD'))}
        />

        <ProFormText
          name='tags'
          label='Enter Tags'
          tooltip='Example : Tag1, Tag2'
          placeholder='Tag1, Tag2'
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default Form;
