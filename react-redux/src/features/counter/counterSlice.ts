import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type Status = 'idle' | 'loading' | 'failed';

interface CounterState {
    value: number;
    status: Status;
}

const initialState: CounterState = { value: 0, status: 'idle' };

export const incrementAsync = createAsyncThunk(
    'counter/incrementAsync',
    async (amount: number) => {
        await new Promise((r) => setTimeout(r, 500));
        return amount;
    }
);

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        reset: (state) => {
            state.value = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { increment, decrement, incrementByAmount, reset } =
    counterSlice.actions;

export default counterSlice.reducer;
