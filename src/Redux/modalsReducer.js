const { createSlice } = require("@reduxjs/toolkit");

const modalsInitialState = {
    name: "",
    show: false,
    data: null
}

const modalsReducer = createSlice({
    name: 'modals',
    initialState: modalsInitialState,
    reducers: {
        show(state,{payload}){
            state.show = true;
            state.name = payload.name;
            state.data = payload.data ? payload.data : null;
        },
        hide(state){
            state.show = false;
            state.name = "";
            state.data = {};
        }
    }
})

export const modalsActions = modalsReducer.actions;

export default modalsReducer.reducer;