import { createSlice } from '@reduxjs/toolkit'
import { SET_FAMOUS_IMAGE } from "./actions";


const initialState={
    famousImage:null,
}
const reducerSlice = createSlice({
    name: 'reducer',
    initialState: initialState,
    reducers: {
        setFamousImage: (state, action) => {
            state.famousImage = action.payload
        }
    }
})


export const { setFamousImage } = reducerSlice.actions
export default reducerSlice.reducer; 