import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "services/firebase";

export const fileUpload = async (file, uid, noteId) => {
  const fileRef = ref(storage, `${uid}/journal/notes/${noteId}`);
  const uploadedFile = await uploadBytes(fileRef, file);

  const uploadedFileUrl = await getDownloadURL(uploadedFile.ref);
  return uploadedFileUrl;
};
