import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
    name: "city",
    initialState: {
        selectedCity: {cityName: "Hyderabad"},
        cities : [],
      },
    reducers: {
        setSelectedCity : (state,action) => { 
            state.selectedCity = action.payload;
        },
        setCity: (state, action) => {
            state.cities = action.payload;
          },
    }
})
 export const {setSelectedCity, setCity} = citySlice.actions;
 export default citySlice.reducer; 