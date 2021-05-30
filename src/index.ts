import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const checkerOnline = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    try {
        const { checkerId, status } = data
        await admin.firestore().collection('checker-online').doc(`checker_${checkerId}`).set({
            checkerId,
            status
        })
    
        let message = ''
        if (status === 1) {
            message = 'You are online.'
        } else if (status === 3) {
            message = 'You are offline.'
        }
    
        return { data: { message : message }}
    } catch (error) {
       return { data: { message: 'Something went wrong.'}}
    }
})

export const getUserProfile = functions.region('asia-northeast1').https.onCall(async (data, context) => {
    const { uid = ''} = data
    const usersRef = admin.firestore().collection('users')
    const snapshot = await usersRef.doc(uid).get()
    return snapshot.data()
})

