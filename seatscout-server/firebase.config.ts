import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccount = require(
  path.join(__dirname, '../serviceAccountKey.json'),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
