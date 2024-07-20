import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { auth, storage, db } from '../firebase';
import { onAuthStateChanged, updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import Modal from 'react-modal';
import pawImage from '../Pictures/dog-paw.png';

Modal.setAppElement('#root');

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  width: 80%;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ProfileInput = styled.input`
  width: 80%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const ProfileButton = styled.button`
  width: 80%;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const GoBackButton = styled(ProfileButton)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
        setPhotoURL(currentUser.photoURL || '');
      }
    });
    return () => unsubscribe();
  }, []);

  const checkNicknameExists = async (nickname) => {
    const q = query(collection(db, 'users'), where('nickname', '==', nickname));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        const isNicknameExists = await checkNicknameExists(displayName);
        if (isNicknameExists) {
          setModalMessage('닉네임이 이미 존재합니다. 다른 닉네임을 입력하세요.');
          setModalIsOpen(true);
          return;
        }

        let updatedPhotoURL = photoURL;

        if (file) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(storageRef, file);
          updatedPhotoURL = await getDownloadURL(storageRef);
        }

        await updateProfile(user, {
          displayName,
          photoURL: updatedPhotoURL
        });

        await setDoc(doc(db, "users", user.uid), { 
          displayName,
          photoURL: updatedPhotoURL,
          email,
          uid: user.uid
        });

        if (email !== user.email) {
          await updateEmail(user, email);
        }

        if (newPassword) {
          const credential = EmailAuthProvider.credential(user.email, password);
          await reauthenticateWithCredential(user, credential);
          await user.updatePassword(newPassword);
        }

        setModalMessage('프로필이 업데이트되었습니다.');
        setModalIsOpen(true);
      } catch (error) {
        console.error('프로필 업데이트 실패:', error);
        setModalMessage('프로필 업데이트 중 오류가 발생했습니다.');
        setModalIsOpen(true);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 1024 * 1024) { 
      setFile(selectedFile);
    } else {
      alert('1MB 이하의 파일만 업로드할 수 있습니다.');
    }
  };

  if (!user) {
    return <ProfileContainer>로그인이 필요합니다.</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <Helmet>
        <title>프로필 - Dog List</title>
        <meta name="description" content="사용자의 프로필을 업데이트하고, 사진을 업로드하며, 이메일과 비밀번호를 변경할 수 있는 페이지입니다." />
        <meta name="keywords" content="프로필, 강아지, 개 품종, Dog List, 사용자 정보" />
        <meta property="og:title" content="프로필 - Dog List" />
        <meta property="og:description" content="사용자의 프로필을 업데이트하고, 사진을 업로드하며, 이메일과 비밀번호를 변경할 수 있는 페이지입니다." />
        <meta property="og:image" content={photoURL || pawImage} />
        <meta property="og:url" content="https://www.doglist.info/profile" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doglist.info/profile" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "프로필 - Dog List",
            "description": "사용자의 프로필을 업데이트하고, 사진을 업로드하며, 이메일과 비밀번호를 변경할 수 있는 페이지입니다.",
            "url": "https://www.doglist.info/profile"
          }
          `}
        </script>
      </Helmet>
      <ProfileImage src={photoURL || pawImage} alt="Profile" />
      <ProfileForm onSubmit={handleProfileUpdate}>
        <Label>이름</Label>
        <ProfileInput
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="이름"
        />
        <Label>이메일</Label>
        <ProfileInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <Label>프로필 사진</Label>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Label>현재 비밀번호</Label>
        <ProfileInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="현재 비밀번호"
        />
        <Label>새 비밀번호</Label>
        <ProfileInput
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호"
        />
        <ProfileButton type="submit">프로필 업데이트</ProfileButton>
        <GoBackButton type="button" onClick={() => window.history.back()}>뒤로 가기</GoBackButton>
      </ProfileForm>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Profile Update Modal"
      >
        <ModalContent>
          <h2>알림</h2>
          <div>{modalMessage}</div>
          <ModalButton onClick={closeModal}>닫기</ModalButton>
        </ModalContent>
      </Modal>
    </ProfileContainer>
  );
};

export default Profile;
