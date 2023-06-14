import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        mail: '',
        picture: []
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserMail: (state, action) => { 
            state.value.mail = action.payload
        }, 
        addPicture: (state, action) => {
            state.value.picture.push(action.payload)
        },
        removePicture: (state, action) => {
            state.value.picture = state.value.picture.filter((el) => el != action.payload)
        },
        loggout: (state, action) => {
            state.value = {
                mail: '',
                picture: []
            }
        },
    }
})

export default userSlice.reducer;
export const { addUserMail, addPicture, removePicture, loggout, reset } = userSlice.actions;