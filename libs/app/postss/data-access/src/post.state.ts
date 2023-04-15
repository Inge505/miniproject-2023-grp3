import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Hashtag,
  IPost,
  IPosts,
  IComment,
  ICreatePostRequest
} from '@mp/api/postss/util';
import { AuthState } from '@mp/app/auth/data-access';
import { SetError } from '@mp/app/errors/util';
import { Timestamp } from 'firebase/firestore';
import {
  SetPosts,
  SetPost,
  CreatePost,
  GetPostByUserId,
  PostTrendingGet,
  GetPostByHashtag,
  CommentOnPost,
  LikePost,
  BuyPost,
  SubscribeToPost
} from '@mp/app/postss/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce, {createDraft} from 'immer';
import { tap } from 'rxjs';
import { PostApi } from './post.api';
import { firestore } from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-empty-interface

/*
Individual Post State Model
*/

export interface PostStateModel {
  post: IPost | null;
  postDetailsForm: {
    model: {
      postID: string | null | undefined;
      createdBy: string | null | undefined;
      ownedBy: string | null | undefined;
      likes: number | null | undefined;
      comments: IComment[] | null | undefined;
      createdAt?: Timestamp | null | undefined;
      content?: string | null | undefined;
      hashtag?: Hashtag | null | undefined;
      caption?: string | null | undefined;
      totalTime?: number | null | undefined
      ownerGainedTime?: number | null | undefined
      listing?: number | null | undefined

    };
    dirty: false;
    status: string;
    errors: object;
  };
}


/*
Array of Post objects
*/
export interface PostsStateModel {
  posts: IPosts | null;
  postsDetailsForm: {
    model: {
      posts: IPost[] | null
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: null,
    postsDetailsForm: {
      model: {
        posts: null
      },
      dirty: false,
      status: '',
      errors: {},
    }
  }
})

@State<PostStateModel>({
  name: 'post',
  defaults: {
    post: null,
    postDetailsForm: {
      model: {
        postID: null,
        createdBy: null,
        ownedBy: null,
        likes:null, //fixed like left out  before
        comments: null,
        createdAt: null,
        content: null,
        hashtag: null,
        caption: null,
        totalTime: null,
        ownerGainedTime: null,
        listing: null
      },
      dirty: false,
      status: '',
      errors: {},
    }
  }
})
@Injectable()
export class PostsState {
  constructor(private postApi: PostApi, private store: Store) {}
  @Selector()
  static posts(state: PostsStateModel) {
    return state.posts;
  }

  @Action(SubscribeToPost)
  subscribeToPosts(ctx: StateContext<PostsStateModel>) {
    const postsToLook = this.store.selectSnapshot(PostsState.posts);
    if (!postsToLook || postsToLook.posts == null) return ctx.dispatch(new SetError('Posts not Set'));

    // Subscribe to changes in each post
    postsToLook.posts.forEach((post: IPost) => {
      this.postApi
        .post$(post.postID)
        .pipe(
          map((updatedPost: IPost) => {
            // Update the PostsState and internal PostState
            const postsInt = ctx.getState().posts;
            if (postsInt && postsInt.posts != null) {
              const index = postsInt.posts.findIndex(p => p.postID === updatedPost.postID);
              if (index !== -1) {
                postsInt.posts[index] = updatedPost;
                ctx.patchState({ posts: postsInt });
              }
            }
            return updatedPost;
          }),
          tap((updatedPost: IPost) => {
            const postState = this.store.selectSnapshot(PostState.post);
            if (postState && postState.postID === updatedPost.postID) {
              ctx.dispatch(new SetPost(updatedPost));
            }
          })
        )
        .subscribe();
    });

    return;

  }

