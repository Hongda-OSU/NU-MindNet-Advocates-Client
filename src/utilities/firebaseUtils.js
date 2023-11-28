import { useCallback, useEffect, useState } from "react";
import { onValue, ref, update, remove } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirebase,
  getFirebaseDatabase,
  getFirebaseStorage,
} from "./firebase";

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebase = getFirebase();
    const database = getFirebaseDatabase(firebase);

    const unsubscribe = onValue(
      ref(database, path),
      (snapshot) => {
        setData(snapshot.val());
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

export const useDbAdd = (path) => {
  const [result, setResult] = useState();
  const firebase = getFirebase();
  const database = getFirebaseDatabase(firebase);

  const addData = useCallback(
    (value) => {
      push(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [addData, result];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const firebase = getFirebase();
  const database = getFirebaseDatabase(firebase);
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const useDbDelete = () => {
  const firebase = getFirebase();
  const database = getFirebaseDatabase(firebase);
  const [result, setResult] = useState();

  const deleteNode = useCallback(
    (path, nodeKey) => {
      const databaseRef = ref(database, path);

      remove(ref(databaseRef, nodeKey))
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database]
  );

  return [deleteNode, result];
};

export const signInWithGoogle = () => {
  const firebase = getFirebase();
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

export const signInWithEmailPassword = (email, password) => {
  const firebase = getFirebase();
  const auth = getAuth(firebase);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((err) => {
      console.log(err.code);
      alert(err.code);
    });
};

export const firebaseSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const firebase = getFirebase();
    const unsubscribe = onAuthStateChanged(getAuth(firebase), setUser);

    return () => unsubscribe();
  }, []);

  return [user];
};

export const useProfile = () => {
  const [user] = useAuthState();
  const [isAdmin, isLoading, error] = useDbData(
    `/admins/${user?.uid || "guest"}`
  );
  return [{ user, isAdmin }, isLoading, error];
};
