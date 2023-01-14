import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { getProducerProfile, getSelectingTracks } from "../core/api/producerProfile";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import { RightArrorIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import { useRecoilValue, useRecoilState } from "recoil";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import Player from "../@components/@common/player";
import { playMusic, showPlayerBar } from "../recoil/player";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {tracksOrVocalsCheck} from "../recoil/tracksOrVocalsCheck"
import { Category } from "../core/common/categoryHeader";

export default function ProducerProfilePage() {
  const [profileData, setProfileData] = useState<ProducerProfileType>();
  const [portfolioData, setPortfolioData] = useState<ProducerPortfolioType[]>([]);
  const [profileState, setProfileState] = useState<string>("Portfolio");
  const [isMe, setIsMe] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const visible = useRecoilValue(uploadButtonClicked);

  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const { producerId } = useParams();

  const audio = useMemo(() => new Audio(), []);

  const [whom, setWhom]=useRecoilState(tracksOrVocalsCheck)

  // infinite
  const targetRef = useRef<any>();
  const page = useRef<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useEffect(()=>{
    setWhom(Category.TRACKS)
  },[])

  useEffect(() => {
    async function getData() {
      // const data = await getProducerProfile(Number(producerId));
      const data = await getProducerProfile(Number(2));
      setProfileData(data?.data?.data.producerProfile);
      setIsMe(data?.data?.data.isMe);
      console.log(data?.data?.data.producerProfile)
    }
    getData();
  }, []);

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        // `${process.env.REACT_APP_BASE_URL}/profile/producer/${producerId}?page=${page.current}&limit=3`,
        `${process.env.REACT_APP_BASE_URL}/profile/producer/${2}?page=${page.current}&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
          },
        },
      );
      setPortfolioData((prev) => prev && [...prev, ...data?.data?.producerPortfolio]);

      setHasNextPage(data?.data.producerPortfolio.length === 4);
      if (data?.data.producerPortfolio.length) {
        page.current += 1;
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    // if (!targetRef.current || !hasNextPage) return;
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(targetRef.current);

    return () => {
      io.disconnect();
    };
  }, [fetch, hasNextPage]);

  //end

  function playAudio() {
    audio.play();
    setPlay(true);

    console.log(play);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  useEffect(() => {
    if (play) {
      audio.addEventListener("timeupdate", () => {
        goProgress();
      });
    } else {
      audio.removeEventListener("timeupdate", () => {
        goProgress();
      });
    }
  }, [play]);

  function goProgress() {
    if (audio.duration) {
      const currentDuration = (audio.currentTime / audio.duration) * 100;
      console.log(audio.currentTime, audio.duration);
      setProgress(currentDuration);
      checkAudioQuit();
    }
  }

  function checkAudioQuit() {
    audio.duration === audio.currentTime && setPlay(false);
  }

  function changeToProfile() {
    setProfileState("Portfolio");
    setStateChange((prev) => !prev);
  }

  function changeToVocalSearch() {
    setProfileState("Vocal Searching");
    setStateChange((prev) => !prev);
  }

  async function getVocalSearchData() {
    const data = await getSelectingTracks();
    setPortfolioData(data?.data);
  }

  async function getProfileData() {
    const data = await getProducerProfile(Number(producerId));
    setPortfolioData(data?.data.producerPortfolio);
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  function getAudioInfos(title: string, image: string) {
    setTitle(title);
    setImage(image);
  }


  return (
    <>
      {visible && <TracksProfileUploadModal />}
      {profileData && <ProducerInfos profileData={profileData} />}
      <PageContainer>
        <GradientBox src={producerGradientImg} />
        <TabContainer>
          <PortfolioTab profileState={profileState} onClick={changeToProfile}>
            {profileState === "Portfolio" ? <RightArrorIcon /> : <BlankDiv />}
            Portfolio
          </PortfolioTab>
          <VocalSearchingTab profileState={profileState} onClick={changeToVocalSearch}>
            {profileState === "Vocal Searching" ? <RightArrorIcon /> : <BlankDiv />}
            Vocal Searching
          </VocalSearchingTab>
        </TabContainer>
        {portfolioData && (
          <ProducerPortFolioList
            isMe={isMe}
            portfolioData={portfolioData}
            profileState={profileState}
            stateChange={stateChange}
            audio={audio}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            duration={duration}
            getDuration={getDuration}
            getAudioInfos={getAudioInfos}
          />
        )}
      </PageContainer>
      <InfiniteDiv ref={targetRef}> </InfiniteDiv>

      {showPlayer && profileData && (
        <Player
          audio={audio}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          progress={progress}
          duration={duration}
          title={title}
          name={profileData?.name}
          image={image}
        />
      )}
    </>
  );
}
// infinite
const InfiniteDiv = styled.div`
  width: 100%;
  height: 1rem;
`;

const PageContainer = styled.section`
  display: flex;

  margin-left: 61rem;
`;

const GradientBox = styled.img`
  left: 60rem;
`;

const TabContainer = styled.ul`
  position: fixed;
  top: 6rem;
  left: 63.8rem;

  ${({ theme }) => theme.fonts.body1};
`;

const PortfolioTab = styled.li<{ profileState: string }>`
  height: 4rem;

  color: ${({ theme, profileState }) => (profileState === "Portfolio" ? theme.colors.white : theme.colors.gray3)};

  display: flex;
`;

const VocalSearchingTab = styled.li<{ profileState: string }>`
  height: 4rem;

  color: ${({ theme, profileState }) => (profileState === "Vocal Searching" ? theme.colors.white : theme.colors.gray3)};

  display: flex;
`;

const BlankDiv = styled.div`
  width: 3.5rem;
`;

const RightArrorIcon = styled(RightArrorIc)`
  margin-right: 1rem;
`;
