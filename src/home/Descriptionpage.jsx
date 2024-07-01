import React, { useState } from 'react';
import dogLogoImage from '../Pictures/anna-dudkova-urs_y9NwFcc-unsplash.avif';
import dogExImage from '../Pictures/DALL·E 2024-06-29 17.00.47 - A picturesque park scene during a calm afternoon with a few dog breeds playing and running around. The sunlight is soft and gentle, casting a warm glo.webp'
import { DescriptionCover, Dogimage, Context, Notification } from './DescriptionpageCss';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Descriotionpage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emailvalue, setEmailValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async () => {
    if (emailvalue === '') {
      setMessage('이메일을 입력해주세요.');
      setIsError(true);
      return;
    }

    if (!validateEmail(emailvalue)) {
      setMessage('유효한 이메일 주소를 입력해주세요.');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage('');
    setIsError(false);
    
    try {
      await addDoc(collection(db, 'users'), {
        email: emailvalue,
        timestamp: new Date()
      });
      setEmailValue('');
      setMessage('구독이 완료되었습니다.');
      setIsError(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('구독 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DescriptionCover>
        <Dogimage src={dogLogoImage} alt="dogLogoImage"></Dogimage>
        <Context>
          <div className="text">
            <h1 className="contextH1">{`당신의 완벽한 강아지를 찾는 여정,\n지금 시작하세요`}</h1>
            <h3 className="contextH3">
              {`당신의 삶에 새로운 친구를 만들어 보세요,\n함께하는 모든 순간이 즐거움으로 가득할 거예요.`}
            </h3>
            <div className="emailcontainer">
              <div className="emaildiv">
                <input
                  className="emailInput"
                  type="text"
                  placeholder="이메일을 입력하세요"
                  value={emailvalue}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmailValue(e.target.value);
                    console.log(e.target.value);
                  }}
                ></input>
              </div>
              <button
                className={isHovered ? 'buttonHovered' : 'buttonNormal'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? '구독 중...' : '새로운 정보 구독하기'}
              </button>
            </div>
            {message && <Notification isError={isError}>{message}</Notification>}
          </div>
        </Context>
      </DescriptionCover>
    </div>
  );
};

export default Descriotionpage;
