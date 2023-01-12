import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Category } from "../../core/common/categoryHeader";

import {
  ToggleIc,
  Track1Ic,
  TracksSelectTextIc,
  VocalsSelectTextIc,
  TracksHeaderTextIc,
  VocalsHeaderTextIc,
  TrackOneMainLogoIc,
  
} from "../../assets";
import profileImg from "../../assets/image/profileImg.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { UserType } from '../../recoil/main';

export default function CategoryHeader() {
  const navigate = useNavigate();
  const [tracksOrVocals, setTracksOrVocals] = useRecoilState<any>(tracksOrVocalsCheck);
  const user=useRecoilValue(UserType)

  function moveTrackSearchPage() {
    setTracksOrVocals(Category.TRACKS);
    navigate("/track-search");
  }

  function moveVocalSearchPage() {
    setTracksOrVocals(Category.VOCALS);
    navigate("/vocal-search");
  }

  function moveMainPage() {
    navigate("/");
  }

  function moveMypage(){
    user==="vocal"?navigate("/vocal-profile/1", {state:1}):navigate("/producer-profile/2", {state:2})
  }

  return (
    <CategoryHeaderContainer>
      <CategoryContainer>
        <CategoryWrapper>
          {tracksOrVocals === Category.TRACKS && (
            <>
              <TracksSelectTextIcon onClick={moveTrackSearchPage} />
              <VocalsHeaderTextIcon onClick={moveVocalSearchPage} />
            </>
          )}
          {tracksOrVocals === Category.VOCALS && (
            <>
              <TracksHeaderTextIcon onClick={moveTrackSearchPage} />
              <VocalsSelectTextIcon onClick={moveVocalSearchPage} />
            </>
          )}
        </CategoryWrapper>
      </CategoryContainer>

      <HeaderContainer>
        <HeaderWrapper>
          <TrackOneMainLogoIcon onClick={moveMainPage} />
          <ProfileWrapper onClick={moveMypage}>
            <ProfileImg src={profileImg} alt="프로필이미지" />
            <ToggleIc />
          </ProfileWrapper>
        </HeaderWrapper>
      </HeaderContainer>
    </CategoryHeaderContainer>
  );
}

const CategoryHeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;

  width: 192rem;
  height: 14.3rem;

  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.sub3} 49.92%,
    rgba(0, 0, 0, 0) 105.16%,
    rgba(13, 14, 17, 0) 105.16%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  height: 14.3rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 5.9rem 7.5rem;

  height: 100%;
`;

const TrackOneMainLogoIcon = styled(TrackOneMainLogoIc)`
  cursor: pointer;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryWrapper = styled.div`
  display: flex;

  position: absolute;
  z-index: 2;

  margin-top: 6.65rem;

  ${({ theme }) => theme.fonts.body1};
`;

const TracksSelectTextIcon = styled(TracksSelectTextIc)`
  cursor: pointer;
`;

const TracksHeaderTextIcon = styled(TracksHeaderTextIc)`
  cursor: pointer;
`;

const VocalsSelectTextIcon = styled(VocalsSelectTextIc)`
  margin-left: 7.368rem;

  cursor: pointer;
`;

const VocalsHeaderTextIcon = styled(VocalsHeaderTextIc)`
  margin-left: 7.368rem;

  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const ProfileImg = styled.img`
  margin-right: 1.29rem;

  border: 0.15rem solid white;
  border-radius: 2.4rem;
`;
