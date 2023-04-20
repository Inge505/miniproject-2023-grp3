import { IComment, IPost } from '@mp/api/postss/util';
import { IUser } from '@mp/api/users/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PostRepository {
  updatePost(post: IPost) {
      throw new Error('Method not implemented.');
  }

  
  async findOne(post: IPost) {
    if(post.postID == ""){
      throw Error("No PostID");
    }
    return await admin
      .firestore()
      .collection('posts')
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
      .collection('posts')
      .where('createdAt', '>', admin.firestore.Timestamp.fromDate(oneWeekAgo))
      .orderBy('likes', 'desc')
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
      .collection('post')
      .doc(post.postID)
      .create(post);
  }

  /*async updateLikes(post: IPost) {
    return await admin
      .firestore()
      .collection('post')
      .doc(post.postID)
      .update({post : { likes: admin.firestore.FieldValue.increment(1)}});

  }*/

  async updateLikes(post: IPost, liker: IUser) { //update like count as well as time balances after liker likes a post 
    try {
      const likeBatch = admin.firestore().batch()
      // update totalLikes
      const postRef = admin.firestore().collection('posts').doc(post.postID);
      likeBatch.update(postRef, {totalLikes: admin.firestore.FieldValue.increment(1), ownerValue: admin.firestore.FieldValue.increment(1)});

      // Increase time balance of owner of post
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const userRef = admin.firestore().collection('Users').doc(post.ownedBy!); // non-null assertion (!) used because type (string | null | undefined) cannot be passed into string parameter of doc function. warning diasbled
      likeBatch.update(userRef, {timeBalance: admin.firestore.FieldValue.increment(1)}); // 1 = time gained from interaction

      // increase time balance of the user who liked the picture
      const likerRef = admin.firestore().collection('Users').doc(liker.id);
      likeBatch.update(likerRef, {timeBalance: admin.firestore.FieldValue.increment(1)});

      // Commit the batch (execute all the writes)
      await likeBatch.commit();

      const postSnapshot = this.findOne(post)

      return { success: true , returnedPost: postSnapshot};
    } catch (error: unknown) {
        console.error('Error liking on post:', error);

        if(error instanceof Error)
          return { success: false, returnerdPost: null, message: error.message };
        else {
          return { success: false, returnedPost: null, message: error };
      }
    }
  }
  
  async updateComments(post: IPost) {
    return await admin
    .firestore()
    .collection('post')
    .doc(post.postID)
    .update({post : {comments : admin.firestore.FieldValue.arrayUnion(post.comments)}})
  }

  async commentOnPost(post: IPost, comment: IComment) {
    try {
      const postRef = admin.firestore().collection('posts').doc(post.postID);
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
    const postRef = admin.firestore().collection('posts').doc(post.postID);
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
