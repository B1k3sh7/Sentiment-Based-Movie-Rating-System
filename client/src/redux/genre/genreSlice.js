import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenres(state, action) {
      state.genres = action.payload;
    },
  },
});

export const { setGenres } = genreSlice.actions;
export default genreSlice.reducer;
