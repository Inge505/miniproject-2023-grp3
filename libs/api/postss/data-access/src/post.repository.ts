import { IComment, IPost } from '@mp/api/postss/util';
import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PostRepository {
  updatePost(post: any) {
      throw new Error('Method not implemented.');
  }

  async findOne(post: IPost) {
    if(post.postID == ""){
      throw Error("No PostID");
    }
    return await admin
      .firestore()
      .collection('Posts')
      .withConverter<IPost>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IPost;
        },
        toFirestore: (it: IPost) => it,
      })
      .doc(post.postID)
      .get();
  }

  /*
  Returns posts created in the last week that has the greatest number of likes
  */
  async findTrendingByLikes(): Promise<IPost[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const querySnapshot = await admin
      .firestore()
      .collection('Posts')
      .where('created', '>', admin.firestore.Timestamp.fromDate(oneWeekAgo))
      .orderBy('totalLikes', 'desc')
      .limit(30)
      .withConverter<IPost>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IPost;
        },
        toFirestore: (it: IPost) => it,
      })
      .get();

    const topPosts: IPost[] = [];
    querySnapshot.forEach((doc) => {
      topPosts.push(doc.data());
    });

    return topPosts;
  }

  async createPost(post: IPost) {
    return await admin
      .firestore()
      .collection('Post')
      .doc(post.postID)
      .create(post);
  }

  async updateLikes(post: IPost) {
    return await admin
      .firestore()
      .collection('Post')
      .doc(post.postID)
      .update({post : { totalLikes: admin.firestore.FieldValue.increment(1)}});

  }

  async updateComments(post: IPost) {
    return await admin
    .firestore()
    .collection('Post')
    .doc(post.postID)
    .update({post : {comments : admin.firestore.FieldValue.arrayUnion(post.comments)}})
  }

  async commentOnPost(post: IPost, comment: IComment) {
    try {
      const postRef = admin.firestore().collection('Posts').doc(post.postID);
      await postRef.update({
        comments: admin.firestore.FieldValue.arrayUnion(comment)
      });
      return { success: true };
    } catch (error: unknown) {
      console.error('Error commenting on post:', error);

      if(error instanceof Error)
      return { success: false, message: error.message };
      else {
        return { success: false, message: error };
      }
    }
  }

  async buyPost(post: IPost, buyer: IUser) {
  try {
    const postRef = admin.firestore().collection('Posts').doc(post.postID);
    await postRef.update({
      Sold: true,
      OwnedBy: buyer,
    });
    return { success: true };
  } catch (error) {

    if(error instanceof Error)
    return { success: false, message: error.message };
    else {
      return { success: false, message: error };
    }
  }
    }



  /*Examples from profile

  async createProfile(profile: IPost) {
    // Remove password field if present
    // delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('posts')
      .doc(post.postID)
      .create(post);
  }

  /*
  async updateProfile(profile: IPost) {
    // Remove password field if present
    delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId)
      .set(profile, { merge: true });
  }
  */
}
