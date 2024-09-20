import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loginStatus: false, // add an error property
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        let user = action.payload;
        console.log('payload',user)
        if (user.success === true) {
          state.user = user.body;
          state.loginStatus = true;
          console.log('in user')
          
        } else {
          console.log('notn user')
          state.user = null;
          state.loginStatus = false;
        }
      } 
    },
    removeUser:(state)=>{
      state.user=null
      state.loginStatus=false
    }
  },
});

export const { setUser,removeUser } = UserSlice.actions;
export default UserSlice.reducer;