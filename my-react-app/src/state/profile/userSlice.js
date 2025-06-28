import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileApi, updateUsername } from "../profile/userAPI";



export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; 
      return await fetchProfileApi(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeUsername = createAsyncThunk(
  "user/changeUsername",
  async (newUsername, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await updateUsername(token, newUsername);
      return newUsername; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          ...action.payload,
          username: action.payload.userName,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.username = action.payload; 
        }
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
