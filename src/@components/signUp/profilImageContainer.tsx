import React from 'react'
import styled from 'styled-components'
import { SignUpChangeImageIc, SignUpUploadImageIc,SignupVocalProfileImgIc } from '../../assets'
import { UserType } from '../../recoil/main';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../core/constants/userType';
import { isVocal, isProducer } from '../../utils/common/userType';

interface ImageContainerPropsType{
    imageSrc:string;
    isHover:boolean;
    checkImageHover: () => void;
    uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfilImageContainer(props:ImageContainerPropsType) {
    const {imageSrc, isHover, checkImageHover, uploadImage}=props;
    const userType=useRecoilValue(UserType)

    function showUploadImage(){
        switch(userType){
            case currentUser.PRODUCER:
                return <SignUpUploadImageIc/>
            case currentUser.VOCAL:
                return <SignupVocalProfileImgIc/>
        }
    }

  return (
    <ImageContainer isProducer={isProducer(userType)}>
    <Label htmlFor='profile-img' onMouseEnter={checkImageHover} onMouseLeave={checkImageHover}>
      {imageSrc ? (
        <ImgWrapper isProducer={isProducer(userType)}>
            <Img src={imageSrc} alt="preview-img" isProducer={isProducer(userType)}/>
        </ImgWrapper>
      ):(
        <SignUpUploadImageWrapper>
            {showUploadImage()}
        </SignUpUploadImageWrapper>
      )}
      {(imageSrc&&isHover)&&isProducer(userType)?<SignUpChangeProducerImageIcon/>:(
        <SignUpVocalImageIconWrapper>
            <SignUpChangeVocalImageIcon/>
        </SignUpVocalImageIconWrapper>
        )}
    </Label>
      <input type="file" id="profile-img" style={{ visibility: "hidden" }} onChange={(e) => {uploadImage(e)}} />
  </ImageContainer>
  )
}

const Label=styled.label`
  cursor: pointer;
`

const ImageContainer=styled.section<{isProducer:boolean}>`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
  width: ${({isProducer})=>isProducer?21.7:23.3}rem;
  height: ${({isProducer})=>isProducer?21.7:23.3}rem;
`

const ImgWrapper=styled.div<{isProducer:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width:${({isProducer})=>isProducer?21.7:23.3}rem;
  height: ${({isProducer})=>isProducer?21.7:23.3}rem;

  border-radius: 25rem;

  position: absolute;
  overflow: hidden;

  transform: rotate(${({isProducer})=>!isProducer&&-90}deg);
`

const Img=styled.img<{isProducer:boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
    transform: rotate(${({isProducer})=>!isProducer&&90}deg);
`

const SignUpChangeProducerImageIcon=styled(SignUpChangeImageIc)`
  width: 21.7rem;
  height: 21.7rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;

  position: relative;
  
  backdrop-filter: blur(1.7rem);
`

const SignUpVocalImageIconWrapper=styled.div`
  width: 23.2rem;
  height: 23.2rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 1.8rem;

  position: relative;
  backdrop-filter: blur(1.7rem);

  transform: rotate(-90deg);
`

const SignUpChangeVocalImageIcon=styled(SignUpChangeImageIc)`
    transform: rotate(90deg);
`

const SignUpUploadImageWrapper=styled.div`
  position: absolute;
`