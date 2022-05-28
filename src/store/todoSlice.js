import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // {
  //   id: '755c5e84-7e81-4aa8-8b62-036977a38eb4',
  //   title: 'test-demo-soemthing',
  //   description: 'test1',
  //   timestamp: '2022-02-04T12:36:50.515284Z',
  //   due_date: '2022-02-01',
  //   tags: ['ad', 'asdas', 'dsa', 'd'],
  //   status: 'WORKING',
  // },
  // {
  //   id: '1afdf977-650a-406a-870a-e326e62e245f',
  //   title: 'test2',
  //   description: 'testr222',
  //   timestamp: '2022-02-04T12:45:02.733595Z',
  //   due_date: '2022-02-25',
  //   tags: ['t1', 't3', 't2'],
  //   status: 'DONE',
  // },
  // {
  //   id: '34599e59-3f23-47f6-a4ea-9f90b15424d6',
  //   title: 'Test new',
  //   description: 'Great job',
  //   timestamp: '2022-02-04T19:57:42.182431Z',
  //   due_date: '2022-02-27',
  //   tags: ['Tag sample'],
  //   status: 'WORKING',
  // },
  // {
  //   id: '787ebfb1-c341-4691-b5f5-e3cd1cbc8949',
  //   title: 'hahahah',
  //   description: 'bjkkdajkda',
  //   timestamp: '2022-05-20T11:52:13.481635Z',
  //   due_date: '2022-05-19',
  //   tags: [],
  //   status: 'OPEN',
  // },
];

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    update(state, action) {
      const newState = state.map((item) =>
        item.id === action.payload.id ? { ...action.payload } : item
      );
      return newState;
    },
  },
});

export const { add, remove, update } = todoSlice.actions;

export default todoSlice.reducer;
