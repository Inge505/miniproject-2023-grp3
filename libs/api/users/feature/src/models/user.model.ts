import { IUser, UserCreatedEvent } from '@mp/api/users/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';

export class User extends AggregateRoot implements IUser {
  constructor(
    public id: string,
    public email?: string | null | undefined,
    public displayName?: string | null | undefined,
    public photoURL?: string | null | undefined,
    public phoneNumber?: string | null | undefined,
    public customClaims?: { [key: string]: any } | null | undefined,
    public created?: Timestamp | null | undefined
  ) {
    super();
  }

  static fromData(user: IUser): User {
    const instance = new User(
      user.id,
      user.email,
      user.displayName,
      user.photoURL,
      user.phoneNumber,
      user.customClaims,
      user.created
    );
    return instance;
  }

  create() {
    this.apply(new UserCreatedEvent(this.toJSON()));
  }

  toJSON(): IUser {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      phoneNumber: this.phoneNumber,
      customClaims: this.customClaims,
      created: this.created,
    };
  }
}
