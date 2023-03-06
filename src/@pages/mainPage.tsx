import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../@components/@common/mainHeader";
import Footer from "../@components/@common/footer";

import { MainTracksTextIc, MainVocalsTextIc } from "../assets";
import mainBackgroundImg from "../assets/image/mainBackgroundImg.png";
import hoverVocalsImg from "../assets/image/hoverVocalsImg.png";
import hoverTracksImg from "../assets/image/hoverTracksImg.png";
import mainSloganImg from "../assets/image/mainSloganImg.png";
import ConventionModal from "../@components/@common/conventionModal";
import { openConventionModal } from "../recoil/conventionModal";
import { useRecoilValue } from "recoil";

export default function MainPage() {
  const navigate = useNavigate();

  const [background, setBackground] = useState<string>(mainBackgroundImg);
  const [isTracksHover, setIsTracksHover] = useState<boolean>(false);
  const [isVocalsHover, setIsVocalsHover] = useState<boolean>(false);
  const showModal=useRecoilValue(openConventionModal)


  function setVocalsImg(e: React.MouseEvent<HTMLDivElement>) {
    setBackground(hoverVocalsImg);
    setIsVocalsHover(!isVocalsHover);
  }

  function setTracksImg(e: React.MouseEvent<HTMLDivElement>) {
    setBackground(hoverTracksImg);
    setIsTracksHover(!isTracksHover);
  }

  function setDefaultImg(e: React.MouseEvent<HTMLDivElement>) {
    setBackground(mainBackgroundImg);

    isTracksHover ? setIsTracksHover(!isTracksHover) : setIsVocalsHover(!isVocalsHover);
  }

  function movePage(e: React.MouseEvent<HTMLDivElement>) {
    isTracksHover ? navigate("/track-search") : navigate("/vocal-search");
  }

  return (
    <>
    <MainPageWrapper>
      <Header />
      <Main>
        <img src={background} alt="배경이미지" />
        <VocalsArea onMouseEnter={setVocalsImg} onMouseLeave={setDefaultImg} onClick={movePage} />
        <VocalsTextIcon isVocalsHover={isVocalsHover} />
        <TracksArea onMouseEnter={setTracksImg} onMouseLeave={setDefaultImg} onClick={movePage} />
        <MainTracksTextIcon isTracksHover={isTracksHover} />
        <MainSlogan src={mainSloganImg} alt="슬로건" />
      </Main>
      <Footer />
    </MainPageWrapper>

    {showModal&&(<ConventionModal/>)}
    </>
  );
}

const MainPageWrapper = styled.div`
  position: absolute;

  background-color: black;
`;

const Main = styled.main`
  width: 100%;
`;

const VocalsArea = styled.div`
  width: 48rem;
  height: 50rem;

  position: absolute;
  z-index: 99;
  top: 41rem;
  left: 129rem;
  transform: rotate(40deg);
  cursor: pointer;
`;

const VocalsTextIcon = styled(MainVocalsTextIc)<{ isVocalsHover: boolean }>`
  position: absolute;
  top: 77rem;
  left: 151.7rem;

  background-repeat: no-repeat;

  ${(props) =>
    props.isVocalsHover &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const TracksArea = styled.div`
  width: 50rem;
  height: 47rem;

  position: absolute;
  z-index: 99;
  top: 8rem;
  left: 86.5rem;
  //top: 3.2rem;
  //left: 72rem;
  transform: rotate(-50deg);
  border-radius: 2.8rem 0 0;
  cursor: pointer;
`;

const MainTracksTextIcon = styled(MainTracksTextIc)<{ isTracksHover: boolean }>`
  position: absolute;

  top: 41rem;
  left: 110rem;
  background-repeat: no-repeat;

  ${(props) =>
    props.isTracksHover &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const MainSlogan = styled.img`
  position: absolute;
  top: 50.6rem;
  left: 8.7rem;
`;
