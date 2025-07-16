import { Injectable } from '@nestjs/common';
import { PopulateOptions } from 'mongoose';

@Injectable()
export class UsersFactory {
  getUserByIdOptions(): PopulateOptions {
    return {
      path: 'chatRooms',
      select: 'name',
      ...this.removeIdAndVersion(),
    };
  }

  removeIdAndVersion() {
    return {
      transform: (doc) => {
        if (doc) {
          const test = doc.toObject();
          delete test._id;
          delete test.__v;
          return test;
        }
        return doc;
      },
    };
  }
}
