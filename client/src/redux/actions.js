export const SET_FAMOUS_IMAGE = "SET_FAMOUS_IMAGE";
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

export const setFamous=createAsyncThunk(
    'SET_FAMOUS_IMAGE',
    async()=>{
           return async function(dispatch) {
           const result= await ImagePicker.launchCameraAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               aspect: [4, 3],
               quality: 1,
            })
            console.log(result);
            if (!result.cancelled) {
                return result.uri  
            }
    
            
            
        }
       } 
    
)






   export const openGallery=async()=>{
       let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1,
        });
        
        console.log(result);
        return async function(dispatch) {
if (!result.cancelled) {
          return dispatch({ type: SET_FAMOUS_IMAGE, 
            payload: result.uri})  
        }
    }
   } 

