import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

const fetchDogApiKey = async () => {
  try {

    // Firebase 초기화가 올바르게 되어 있는지 확인
    if (!db) {
      console.error('Firebase has not been initialized correctly');
      throw new Error('Firebase has not been initialized correctly');
    }

    const docRef = doc(db, 'dog_api', 'k2jC27riewB2NYVwr7uT'); // 문서 ID를 정확하게 입력합니다.

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().key; // key 필드의 값을 반환합니다.
    } else {
      console.error('No DOG_API_KEY found!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching DOG_API_KEY:', error);
    return null;
  }
};

export default fetchDogApiKey;
