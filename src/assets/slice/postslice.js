import {
  createAsyncThunk,
  createSlice,
  nanoid,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState({
  status: "idle",
});

const PostURl = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(PostURl);
  return response.data;
});
export const addNewpost = createAsyncThunk(
  "/post/newPost",
  async (initialState) => {
    const response = await axios.post(PostURl, initialState);
    return response.data;
  }
);
export const Updatepost = createAsyncThunk(
  "/updatepost",
  async (initialState) => {
    const { id } = initialState;
    try {
      const response = await axios.put(`${PostURl}/${id}`, initialState);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const Deletepost = createAsyncThunk(
  "post/delete",
  async (initialState) => {
    const { id } = initialState;
    try {
      const response = await axios.delete(`${PostURl}/${id}`);
      if (response.status == 200) {
        return initialState;
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { PostId, reactionitem } = action.payload;
      const index = state.entities[PostId];
      if (index) {
        index.reactions[reactionitem]++;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        let min = 1;
        const loadpost = action.payload.map((item) => {
          item.date = sub(new Date(), { minutes: min++ }).toISOString();
          item.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return item;
        });
        postAdapter.upsertMany(state, loadpost);
        state.status = "idle";
      });
    builder.addCase(addNewpost.fulfilled, (state, action) => {
      action.payload.id = nanoid();
      action.payload.userId = Number(action.payload.userId);
      (action.payload.date = new Date().toISOString()),
        (action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        });
      postAdapter.addOne(state, action.payload);
    });
    builder.addCase(Updatepost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log("Updation Not Complete");
      }
      action.payload.date = new Date().toISOString();
      postAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(Deletepost.fulfilled, (state, action) => {
      const { id } = action.payload;
      postAdapter.removeOne(state, id);
    });
  },
});
export const {
  selectAll: selectAllposts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts);
export const { reactionAdded } = postSlice.actions;

export const PostStatus = (state) => state.posts.status;
