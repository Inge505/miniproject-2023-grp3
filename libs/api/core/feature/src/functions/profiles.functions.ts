import { ProfilesService } from '@mp/api/profiles/feature';
import {
    IUpdateAccountDetailsRequest,
    IUpdateAccountDetailsResponse,
    IUpdateAddressDetailsRequest,
    IUpdateAddressDetailsResponse,
    IUpdateContactDetailsRequest,
    IUpdateContactDetailsResponse,
    IUpdateOccupationDetailsRequest,
    IUpdateOccupationDetailsResponse,
    IUpdatePersonalDetailsRequest,
    IUpdatePersonalDetailsResponse,
    ICreatePostRequest,
    ICreatePostResponse,
    IAddPostRequest,
    IAddPostResponse,
    IPostDetails
} from '@mp/api/profiles/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';
import * as admin from 'firebase-admin';
export const updateAccountDetails = functions.https.onCall(
  async (
    request: IUpdateAccountDetailsRequest
  ): Promise<IUpdateAccountDetailsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ProfilesService);
    return service.updateAccountDetails(request);
  }
);


exports.getUserPosts = functions.https.onCall(async (data, context) => {
  const userId = data.userId;

  if (!userId) {
    throw new functions.https.HttpsError('invalid-argument', 'User ID is required');
  }

    const querySnapshot = await admin.firestore().collection(`profiles/${userId}/posts`).get();
    const posts: { id: string; }[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { posts };

});

exports.getAllPosts = functions.https.onCall(async (data, context) => {
  const profilesRef = admin.firestore().collection('profiles');
  const profileDocs = await profilesRef.get();

  let allPosts:IPostDetails[] = [];

  for (const profileDoc of profileDocs.docs) {
    const userId = profileDoc.id;
    const userPostsRef = admin.firestore().collection(`profiles/${userId}/posts`);
    const userPostsSnapshot = await userPostsRef.get();

    const userPosts = userPostsSnapshot.docs.map((postDoc) => ({

      ...postDoc.data(),
    }));

    allPosts = [...allPosts, ...userPosts];
  }

  return { allPosts };
});

export const createPostDetails = functions.https.onCall(
  async (
    request: ICreatePostRequest
  ): Promise<ICreatePostResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ProfilesService);
    return service.createPostDetails(request);
  }
);

export const updateAddressDetails = functions.https.onCall(
  async (
    request: IUpdateAddressDetailsRequest
  ): Promise<IUpdateAddressDetailsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ProfilesService);
    return service.updateAddressDetails(request);
  }
);

export const updateContactDetails = functions.https.onCall(
  async (
    request: IUpdateContactDetailsRequest
  ): Promise<IUpdateContactDetailsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ProfilesService);
    return service.updateContactDetails(request);
  }
);

export const updatePersonalDetails = functions.https.onCall(
  async (
    request: IUpdatePersonalDetailsRequest
  ): Promise<IUpdatePersonalDetailsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ProfilesService);
    return service.updatePersonalDetails(request);
  }
);

export const updateOccupationDetails = functions.https.onCall(
  async (
    request: IUpdateOccupationDetailsRequest
  ): Promise<IUpdateOccupationDetailsResponse> => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(ProfilesService);
    return service.updateOccupationDetails(request);
  }
);

export const addPost = functions.https.onCall(
  async(
    request: IAddPostRequest
    ): Promise<IAddPostResponse> => {
    console.log("profiles.functions addPost ");
    const app = await NestFactory.createApplicationContext(CoreModule);
    console.log('here1');
    const service = app.get(ProfilesService);
    return service.addPost(request);
  }
);
