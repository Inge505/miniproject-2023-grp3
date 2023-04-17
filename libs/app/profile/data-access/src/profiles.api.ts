import { Injectable } from '@angular/core';
import { collection, doc, docData, Firestore, collectionData } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import {
    IProfile,
    IPostDetails,
    IAddPostRequest,
    IAddPostResponse,
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
    ICreatePostResponse,
    ICreatePostRequest
} from '@mp/api/profiles/util';
import { Observable, combineLatest, from, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable()
export class ProfilesApi {
  constructor(
    private readonly firestore: Firestore,
    private readonly functions: Functions,
    private firestore1: AngularFirestore,
    private http: HttpClient, private functions2: AngularFireFunctions
  ) {}

  // profile$(id: string) {
  //   const docRef = doc(
  //     this.firestore,
  //     `profiles/${id}`
  //   ).withConverter<IProfile>({
  //     fromFirestore: (snapshot) => {
  //       return snapshot.data() as IProfile;
  //     },
  //     toFirestore: (it: IProfile) => it,
  //   });
  //   return docData(docRef, { idField: 'id' });
  // }
  profile$(id: string) {
    const docRef = doc(
      this.firestore,
      `profiles/${id}`
    ).withConverter<IProfile>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IProfile;
      },
      toFirestore: (it: IProfile) => it,
    });

    const profile$ = docData(docRef, { idField: 'id' });

    const postsRef = collection(
      this.firestore,
      `profiles/${id}/posts`
    ).withConverter<IPostDetails>({
      fromFirestore: (snapshot) => {
        return snapshot.data() as IPostDetails;
      },
      toFirestore: (it: IPostDetails) => it,
    });

    const posts$ = collectionData(postsRef, { idField: 'id' });

    return combineLatest([profile$, posts$]).pipe(
      map(([profile, posts]) => ({
        ...profile,
        posts,
      }))
    );
  }

  getUserPostsFromFunction$(userId: string): Observable<IPostDetails[]> {
    const getUserPosts = this.functions2.httpsCallable('getUserPosts');
    return from(getUserPosts({ userId })).pipe(map(result => result.posts));
  }

getAllPosts$():Observable<IPostDetails[]>{
  const getAllPosts = this.functions2.httpsCallable('getAllPosts');
  return from(getAllPosts( ' ' )).pipe(map(result => result.posts));
}

  // profile$(id: string) {
  //   const profileDocRef = doc(
  //     this.firestore,
  //     `profiles/${id}`
  //   ).withConverter<IProfile>({
  //     fromFirestore: (snapshot) => {
  //       return snapshot.data() as IProfile;
  //     },
  //     toFirestore: (it: IProfile) => it,
  //   });

  //   const postsCollectionRef = collection(
  //     this.firestore,
  //     `profiles/${id}/posts`
  //   ).withConverter<IPostDetails>({
  //     fromFirestore: (snapshot) => {
  //       return snapshot.data() as IPostDetails;
  //     },
  //     toFirestore: (it: IPostDetails) => it,
  //   });

  //   return combineLatest([
  //     docData(profileDocRef, { idField: 'id' }),
  //     collectionData(postsCollectionRef, { idField: 'id' }),
  //   ]).pipe(
  //     map(([profile, posts]) => {
  //       return { ...profile, posts } as IProfile;
  //     })
  //   );

  // }


  async updateAccountDetails(request: IUpdateAccountDetailsRequest) {
    return await httpsCallable<
      IUpdateAccountDetailsRequest,
      IUpdateAccountDetailsResponse
    >(
      this.functions,
      'updateAccountDetails'
    )(request);
  }

  async createPostDetails(request: ICreatePostRequest) {
    return await httpsCallable<
    ICreatePostRequest,
    ICreatePostResponse
    >(
      this.functions,
      'createPostDetails'
    )(request);
  }

  async addPostDetails(request: IAddPostRequest) {
    console.log("profiles.api.addPostsDetails ");
    console.log(JSON.stringify(request));
    return await httpsCallable<
    IAddPostRequest,
    IAddPostResponse
    >(
      this.functions,
      'addPost'
    )(request);
  }

  async updateContactDetails(request: IUpdateContactDetailsRequest) {
    return await httpsCallable<
      IUpdateContactDetailsRequest,
      IUpdateContactDetailsResponse
    >(
      this.functions,
      'updateContactDetails'
    )(request);
  }

  async updateAddressDetails(request: IUpdateAddressDetailsRequest) {
    return await httpsCallable<
      IUpdateAddressDetailsRequest,
      IUpdateAddressDetailsResponse
    >(
      this.functions,
      'updateAddressDetails'
    )(request);
  }

  async updatePersonalDetails(request: IUpdatePersonalDetailsRequest) {
    return await httpsCallable<
      IUpdatePersonalDetailsRequest,
      IUpdatePersonalDetailsResponse
    >(
      this.functions,
      'updatePersonalDetails'
    )(request);
  }

  async updateOccupationDetails(request: IUpdateOccupationDetailsRequest) {
    return await httpsCallable<
      IUpdateOccupationDetailsRequest,
      IUpdateOccupationDetailsResponse
    >(
      this.functions,
      'updateOccupationDetails'
    )(request);
  }
}
