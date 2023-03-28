import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: IProfile) {
    return await admin
      .firestore()
      .collection('profiles')
      .withConverter<IProfile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IProfile;
        },
        toFirestore: (it: IProfile) => it,
      })
      .doc(profile.userId)
      .get();
  }

  async createProfile(profile: IProfile) {
    // Remove password field if present
    delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId)
      .create(profile);
  }
  
  
  //example of getting User's posts
  async getUserPosts(profile: IProfile) {
    const userRef = admin.firestore().collection('Users').doc(profile.userID); //userID would be username 
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) { //if the query does not return a user i.e invalid username or user not stored in DB
      return null;
    }
    const postsSnapshot = await userRef.collection('posts').get();
    const postsData = postsSnapshot.docs.map((doc) => doc.data());
    return postsData
  }
  
  
  //example to get following and followers count
  async getUserFollowCounts(profile: IProfile){
  const userRef = admin.firestore().collection('Users').doc(profile.userID);
  const [followingSnapshot, followersSnapshot] = await Promise.all([
    userRef.collection('following').get(),
    userRef.collection('followers').get(),
  ]);
  const followingCount = followingSnapshot.size;
  const followersCount = followersSnapshot.size;

  return { following: followingCount, followers: followersCount };
}
  

  async updateProfile(profile: IProfile) {
    // Remove password field if present
    delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('profiles')
      .doc(profile.userId)
      .set(profile, { merge: true });
  }
}
