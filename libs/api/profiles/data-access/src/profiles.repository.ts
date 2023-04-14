import { IProfile } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesRepository {
  async findOne(profile: IProfile) {
    return await admin
      .firestore()
      .collection('Users')
      .withConverter<IProfile>({
        fromFirestore: (snapshot) => {
          return snapshot.data() as IProfile;
        },
        toFirestore: (it: IProfile) => it,
      })
      .doc(profile.username)
      .get();
  }

  async createProfile(profile: IProfile) {
    // Remove password field if present
    //delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('Users')
      .doc(profile.username)
      .create(profile);
  }

  async updateProfile(profile: IProfile) {
    // Remove password field if present
    //delete profile.accountDetails?.password;
    return await admin
      .firestore()
      .collection('Users')
      .doc(profile.username)
      .set(profile, { merge: true });
  }
}
