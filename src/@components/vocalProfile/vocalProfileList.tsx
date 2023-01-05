import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import vocals from "../../mocks/vocalProfileDummy.json";
import { showPlayerBar, playMusic, selectedId } from "../../recoil/player";
import { VocalProfileBlurPauseIc, VocalProfileBlurPlayIc } from "../../assets";
import PortfoliosInform from '../@common/portfoliosInform';
import { getVocalProfile }  from "../../core/api/vocalProfile";
import { PortfolioType } from "../../type/profilePropsType";

export default function VocalProfileList() {
  const [vocalPortfolioHover, setVocalPortfolioHover] = useState<number>(-1);
  const [vocalPortfolioClick, setVocalPortfolioClick] = useRecoilState<number>(selectedId);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [vocalPortfolioData, setVocalPortfolioData]=useState<PortfolioType[]>();
  const [isMe, setIsMe]=useState<boolean>(false);

  function mouseOverVocalPortfolio(id: number) {
    setVocalPortfolioHover(id);
    console.log(id)
  }

  function mouseOutVocalPortfolio() {
    setVocalPortfolioHover(-1);
  }

  function clickPauseIc(id: number) {
    setShowPlayer(true);
    setPlay(true);
    setVocalPortfolioClick(id);
  }

  function clickPlayIc() {
    setPlay(false);
  }
  
  useEffect(()=> {
    getVocalProfile()
    .then((res) => {
      if (res){
        setVocalPortfolioData(res.data[0].vocalPortfolio)
        setIsMe(res.data[0].isMe)
      }
    })
  },[])

  const vocalPortfolioCount= vocalPortfolioData ? vocalPortfolioData.length:0

  return (
    <VocalProfileListWrapper>
      <VocalsPortfolioWrapper>
        {vocalPortfolioData&&vocalPortfolioData.map((vocal, idx) => (
          <VocalPortfolio
            key={vocal.id}
            onMouseEnter={() => mouseOverVocalPortfolio(vocal.id)}
            onMouseLeave={mouseOutVocalPortfolio}>
            {((vocalPortfolioHover === vocal.id &&
              vocalPortfolioClick !== vocal.id &&
              vocalPortfolioHover !== -1) ||
              (!play &&
                vocalPortfolioHover === vocal.id &&
                vocalPortfolioClick === vocal.id &&
                vocalPortfolioHover !== -1)) && (
              <VocalProfileBlurPauseIcon onClick={() => clickPauseIc(vocal.id)} />
            )}
            {play &&
              vocalPortfolioClick === vocal.id &&
              vocalPortfolioHover === vocal.id &&
              vocalPortfolioHover !== -1 &&
              vocalPortfolioClick !== -1 && <VocalProfileBlurPlayIcon onClick={clickPlayIc} />}
            <VocalPortfolioTitle>
              {vocalPortfolioClick !== vocal.id &&
                vocalPortfolioHover !== vocal.id &&
                vocal.title}
            </VocalPortfolioTitle>
            {vocalPortfolioHover === vocal.id && vocalPortfolioHover !== -1 && (
              <VocalPorfolioBlur idx={idx} vocalPortfolioClickBool={vocalPortfolioClick === vocal.id} />
            )}
            <VocalPortfolioImg
              // src={require("../../assets/image/" + vocal.jacketImage + ".png")}
              src={require("../../assets/image/" + "vocalPortfolioList1" + ".png")}
              alt="보컬 포트폴리오이미지"
              idx={idx}
              vocalPortfolioHoverBool={vocalPortfolioHover === vocal.id}
              vocalPortfolioClickBool={vocalPortfolioClick === vocal.id}
            />
          </VocalPortfolio>
        ))}
      </VocalsPortfolioWrapper>

      <VocalsBoxWrapper>
        <VocalsBoxBody vocalPortfolioCount={vocalPortfolioCount}></VocalsBoxBody>
        <VocalsBoxHead></VocalsBoxHead>
      </VocalsBoxWrapper>

      {vocalPortfolioData&&<PortfoliosInform isMe={isMe} hoverId={vocalPortfolioHover} clickId={vocalPortfolioClick} portfolios={vocalPortfolioData}/>}
    </VocalProfileListWrapper>
  );
}

