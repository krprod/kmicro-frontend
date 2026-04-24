import type { AddressFormType } from "@/core/modals/userT";
import { createSlice } from "@reduxjs/toolkit";


/* interface DialogStore {
  isOpen: boolean
  openDialog: () => void
  closeDialog: () => void
} */
interface userSlice{
  addresses: AddressFormType[];
}

const initialState : userSlice = {
  addresses: [],
}


const userSlice = createSlice({
    name : 'userSlice',
        initialState,
        reducers: {
      /*   openDailog: (state) =>{
                state.isDailogOpen = true;
        },
        closeDailog: (state)=>{
                state.isDailogOpen = false;
        } */
        }
        });


// export const {closeDailog,openDailog} = sarkarSlice.actions;
// export default sarkarSlice.reducer;