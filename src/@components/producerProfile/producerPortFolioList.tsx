import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PauseBtnIc, PortfolioPlayBtnIc,ProducerProfilePauseIc,ProducerProfilePlayIc } from "../../assets";
import { ProducerPortfolioType } from "../../type/producerProfile";
import PortfoliosInform from "../@common/portfoliosInform";

interface PropsType {
  portfolioData: ProducerPortfolioType[];
  isMe: boolean;
  profileState: string;
}

export default function ProducerPortFolioList(props: PropsType) {
  const { portfolioData, isMe, profileState } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const [play, setPlay] = useState<boolean>(false);

  function hoverPortfolio(id: number) {
    setHoveredIndex(id);
  }

  function hoverOutPortfolio() {
    setHoveredIndex(-1);
  }
  function clickPauseIc(id: number) {
    setPlay(true);
    setClickedIndex(id);
  }

  function clickPlayIc() {
    setPlay(false);
  }

  return (
    <>
    <ProfileListContainer>
      {portfolioData.map((portfolio, index) => {
        return (
          <PortfolioBox
            key={portfolio.id}
            isLarge={index === 0 || clickedIndex === portfolio.id}
            onMouseEnter={() => hoverPortfolio(portfolio.id)}
            onMouseLeave={hoverOutPortfolio}
            index={index}
            profileState={profileState}
            producerPortfolioClickBool={clickedIndex === portfolio.id}
            onClick={() => setClickedIndex(portfolio.id)}>
            <div>
            {/* <PortfolioPlayBtnIcon />
            <PauseBtnIcon /> */}
            {((clickedIndex === portfolio.id &&
              clickedIndex !== portfolio.id &&
              hoveredIndex !== -1) ||
              (!play &&
                hoveredIndex === portfolio.id &&
                hoveredIndex !== -1)) && (
              <ProducerProfilePauseIcon onClick={() => clickPauseIc(portfolio.id)} />
            )}
            {play &&
              clickedIndex === portfolio.id &&
              hoveredIndex === portfolio.id &&
              hoveredIndex !== -1 &&
              clickedIndex !== -1 && <ProducerProfilePlayIcon onClick={clickPlayIc}/>}


            {hoveredIndex === portfolio.id && hoveredIndex !== -1 && (
              <ProducerPorfolioBlur index={index} producerPortfolioClickBool={clickedIndex === portfolio.id} profileState={profileState}/>
            )}

              <PortfolioImage
                src={portfolio.jacketImage}
                isLarge={index === 0 || clickedIndex === portfolio.id}
                index={index}
                profileState={profileState}
                clickBool={clickedIndex === portfolio.id}
              />
            </div>
            {index === 0 &&
              hoveredIndex !== portfolio.id &&
              clickedIndex !== null &&
              clickedIndex !== portfolio.id && <AudioTitle hoverBool={hoveredIndex === portfolio.id} clickBool={clickedIndex === portfolio.id}>{portfolio.title}</AudioTitle>}
            {index !== 0 && <AudioTitle hoverBool={hoveredIndex === portfolio.id} clickBool={clickedIndex === portfolio.id}>{portfolio.title}</AudioTitle>}
          </PortfolioBox>
        );
      })}
    </ProfileListContainer>
    {portfolioData&&
    (<InformWrapper>
    <PortfoliosInform isMe={isMe} hoverId={hoveredIndex} clickId={clickedIndex} portfolios={portfolioData} profileState={profileState}/>
    </InformWrapper>)}
    </>
  );
}

const ProducerPorfolioBlur = styled.div<{ index: number; producerPortfolioClickBool: boolean, profileState:string }>`
  position: absolute;
  z-index: 3;

  width: ${({ producerPortfolioClickBool, profileState,index }) => ((index === 0&&profileState!=="Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8)}rem;
  height: ${({ producerPortfolioClickBool, profileState,index }) => ((index === 0&&profileState!=="Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8)}rem;

  /* margin-top: ${({ producerPortfolioClickBool, index,profileState }) => (index !== 0 && !producerPortfolioClickBool ? -8.5 : -12)}rem;
  margin-top: ${({ producerPortfolioClickBool, index,profileState }) => index !== 0 && producerPortfolioClickBool && -8.5}rem; */

  /* margin-top: ${({ index,profileState }) => (index === 0 && profileState!=="Vocal Searching" ? 0 : 1)}rem; */
  /* margin-top: ${({ index,profileState }) => (index === 0 && profileState==="Vocal Searching" &&0)}rem; */


  border-radius: 50%;

  transform: rotate(45deg);

  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
`;


const InformWrapper=styled.div`
  margin-left: -77.2rem;
`

const ProfileListContainer = styled.section`
  width: 47.8rem;

  border: 0.3rem solid transparent;
  border-top-left-radius: 47.8rem;
  border-top-right-radius: 47.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: -16rem;
  margin-top: 23.3rem;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PortfolioBox = styled.article<{ isLarge: boolean; index: number, profileState:string, producerPortfolioClickBool:boolean }>`
  /* height: ${({ isLarge,profileState }) => (isLarge&&profileState!=="Vocal Searching" ? 42 : 21.8)}rem;
  width: ${({ isLarge,profileState }) => (isLarge&&profileState!=="Vocal Searching" ? 42 : 21.8)}rem; */
  width: ${({ producerPortfolioClickBool, profileState,index }) => ((index === 0&&profileState!=="Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8)}rem;
  height: ${({ producerPortfolioClickBool, profileState,index }) => ((index === 0&&profileState!=="Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8)}rem;

  position: relative;

  border-radius: 50%;

  overflow: hidden;

  margin-top: ${({ index,profileState }) => (index === 0 && profileState!=="Vocal Searching" ? 3 : 4)}rem;
  margin-top: ${({ index,profileState }) => (index === 0 && profileState==="Vocal Searching" &&13)}rem;
  margin-top: ${({ index,profileState,producerPortfolioClickBool }) => (index === 0 && profileState==="Vocal Searching"&&producerPortfolioClickBool &&3)}rem;


  :hover {
      box-shadow:0 0 4rem ${({ theme }) => theme.colors.sub1};

  }
`;

const PortfolioImage = styled.img<{ isLarge: boolean; index: number, profileState:string, clickBool:boolean }>`
  height: ${({ clickBool,index,profileState }) => ((index===0&&profileState!=="Vocal Searching")||clickBool ? 42 : 21.8)}rem;
  width: ${({ clickBool,index,profileState }) => ((index===0&&profileState!=="Vocal Searching")||clickBool ? 42 : 21.8)}rem;

  :hover {
    
  }
  /* opacity: ${({clickBool})=>clickBool?1:0.2}; */
`;

const ProducerProfilePauseIcon = styled(ProducerProfilePauseIc)`
  position: absolute;
  z-index: 100;
  /* pointer-events: none; */

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProducerProfilePlayIcon = styled(ProducerProfilePauseIc)`
  position: absolute;
  z-index: 100;
  /* pointer-events: none; */

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AudioTitle = styled.h1<{hoverBool:boolean, clickBool:boolean}>`
  color: ${({ theme }) => theme.colors.gray2};
  display: ${({hoverBool,clickBool})=>(hoverBool||clickBool)&&"none"};

  ${({ theme }) => theme.fonts.id}

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
