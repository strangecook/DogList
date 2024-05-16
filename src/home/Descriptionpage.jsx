import React, {useState} from 'react';
import dogLogoImage from '../Pictures/anna-dudkova-urs_y9NwFcc-unsplash.avif'
import {DescriptionCover, Dogimage, Context} from './DescriptionpageCss'

const Descriotionpage = () => {

const [isHovered, setIsHovered] = useState(false);
const [emailvalue, setEmailValue] = useState("")

const handleMouseEnter = () => {
  setIsHovered(true);
};

const handleMouseLeave = () => {
  setIsHovered(false);
};

    return (
        <div>
            <DescriptionCover>
                <Dogimage src={dogLogoImage} alt="dogLogoImage"></Dogimage>
                <Context>
                    <div className='text'>
                        <h1 className='contextH1'>{`당신의 완벽한 강아지를 찾는 여정,\n지금 시작하세요`}</h1>
                        <h3 className='contextH3'>
                            {`당신의 삶에 새로운 친구를 만들어 보세요,\n함께하는 모든 순간이 즐거움으로 가득할 거예요.`}
                        </h3>
                        <div className='emailcontainer'>
                            <div className='emaildiv'>
                                <input 
                                className='emailInput'
                                type='text'
                                placeholder='이메일을 입력하세요'
                                value = {emailvalue}
                                onChange={e=>{
                                    e.preventDefault();
                                    setEmailValue(e.target.value)
                                    console.log(e.target.value)
                                }}
                                ></input>
                            </div>
                            <button 
                                  className={isHovered ? 'buttonHovered' : 'buttonNormal'} // 버튼의 클래스 조건부 적용
                                  onMouseEnter={handleMouseEnter} // 마우스를 가져다 대는 동작에 대한 이벤트 핸들러
                                  onMouseLeave={handleMouseLeave} // 마우스를 버튼에서 떼는 동작에 대한 이벤트 핸들러
                            >
                                새로운 정보 구독하기
                            </button>
                        </div>

                    </div>
                </Context>
            </DescriptionCover>
        </div>
    );
};

export default Descriotionpage;