const VocalProfileListWrapper = styled.section`
  position: absolute;
  z-index: 5;

  width: 132rem;
`;

const VocalsBoxWrapper = styled.section``;

const VocalsBoxHead = styled.div`
  width: 36rem;
  height: 36rem;
  margin: 31rem 0 0 34.65rem;

  transform: rotate(45deg);

  border: 0.34rem solid ${({ theme }) => theme.colors.sub2};
  border-radius: 5rem 3rem 5.4rem 3rem;
`;

const VocalsBoxBody = styled.div<{ vocalPortfolioCount: number }>`
  position: absolute;
  z-index: 3;

  height: ${({ vocalPortfolioCount }) => (vocalPortfolioCount-1) * 26 + 80}rem;
  width: 48.4rem;
  margin-left: 28.45rem;
  margin-top: 18rem;;

  border-left: 0.34rem solid transparent;
  border-right: 0.34rem solid transparent;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to top, ${({ theme }) => theme.colors.sub3} -5%, ${({ theme }) => theme.colors.sub2} 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const VocalsPortfolioWrapper = styled.section`
  position: absolute;
  z-index: 4;
  margin: 35rem 0 0 37rem;
`;

const VocalPortfolio = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VocalPortfolioTitle = styled.div`
  position: absolute;
  z-index: 5;

  display: flex;
  justify-content: center;

  width: 14rem;
  height: 5rem;
  margin-top: -5.5rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;

  ${({ theme }) => theme.fonts.id};
  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;
`;

const VocalProfileBlurPlayIcon = styled(VocalProfileBlurPlayIc)`
  position: absolute;
  z-index: 10;

  margin-top: -8.5rem;
  cursor: pointer;
`;

const VocalProfileBlurPauseIcon = styled(VocalProfileBlurPauseIc)`
  position: absolute;
  z-index: 10;

  margin-top: -8.5rem;
  cursor: pointer;
`;

const VocalPorfolioBlur = styled.div<{ idx: number; vocalPortfolioClickBool: boolean }>`
  position: absolute;
  z-index: 3;

  width: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32 : 16.7)}rem;
  height: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32 : 16.7)}rem;

  margin-top: ${({ vocalPortfolioClickBool, idx }) => (idx !== 0 && !vocalPortfolioClickBool ? -8.5 : -12)}rem;
  margin-top: ${({ vocalPortfolioClickBool, idx }) => idx !== 0 && vocalPortfolioClickBool && -8.5}rem;

  border-radius: 3rem;

  transform: rotate(45deg);

  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
`;

const VocalPortfolioImg = styled.img<{
  idx: number;
  vocalPortfolioHoverBool: boolean;
  vocalPortfolioClickBool: boolean;
}>`
  width: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32 : 16.7)}rem;
  height: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32 : 16.7)}rem;
  border-radius: 3rem;

  transform: rotate(45deg);

  margin-bottom: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 12 : 8.5)}rem;
  margin-top: ${({ vocalPortfolioClickBool, idx }) => idx !== 0 && vocalPortfolioClickBool && 3.5}rem;

  box-shadow: 0 0 4rem
    ${({ vocalPortfolioHoverBool, vocalPortfolioClickBool, theme }) =>
      vocalPortfolioHoverBool && !vocalPortfolioClickBool && theme.colors.sub2};

  opacity: ${({ vocalPortfolioHoverBool, vocalPortfolioClickBool }) =>
    !vocalPortfolioHoverBool && !vocalPortfolioClickBool && 0.2};

  cursor: pointer;
`;
