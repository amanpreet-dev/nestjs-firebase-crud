import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        let app: admin.app.App;
        if (admin.apps.length === 0) {
          const serviceAccount = JSON.parse(
            fs.readFileSync(
              'file path to your service account key json file',
              'utf8',
            ),
          );
          app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        } else {
          app = admin.app();
        }
        return app;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
