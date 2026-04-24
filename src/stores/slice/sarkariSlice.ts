import { createSlice } from "@reduxjs/toolkit";

interface sarkarSlice{
  isDailogOpen: boolean;
  refreshToggle: boolean;
}

const initialState : sarkarSlice = {
  isDailogOpen: false,
  refreshToggle: false
}


const sarkarSlice = createSlice({
    name : 'sarkarSlice',
        initialState,
        reducers: {
        openDailog: (state) =>{
                state.isDailogOpen = true;
        },
        closeDailog: (state)=>{
                state.isDailogOpen = false;
        },
        refreshToggle: (state)=>{
                state.refreshToggle = !state.refreshToggle;
        }
        }
        });


export const {closeDailog,openDailog,refreshToggle} = sarkarSlice.actions;
export default sarkarSlice.reducer;