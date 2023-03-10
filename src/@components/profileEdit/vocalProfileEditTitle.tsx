import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ProfileEditActiveButtonIc,
  ProfileEditCheckIc,
  ProfileEditSleepAcountTextIc,
  ProfileEditSleepAcountTitleIc,
  ProfileEditSleeperButtonIc,
  ProfileEditWarningIc,
} from "../../assets";
import profileEditVocalDefaultImg from "../../assets/image/profileEditVocalDefaultImg.png";
import { nickName } from "../../type/editDataType";

interface PropsType {
  activeSaveButton: (inputState: string) => void;
  id: number;
  prevProfileImage: string;
  prevName: string;
}

export default function VocalProfileEditTitle(props: PropsType) {
  const { activeSaveButton, id, prevProfileImage, prevName } = props;
  const NICK_NAME = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,20}$/;

  const [prevImage, setPrevImage] = useState<string | ArrayBuffer | null>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>();
  const [inputState, setInputState] = useState<string>(nickName.NOTHING);
  const [isSleep, setIsSleep] = useState<boolean>(false);

  useEffect(() => {
    activeSaveButton(inputState);
  }, [inputState]);

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    setIsUploaded(true);
    e.target.files && setProfileImage(e.target.files[0]);
    showPrevImage(e);
  }

  function showPrevImage(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      resultImage && setPrevImage(resultImage);
    };
  }

  function checkInputName(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) return;

    NICK_NAME.test(e.target.value) ? setInputState(nickName.CORRECT) : setInputState(nickName.ERROR);
  }

  function changeSleepState() {
    setIsSleep((prev) => !prev);
  }

  return (
    <TitleContainer>
      <ProfileImageContainer htmlFor="profileImg">
        {isUploaded ? (
          <ImageWrapper>
            <UploadedImage src={String(prevImage)} />
          </ImageWrapper>
        ) : (
          <ProfileImage src={prevProfileImage} />
        )}
      </ProfileImageContainer>
      <FileInput type="file" id="profileImg" style={{ display: "none" }} onChange={getFile} />
      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>Name</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper inputState={inputState}>
          <NameInput onChange={checkInputName} defaultValue={prevName} />
          {inputState !== nickName.NOTHING &&
            (inputState === nickName.CORRECT ? <ProfileEditCheckIc /> : <ProfileEditWarningIc />)}
        </InputWrapper>
      </NameContainer>
      <SleepAcountContainer>
        <SleepAcountTextWrapper>
          <ProfileEditSleepAcountTitleIc />
          <ProfileEditSleepAcountTextIcon />
        </SleepAcountTextWrapper>
        {isSleep ? (
          <ProfileEditSleeperButtonIcon onClick={changeSleepState} />
        ) : (
          <ProfileEditActiveButtonIcon onClick={changeSleepState} />
        )}
      </SleepAcountContainer>
    </TitleContainer>
  );
}

const TitleContainer = styled.section`
  height: 88.8rem;
  width: 67.7rem;

  backdrop-filter: blur(1rem);
  background-color: rgba(20, 21, 23, 0.6);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(#141517, #141517), linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImageContainer = styled.label`
  height: 36.8rem;
  width: 36.8rem;

  margin-top: 9.4rem;

  border-radius: 50%;
`;

const ProfileImage = styled.img`
  height: 36.8rem;
  width: 36.8rem;

  border-radius: 50%;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedImage = styled.img`
  height: 36.8rem;
  width: 36.8rem;

  object-fit: cover;
  transform: rotate(-45deg);
  margin-top: -5rem;
  margin-left: -5rem;
`;

const ImageWrapper = styled.div`
  height: 26.7em;
  width: 26.7em;

  transform: rotate(45deg);

  margin-top: 5rem;
  margin-left: 5rem;

  border-radius: 3rem;

  overflow: hidden;
`;

const NameContainer = styled.article`
  height: 8.8rem;
  width: 60rem;

  margin: 7.6rem 0 0 6.1rem;
`;

const NameTitleWrapper = styled.div`
  display: flex;
`;

const NameTitleText = styled.strong`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.cations}

  margin-right: 0.6rem;
`;

const PointIcon = styled.div`
  height: 0.7rem;
  width: 0.7rem;

  background-color: ${({ theme }) => theme.colors.main};
`;

const InputWrapper = styled.div<{ inputState: string }>`
  width: 54.9rem;

  display: flex;
  justify-content: space-between;

  border-bottom: ${({ inputState, theme }) => {
    if (inputState === "nothing") return "0.1rem solid white";
    if (inputState === "correct") return "0.1rem solid #5200FF";
    if (inputState === "error") return "0.1rem solid  #FF4F4F";
  }};
`;

const NameInput = styled.input`
  height: 4.5rem;
  width: 70%;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input}
`;

const SleepAcountContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 54.9rem;
`;
const SleepAcountTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 7rem;
`;

const ProfileEditSleepAcountTextIcon = styled(ProfileEditSleepAcountTextIc)`
  margin-top: 2.2rem;
`;

const ProfileEditActiveButtonIcon = styled(ProfileEditActiveButtonIc)`
  margin-top: 13rem;
  margin-bottom: 7.3rem;
`;

const ProfileEditSleeperButtonIcon = styled(ProfileEditSleeperButtonIc)`
  margin-top: 13rem;
  margin-bottom: 7.3rem;
`;
