import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    venues: [],
    selectedVenue: null 
}

const venueSlice = createSlice({
    name: "venue",
    initialState,
    reducers: {
        setVenues: (state, action) => {
            state.venues = action.payload;
        },
        setSelectedVenue: (state, action) => {
            state.selectedVenue = action.payload;
        }
    }
})

export const {setVenues, setSelectedVenue} = venueSlice.actions;
export default venueSlice.reducer;
