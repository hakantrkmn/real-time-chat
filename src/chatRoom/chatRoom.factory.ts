/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PopulateOptions } from 'mongoose';

@Injectable()
export class ChatRoomFactory {
  getChatRoomMessagesOptions(): PopulateOptions {
    return {
      path: 'messages.sender',
      select: 'username',
      populate: {
        path: 'chatRooms',
        select: 'name',
        ...this.removeIdAndVersion(),
      },
      ...this.removeIdAndVersion(),
    };
  }

  removeIdAndVersion() {
    return {
      transform: (doc) => {
        if (doc) {
          if (Array.isArray(doc)) {
            return doc.map((item) => {
              const test = item.toObject();
              delete test._id;
              delete test.__v;
              return test;
            });
          }
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
