import {createSlice} from '@reduxjs/toolkit';

const initalSeenstate={isSeen:0,isUnseen:0}
const seenUnseenSlice=createSlice({
    name:'seen',
    initialState:initalSeenstate,
    reducers:{
        Seen(state){
            state.isSeen++;
        },
        Unseen(state){
            state.isUnseen++
        }
    }
})

export const SeenUnseenAction=seenUnseenSlice.actions;
const seenUnseenreducer=seenUnseenSlice.reducer;
export default seenUnseenreducer;
