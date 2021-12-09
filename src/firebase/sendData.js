import { addDoc, collection } from "firebase/firestore";
import { db } from './client'

export async function sendDataToFirebase({
  gitHub,
  name,
  seniority,
  experience,
  salary,
  entranceDateToWork,
  framework
}) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      gitHub,
      name,
      seniority,
      experience,
      salary,
      entranceDateToWork,
      framework
    })
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}