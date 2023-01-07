import styled from "styled-components";
import { useEffect, useState } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { getProducerProfile, getSelectingTracks } from "../core/api/producerProfile";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import { RightArrorIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";

export default function ProducerProfilePage() {
  const [profileData, setProfileData] = useState<ProducerProfileType>();
  const [portfolioData, setPortfolioData] = useState<ProducerPortfolioType[]>();
  const [profileState, setProfileState] = useState<string>("Portfolio");
  const [isMe, setIsMe] = useState<boolean>(false) 
  const [stateChange,setStateChange]=useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const data = await getProducerProfile();

      setPortfolioData(data?.data[0].producerPortfolio);
      setProfileData(data?.data[0].producerProfile);
      setIsMe(data?.data[0].isMe)
    }
    getData();
  }, []);

  useEffect(()=>{
    async function getData() {
      profileState==="Portfolio"?await getProfileData():await getVocalSearchData();
    }
    getData();
  },[profileState]) 


  function changeToProfile() {
    setProfileState("Portfolio");
    setStateChange((prev)=>!prev)
  }

  function changeToVocalSearch() {
    setProfileState("Vocal Searching");
    setStateChange((prev)=>!prev)
  }

  async function getVocalSearchData() {
    const data = await getSelectingTracks();
    setPortfolioData(data?.data);
  }

  async function getProfileData() {
    const data = await getProducerProfile();
    setPortfolioData(data?.data[0].producerPortfolio);
  }

  return (
    <PageContainer>
      {profileData && <ProducerInfos profileData={profileData} />}
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
      {portfolioData && <ProducerPortFolioList isMe={isMe} portfolioData={portfolioData} profileState={profileState} stateChange={stateChange}/>}
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
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
