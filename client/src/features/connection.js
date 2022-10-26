import { createSlice } from '@reduxjs/toolkit';

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: { value: false },
    reducers: {
        isConnected: (state) => {
            state.value = true;
        },
        isNotConnected: (state) => {
            state.value = false;
        }
    }
});

export const { isConnected, isNotConnected } = connectionSlice.actions;

export default connectionSlice.reducer;