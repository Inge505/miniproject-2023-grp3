import { Injectable } from '@angular/core';
import {
  Hashtag,
  IProfile,
  IUpdateAccountDetailsRequest,
  ICreatePostRequest,
  IAddPostRequest,
  IPostDetails,
  IComment,
  ICommentOnPostRequest
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
  Logout,
  SetProfile,
  SubscribeToProfile,
  UpdateAccountDetails,
  CreatePostDetails,
  CreateNewPost,
  FetchUserPosts,
  GetAllPosts,
  GetUserPostsByHashtag,
  SetComment,
  CreateNewComment,
  BuyPost,
  FetchPortfolioPosts,
  LikePost,
  SetPhoto
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { catchError, of, tap, from } from 'rxjs';
import { ProfilesApi } from './profiles.api';
import { Timestamp } from '@angular/fire/firestore';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileStateModel {
  profile: IProfile | null;
  searchPosts: IPostDetails[];
  posts:IPostDetails[];
  profilePosts:IPostDetails[];
  time: number | null;
  accountDetailsForm: {
    model: {
      displayName: string | null;
      email: string | null;
      photoURL: string | null;
      password: string | null;
      bio: string | null;
    };
    dirty: false;
    //status: string;
    errors: object;
  };
  postDetailsForm: {
    model: {
      postID: string | null | undefined;
      photoURL: string|null|undefined;
      createdBy: string | null | undefined;
      ownedBy: string | null | undefined;
      likes: number | null | undefined;
      comments: string | null | undefined;
      createdAt?: Timestamp | null | undefined;
      content?: string | null | undefined;
      hashtag?: Hashtag | null | undefined;
      caption?: string | null | undefined;
      totalTime?: number | null | undefined;
      ownerGainedTime?: number | null | undefined;
      listing?: number | null | undefined;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

export interface CommentStateModel {

  comment: IComment | null;
  commentDetails :{
    model: {
      userId?: string | null,
      postId?: string | null;
      commentId?: string | null
      comment: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  }
}

export interface CommentStateModel {

  comment: IComment | null;
comments:IComment[]|null;
  commentDetails :{
    model: {
      userId?: string | null,
      postId?: string | null;
      commentId?: string | null
      comment: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  }
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null,
    searchPosts: [],
    profilePosts:[],
    posts:[],
    time: 0,
    accountDetailsForm: {
      model: {
        displayName: null,
        email: null,
        photoURL: null,
        password: null,
        bio: '',
      },
      dirty: false,
      //status: '',
      errors: {},
    },
    postDetailsForm: {
      model: {
        postID: null,
photoURL:null,
        createdBy: null,
        ownedBy: null,
        likes: 0, //fixed like left out  before
        comments: null,
        createdAt: null,
        content: null,
        hashtag: null,
        caption: null,
        totalTime: 0,
        ownerGainedTime: 0,
        listing: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})


@State<CommentStateModel>({
   name: 'name',
   defaults: {
    comment: null,
comments:[],
    commentDetails: {
      model: {
        userId: null,
        postId: null,
        comment: null,
      },

      dirty: false,
      status: '',
      errors: {},
     }
    }

})
@Injectable()
export class ProfileState {
  constructor(
    private readonly profileApi: ProfilesApi,
    private readonly store: Store
  ) { }

  @Selector()
  static profile(state: ProfileStateModel) {
    return state.profile;
  }

  @Action(Logout)
  async logout(ctx: StateContext<ProfileStateModel>) {
    return ctx.dispatch(new AuthLogout());
  }

  @Action(SubscribeToProfile)
  subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.profileApi
      .profile$(user.uid)
      .pipe(tap((profile: IProfile) => ctx.dispatch(new SetProfile(profile))));
  }

  @Action(SetProfile)
  setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
    console.log("In SetProfile + " + JSON.stringify(this.setProfile));
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
      const bio = state.accountDetailsForm.model.bio;

      if (!userId )
        return ctx.dispatch(
          new SetError(
            'UserId  not set'
          )
        );

      const request: IUpdateAccountDetailsRequest = {
        profile: {
          userId,
          accountDetails: {
            displayName,
            email,
            password,
            bio,
          },
        },
      };
      const responseRef = await this.profileApi.updateAccountDetails(request);
      console.log("Profile State " + responseRef.data);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(CreatePostDetails)
  async createPostDetails(ctx: StateContext<ProfileStateModel>) {
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const content = state.postDetailsForm.model.content;
      const createdBy = state.profile?.userId;
      const caption = state.postDetailsForm.model.caption;
      const hashtag = state.postDetailsForm.model.hashtag;
      const ownedBy = state.profile?.userId; // We can use 'createdBy' from the action payload
      const postID = state.profile?.userId + "1";
      const likes = 0;
      const createdAt = Timestamp.now();

      if (!userId || !content || !caption || !hashtag)
        return ctx.dispatch(
          new SetError(
            'UserId or content or caption or hashtag'
          )
        );

      const request: ICreatePostRequest = {
        profile: {
          userId,
          posts: [{
            postID,
            createdBy,
            ownedBy,
            likes,
            createdAt,
            content,
            hashtag,
            caption,
          }],
        },
      };
      const responseRef = await this.profileApi.createPostDetails(request);
      const response = responseRef.data;
      return ctx.dispatch(new SetProfile(response.profile));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(CreateNewPost)
  async addPost(ctx: StateContext<ProfileStateModel>, { post }: CreateNewPost) {
    console.log("In state AddPost " + post.content);
    try {
      const state = ctx.getState();
      const userId = state.profile?.userId;
      const content = post.content;
      const createdBy = state.profile?.userId;
      const caption = state.postDetailsForm.model.caption;
      const hashtag = state.postDetailsForm.model.hashtag;
      const listing = state.postDetailsForm.model.listing;
      const ownedBy = state.profile?.userId; // We can use 'createdBy' from the action payload
      const postID = state.profile?.accountDetails?.displayName?.split("@")[0] + "-" + state.profile?.posts?.length; // the post id must be a document id
      const likes = state.postDetailsForm.model.likes;
      const createdAt = Timestamp.now();

      if (!userId || !content || !caption || !hashtag)
        return ctx.dispatch(
          new SetError(
            'UserId or content or caption or hashtag not set'
          )
        );

      const details: IPostDetails = {
        postID,
        createdBy,
        ownedBy,
        likes,
        createdAt,
        content,
        hashtag,
        caption,
        listing,
      }

      const request: IAddPostRequest = {
        profile: {
          userId,
        },
        post: details

      };
      const responseRef = await this.profileApi.addPostDetails(request);
      console.log("API returned ", JSON.stringify(responseRef.data));
      const response = responseRef.data;
      return ctx.setState(
        produce((draft) => {
          if (draft.profile){
          if (!draft.profile?.posts) {
            draft.profile.posts = [];
          }
          draft.profile.posts.splice(1, 0, post);
        }
        })
      );
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
  @Selector()
  static userPosts(state: ProfileStateModel): IPostDetails[] {
    return state.posts;
  }

  @Selector()
  static searchPosts(state: ProfileStateModel): IPostDetails[] {
    return state.searchPosts;
  }

  @Selector()
  static comment(state: CommentStateModel) {
    return state.comment;
  }

  @Selector()
  static comments(state: CommentStateModel) {
    return state.comments;
  }

  @Selector()
  static profilePosts(state: ProfileStateModel): IPostDetails[] {
    return state.profilePosts;
  }

  @Action(FetchUserPosts)
fetchUserPosts(ctx: StateContext<ProfileStateModel>, { displayName }: FetchUserPosts) {
  return this.profileApi.getUserPostsFromFunction$(displayName).pipe(
    tap((posts: IPostDetails[]) => ctx.patchState({ searchPosts: posts })),
    catchError((error) => {
      ctx.dispatch(new SetError((error as Error).message));
      return of(null);
    })
  );
}

@Action(FetchPortfolioPosts)
fetchPortfolioPosts(ctx: StateContext<ProfileStateModel>, { userId }: FetchPortfolioPosts) {
const vard=userId;
const state=ctx.getState();
let uId=' ';
  if(state.profile?.userId){
    uId=state.profile?.userId;
  }
  return this.profileApi.getPortfolioPostsFromFunction$(uId).pipe(
    tap((posts: IPostDetails[]) => ctx.patchState({ profilePosts: posts })),
    catchError((error) => {
      ctx.dispatch(new SetError((error as Error).message));
      return of(null);
    })
  );
}

@Action(GetAllPosts)
getAllPosts(ctx: StateContext<ProfileStateModel>, { userId }: GetAllPosts) {
const userID=userId;
  const state = ctx.getState();
console.log("here in state");
  let uId=' ';
  if(state.profile?.userId){
    uId=state.profile?.userId;
  }
console.log(uId);
  return this.profileApi.getAllPosts$(uId).pipe(
    tap((posts: IPostDetails[]) => ctx.patchState({ posts: posts })),
    catchError((error) => {
      ctx.dispatch(new SetError((error as Error).message));
      return of(null);
    })
  );
  }

  @Action(GetUserPostsByHashtag)
  getUserPostsByHashtag(
    ctx: StateContext<ProfileStateModel>,
    action: GetUserPostsByHashtag
  ) {
    const state = ctx.getState();

    return this.profileApi.getUserPostsByHashtag$(action.hashtag).pipe(
      tap((posts: IPostDetails[]) => {
        if (posts.length === 0) {
          throw new Error('No posts found with the given hashtag.');
        }

        ctx.setState(
          produce(state, (draft: ProfileStateModel) => {
            draft.searchPosts = posts;
          })
        );
      }),
      catchError((error) => {
        ctx.dispatch(new SetError(error));
        return of(null);
      })
    );
  }

  @Action(CreateNewComment)
  async createNewComment(ctx: StateContext<CommentStateModel>, action: ICommentOnPostRequest) {

  const createrID = action.comment.userId
  const actionComment =  action.comment.comment
  const stringActionComment = JSON.stringify(actionComment);
  const comment = JSON.parse(stringActionComment)



  const commentDetails: IComment = {
    userId: comment.userId,
    postId: comment.postId,
    comment: comment.comment
  };

  const newComment: ICommentOnPostRequest = {
    userId: createrID,
    comment: commentDetails
  };

  if(comment == null || comment == '') {
    return ctx.dispatch(
      new SetError('Oops! You did not type anything.')
    );
  }
  const responseRef = await this.profileApi.CreateNewComment(newComment);
  console.log('results: ', responseRef)
  // const response = responseRef.data
    if(commentDetails) {
      return ctx.dispatch(new SetComment(commentDetails));
    }
    else {
      return ctx.dispatch(new SetError("Error: Underfined"));
    }
  }

  @Action(SetComment)

  async setComment(ctx: StateContext<CommentStateModel>, action: IComment) {
    const state = ctx.getState();
    ctx.setState(
      produce(state, (draft: CommentStateModel) => {
        draft.comment = action;
      })
    );
  }



@Action(BuyPost)
buyPost(ctx: StateContext<ProfileStateModel>, { postId }: BuyPost) {
  const buyerId = ctx.getState().profile?.userId;

  if (!buyerId || !postId) {
    return ctx.dispatch(
      new SetError('BuyerId or PostId not set')
    );
  }

  return from(
    this.profileApi.functions2.httpsCallable('buyPosts')({ postId })
  ).pipe(
    tap(() => {
      ctx.patchState({
        posts: ctx.getState().posts.map((post) =>
          post.postID === postId ? { ...post, ownedBy: buyerId } : post
        ),
      });
    }),
    catchError((error) => {
      ctx.dispatch(new SetError((error as Error).message));
      return of(null);
    })
  );
}

@Action(LikePost)
LikePost(ctx: StateContext<ProfileStateModel>, { postId }: LikePost) {
  const likerId = ctx.getState().profile?.userId;

  if (!likerId || !postId) {
    return ctx.dispatch(
      new SetError('LikerId or PostId not set')
    );
  }

  return from(
    this.profileApi.functions2.httpsCallable('likePost')({ postId })
  ).pipe(
    tap(() => {
      ctx.patchState({
        posts: ctx.getState().posts.map((post) =>
          post.postID === postId ? { ...post, likedBy: likerId } : post
        ),
      });
    }),
    catchError((error) => {
      ctx.dispatch(new SetError((error as Error).message));
      return of(null);
    })
  );
}

@Action(SetPhoto)
setPhoto(ctx: StateContext<ProfileStateModel>, action: SetPhoto) {
  const state = ctx.getState();
  const userId = state.profile?.userId;

  if (!userId) {
    return ctx.dispatch(new SetError('User not set'));
  }

  return from(
    this.profileApi.functions2.httpsCallable('setPhoto')({ userId, photoURL: action?.photoURL })
  ).pipe(
    tap((profile: IProfile) => {
      ctx.patchState({
        profile: {
          ...state.profile,
          ...profile,
        },
      });
    }),
    catchError((error) => {
      ctx.dispatch(new SetError((error as Error).message));
      return of(null);
    })
  );
}


}
