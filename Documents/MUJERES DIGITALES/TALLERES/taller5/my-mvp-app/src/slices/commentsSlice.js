import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId={id}/${postId}`); // Reemplaza con la URL de tu API
  return await response.json();
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Agregar comentarios bajo el ID del post
        const { postId, comments } = action.payload;
        state.items[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default commentsSlice.reducer;
