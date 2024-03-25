import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadCartData = () => {
    const savedCartData = sessionStorage.getItem('cartData');
    return savedCartData ? JSON.parse(savedCartData) : [];
};

const loadWatched = () => {
    const saveWatched = sessionStorage.getItem('watched');
    return saveWatched ? JSON.parse(saveWatched) : [];
}

let cart = createSlice({
    name : 'cart',
    initialState : loadCartData(),
    reducers : {
        setCountUp(state, action){
            const stateId =  state.findIndex((a)=>{ return a.id === action.payload});
            state[stateId].count ++;
        },
        setCountDown(state, action){
            const stateId =  state.findIndex((a)=>{ return a.id === action.payload});
            state[stateId].count --;
        },
        setRemoveItem(state, action){
            const stateId =  state.findIndex((a)=>{ return a.id === action.payload});
            state.splice(stateId, 1);
        },
        setAddItem(state, action){
            state.push(action.payload);
        }
    }
});

let watched = createSlice({
    name : 'watched',
    initialState : loadWatched(),
    reducers : {
        setWatched(state, action){
            state.push(action.payload);
        }
    }
})

 
export let { setCountUp, setCountDown, setRemoveItem, setAddItem } = cart.actions;
export let { setWatched } = watched.actions;

export default configureStore({
    reducer: {
        cart : cart.reducer,
        watched : watched.reducer
    }
})