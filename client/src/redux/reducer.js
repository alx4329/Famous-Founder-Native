import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState={
    famousImage:null,
    response:{},
    loading:false
}

export const getFamousName = createAsyncThunk(
    'getFamousName',
    async (image, {rejectWithValue})=>{
        try{
            console.log("action")
            let file = new FormData();
            file.append('file', {
                name: 'image',
                type: image.type,
                uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
              });
            const quienEs= await axios({
                method: "post",
                url: "https://whois.nomada.cloud/upload",
                data:file,
                headers: { "Content-Type": `multipart/form-data`,
                            "Nomada":"YzNmNzEyODYtYjlkZS00NjY3LTk5M2YtNDRlYzJkYTMxMDFk"
            },
              })
            return quienEs.data
        }catch(e){
            return rejectWithValue([],e)
        }
    }
)
const reducerSlice = createSlice({
    name: 'reducer',
    initialState: initialState,
    reducers: {
        setFamousImage: (state, action) => {
            state.famousImage = action.payload
        },
        cleanState: (state, action) => {
            state.famousImage = null,
            state.response = {}

        }
    },
    extraReducers:{
        [getFamousName.pending]: (state)=>{
            state.loading=true
        },
        [getFamousName.fulfilled ]: (state, {payload})=>{
            state.loading=false
            state.response = payload
        },
        [getFamousName.rejected]: (state, {payload})=>{
            state.loading=false            
            state.response = payload
        }
    }
})


export const { setFamousImage,cleanState } = reducerSlice.actions
export default reducerSlice.reducer; 