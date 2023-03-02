import {  GoogleAuthProvider, signInWithPopup, onAuthStateChanged, getAuth } from "firebase/auth";


import { auth} from "../fireBase"
import { MAIN_ROUTE } from '../utils/consts';

export const authGoogle = async (navigate, dispatch, setUser) => {
      let provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider)
      onAuthStateChanged(auth, (user) => {
         dispatch(setUser(user.accessToken))
         navigate(MAIN_ROUTE)
      });
   }