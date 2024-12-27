import * as firebase from 'firebase/app';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import firebaseConf from './firebase.config';


export const initializeLoginFrameWork = () => {
    // if(firebase.apps === 0){
      firebase.initializeApp(firebaseConf);
    // }
}

export const handleGoogleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo:photoURL,
        success: true,
      }
      return signedInUser;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

 export const handleSignOut = () => {
  const auth = getAuth();
    return signOut(auth)
    .then(() => {
      const signedOutUser = {
        isSignedIn: false,
        newUser:false,
        name: '', 
        email: '',
        password: '',
        photo: '',
      };
      return signedOutUser;
    }).catch(err => {
      console.log(err.message);
      return err;
    });
  }

  export const handleFBSignIn = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(getAuth(), provider)
    .then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      user.success = true;
      return user;
    })
    .catch(error => {
      return error;
    })
  }

  export const CreateUserWithEmailAndPassword = (name, email, password) => {
    return createUserWithEmailAndPassword(getAuth(), email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      })
  }

  export const SignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(getAuth(), email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }
   
const updateUserName = name => {
  const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName:name,
    }).then(res =>{
      console.log('Profile updated successfully!', res);
    }).catch(error => {
      console.log(error.message);
    });
  }