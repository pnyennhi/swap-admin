import { storage } from "./index";

export const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // error function ....
        reject(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            resolve(url);
          });
      }
    );
  });
};
