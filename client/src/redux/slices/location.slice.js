import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  location: {},
  distances: [],
  distanceToTurf: [],
  error: '',
};

const getDistanceToTurf = createAsyncThunk(
  'turf/getDistanceToTurf',
  async ({ origin, destination }, { rejectWithValue }) => {
    try {
      let distance = null;
      if (!origin || !destination) {
        return;
      }
      const apiKey = process.env.REACT_APP_DISTANCE_MATRIX_API_KEY;
      const apiUrl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        distance = data.rows[0]?.elements || 0;
      }
      return distance[0];
    } catch (error) {
      console.error('Oops something went wrong :(', error);
      throw rejectWithValue(error.message);
    }
  }
);

const getDistanceToTurfs = createAsyncThunk('turf/getDistanceToTurfs', async (_, { getState, rejectWithValue }) => {
  try {
    const { turf, location } = getState();
    const { turfs } = turf;

    if (!location || !location.location) {
      throw new Error('User location not available.');
    }

    const userLocation = location.location;

    const apiKey = process.env.REACT_APP_DISTANCE_MATRIX_API_KEY;
    const distanceValues = {};

    // Loop through each turf and calculate distance
    for (const turf of turfs.turfs) {
      const { coordinates } = turf.location;
      const apiUrl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${userLocation.latitude},${userLocation.longitude}&destinations=${coordinates.latitude},${coordinates.longitude}&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      if (data.status === 'OK') {
        const distance = data?.rows[0]?.elements[0]?.distance.text || 'Unknown';
        distanceValues[turf._id] = distance;
      } else {
        distanceValues[turf._id] = 'Unknown';
      }
    }
    return distanceValues;
  } catch (error) {
    console.error('Oops something went wrong :(', error);
    throw rejectWithValue(error.message);
  }
});

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    updateLocation: (state, action) => {
      if (state.location) {
        state.location = { ...state.location, ...action.payload };
      } else {
        state.location = action.payload;
      }
    },
    clearDistances: (state) => {
      state.distances = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDistanceToTurf.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDistanceToTurf.fulfilled, (state, action) => {
      state.loading = false;
      state.distanceToTurf = action.payload;
      state.error = '';
    });
    builder.addCase(getDistanceToTurf.rejected, (state, action) => {
      state.loading = false;
      state.distanceToTurf = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
    builder.addCase(getDistanceToTurfs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDistanceToTurfs.fulfilled, (state, action) => {
      state.loading = false;
      state.distances = action.payload;
      state.error = '';
    });
    builder.addCase(getDistanceToTurfs.rejected, (state, action) => {
      state.loading = false;
      state.distances = null;
      state.error = action.payload ? action.payload.message : action.error.message;
    });
  },
});

export { getDistanceToTurf, getDistanceToTurfs };
export const { setLocation, updateLocation,clearDistances } = locationSlice.actions;
export default locationSlice.reducer;
