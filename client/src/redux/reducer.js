import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Platform } from 'react-native';
import axios from 'axios';
import {NOMADA_API_KEY, MOVIEDB_API_KEY} from "react-native-dotenv"

const initialState={
    famousImage:null,
    response:{},
    famousDetails:{},
    error:null,
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
                            "Nomada":`${NOMADA_API_KEY}`,
            },
              })
              console.log(quienEs.data)
            return quienEs.data
        }catch(e){
            console.log(e.error)
            return {error:"Error al obtener el nombre"}
        }
    }
    )
    export const getFamousDetails = createAsyncThunk(
        'getFamousDetails',
        async ( name, {rejectWithValue})=>{
            const BASE_URL = `https://api.themoviedb.org/3/search/person`
        const API_KEY = `api_key=${MOVIEDB_API_KEY}`
        const QUERY = `query=${name}`
        try{
            const details = await axios({
                method: "get",
                url: `${BASE_URL}?${API_KEY}&${QUERY}`,
            })
            console.log("DETAILS",details.data)
            return details.data
        }catch(e){
            return rejectWithValue(e)
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
            state.response = {},
            state.famousDetails={},
            state.error=null

        }
    },
    extraReducers:{
        [getFamousName.pending]: (state)=>{
            console.log("pending")
        },
        [getFamousName.fulfilled ]: (state, {payload})=>{
            state.loading=false
            state.response = payload
            state.error=null
        },
        [getFamousName.rejected]: (state, {payload})=>{

            state.loading=false            
            state.error = "Some sort of error"
        },
        [getFamousDetails.pending]: (state)=>{
            console.log("asking for details")
        },
        [getFamousDetails.fulfilled]: (state, {payload})=>{
            state.famousDetails = payload
        },
        [getFamousDetails.rejected]: (state, {payload})=>{
            state.error= "Some sort of error"
        }
    }
})


export const { setFamousImage,cleanState } = reducerSlice.actions
export default reducerSlice.reducer; 