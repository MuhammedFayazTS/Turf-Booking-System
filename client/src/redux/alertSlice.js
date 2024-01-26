import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({

    name:"alerts",
    initialState:{
        loading:false,
        refresh:false,
    },
    reducers:{
        showLoading:(state,action)=>{
            state.loading = true;
        },
        hideLoading:(state,action)=>{
            state.loading = false;
        },
        addRefresh:(state)=>{
            state.refresh = !state.refresh;
        }
    }

})


export const { showLoading, hideLoading,addRefresh } = alertSlice.actions

