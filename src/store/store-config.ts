// store/store-config.ts
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departments-slice';
import employeeReducer from './employees-slice';
import userSlice from './create-slice';
import clientsReducer from './clients-slice';
import shiftsReducer from './shif-slice';
import employeeAddReducer from './create-slice';
import shiftPostReducer from './shif-post/post';
import ShiftDelete from './shif-delete'
import editShift from './shift-edit';
import companyGet from './company-get'; 

export const store = configureStore({
  reducer: {
    user: userSlice,
    employee: employeeReducer,
    clients: clientsReducer,
    shifts: shiftsReducer,
    department: departmentReducer,
    employeedAdd: employeeAddReducer,
    shiftPost: shiftPostReducer, 
    shift: ShiftDelete,
    shiftEdit: editShift,
    company: companyGet 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
