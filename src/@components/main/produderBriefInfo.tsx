import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MainInfoProducerIc, MainLogoutIc } from "../../assets";
import thumbnailImg from "../../assets/image/thumbnailImg.png";
import { onLogout } from "../../core/api/logout";
import { getProducerPortfolio } from "../../core/api/producerProfile";
import { LoginUserImg } from "../../recoil/loginUserData";
import { ProducerProfileType } from "../../type/producerProfile";
import { UserPropsType } from "../../type/userPropsType";

export default function ProducerBriefInfo(props: UserPropsType) {
  const { userId } = props;
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [loginUserImg, setLoginUserImg] = useRecoilState(LoginUserImg);

  function changeProfileBoxDisplay() {
    setIsShow(!isShow);
  }

  const { data } = useQuery(["profile", userId], () => getProducerPortfolio(userId, 1), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      console.log(data?.producerProfile);
      setLoginUserImg(data.producerProfile.profileImage);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function logout() {
    onLogout();
    navigate("/");
  }

  function moveToMypage() {
    navigate(`/producer-profile/${userId}`);
  }

  return (
    <div onClick={changeProfileBoxDisplay}>
      <InfoContainer>
        <div>
          <ProfileImage src={data?.producerProfile?.profileImage} />
        </div>
        <UserName>{data?.producerProfile?.name}</UserName>
      </InfoContainer>
      <Blank></Blank>
      {isShow && (
        <UserInfoContainer>
          <InfoBox>
            <InfoProfileImage src={data?.producerProfile?.profileImage} onClick={moveToMypage} />
            <TextWrapper>
              <InfoUserName onClick={moveToMypage}>{data?.producerProfile?.name}</InfoUserName>
              <MainInfoProducerIc />
              <UserEmail>{data?.producerProfile?.contact}</UserEmail>
            </TextWrapper>
          </InfoBox>
          <LogoutBox onClick={logout}>
            Log out
            <MainLogoutIc />
          </LogoutBox>
        </UserInfoContainer>
      )}
    </div>
  );
}

const InfoContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5.2rem;
  padding: 0 2.2rem 0 1.3rem;

  background-color: ${({ theme }) => theme.colors.sub1};

  border-radius: 3rem;

  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 3.2rem;
  width: 3.2rem;

  margin-right: 1.2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
`;

const UserName = styled.strong`
  ${({ theme }) => theme.fonts.id}
`;

const UserInfoContainer = styled.section`
  position: absolute;
  top: 12.4rem;
  right: 7.1rem;

  height: 17.1rem;
  width: 37.1rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 0.5rem;

  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;

  margin-top: 1.7rem;
  padding-bottom: 1.7rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
`;

const InfoProfileImage = styled.img`
  height: 8rem;
  width: 8rem;

  margin-left: 2.2rem;

  border-radius: 50%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 1.8rem;
`;

const InfoUserName = styled.strong`
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;

const UserEmail = styled.strong`
  margin-top: 0.9rem;

  ${({ theme }) => theme.fonts.description}

  color: ${({ theme }) => theme.colors.gray3};
`;

const LogoutBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 5.7rem;
  padding: 0 1.1rem 0 2.2rem;

  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.white};
`;

const Blank = styled.div`
  position: absolute;
  width: 50rem;
  height: 3rem;
`;