  @Action(GetPostByUserId)
  async getPostByUserId(ctx: StateContext<PostsStateModel>, action: GetPostByUserId) {
    try {
      const posts = await this.postApi.getPostByUserId(action.userId);
      ctx.patchState({ posts: posts });
    } catch (error) {
      ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(GetPostByHashtag)
  async getPostByHashtag(ctx: StateContext<PostsStateModel>, action: GetPostByHashtag) {
    try {
      const posts = await this.postApi.getPostByHashtag(action.hashtag);
      ctx.patchState({ posts: posts });
    } catch (error) {
      ctx.dispatch(new SetError((error as Error).message));
    }
  }


//This function will subscribe to the current posts that are loaded

  @Action(SetPosts)
  setPosts(ctx: StateContext<PostsStateModel>, { posts }: SetPosts) {
    return ctx.setState(
      produce((draft) => {
        draft.posts = createDraft(posts);
      })
    );
  }
  @Action(PostTrendingGet)
  async postTrendingGet(ctx: StateContext<PostsStateModel>) {
    try {
      const posts = await this.postApi.postTrendingGet();
      ctx.patchState({ posts: { posts } });
    } catch (error) {
      ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
@Injectable()
export class PostState { /* changed from 'PostsState' to 'PostState' */
  constructor(
    private readonly postApi: PostApi,
    private readonly store: Store
  ) { }


  @Selector()
  static post(state: PostStateModel) {
    return state.post;
  }

  //This function will set the posts to the state

  @Action(SetPost)
  setPost(ctx: StateContext<PostStateModel>, { post }: SetPost) {
    return ctx.setState(
      produce((draft) => {
        draft.post = createDraft(post);
      })
    );
  }

  @Action(LikePost)
  async likePost(ctx: StateContext<PostStateModel>, action: LikePost) {
    try {
      const post = await this.postApi.likePost(action.postID);
      ctx.dispatch(new SetPost(post));
    } catch (error) {
      ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(CommentOnPost)
  async commentOnPost(ctx: StateContext<PostStateModel>, action: CommentOnPost) {
    try {
      const post = await this.postApi.commentOnPost(action.postId, action.comment);
      ctx.dispatch(new SetPost(post));
    } catch (error) {
      ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(BuyPost)
  async buyPost(ctx: StateContext<PostStateModel>, action: BuyPost) {
    try {
      const post = await this.postApi.buyPost(action.postId, action.buyerID);
      ctx.dispatch(new SetPost(post));
    } catch (error) {
      ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(SubscribeToPost)
  subscribeToProfile(ctx: StateContext<PostStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.postApi
      .post$(user.uid)
      .pipe(tap((profile: IPost) => ctx.dispatch(new SetPost(profile))));
  }
  
  @Action(CreatePost)
async createPost(ctx: StateContext<PostStateModel>, action: CreatePost) {
  // Get the form values from the action payload
  console.log("here in state");
  const { createdBy, content, caption, hashtag } = action.payload;

  try {
    const ownedBy = createdBy; // We can use 'createdBy' from the action payload
    const postID = createdBy + "1";
    const likes = 0;
    const createdAt = firestore.Timestamp.now();

    if (!createdBy || !content || !caption || !hashtag)
      return ctx.dispatch(
        new SetError(
          'UserId or display name or email or photo URL or password not set'
        )
      );

    const request: ICreatePostRequest = {
      post: {
        postID,
        createdBy,
        ownedBy,
        likes,
        createdAt,
        content,
        hashtag,
        caption,
      },
    };
    const responseRef = await this.postApi.createPost(request);
    const response = responseRef.data;
    return ctx.dispatch(new SetPost(response.post));
  } catch (error) {
    return ctx.dispatch(new SetError((error as Error).message));
  }
}





  /*

  Examples from profile, remove later

  @Action(SetProfile)
  setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
    return ctx.setState(
      produce((draft) => {
        draft.profile = profile;
      })
    );
  }

  @Action(UpdateAccountDetails)
  async updateAccountDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const displayName = state.accountDetailsForm.model.displayName;
      const email = state.accountDetailsForm.model.email;
      // const photoURL = state.accountDetailsForm.model.photoURL;
      const password = state.accountDetailsForm.model.password;

      if (!userId || !displayName || !email || !password)
        return ctx.dispatch(
          new SetError(
            'UserId or display name or email or photo URL or password not set'
          )
        );

      const request: IUpdateAccountDetailsRequest = {
        profile: {
          userId,
          accountDetails: {
            displayName,
            email,
            password,
          },
        },
      };
      const responseRef = await this.profileApi.updateAccountDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
  */
}



