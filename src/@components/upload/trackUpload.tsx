import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import { uploadTrackJacketImage } from "../../recoil/upload";
import { useRecoilState } from "recoil";
import TrackUploadDefaultImg from "../../assets/image/trackUploadDefaultImg.png";
import { FileChangeIc } from "../../assets";

export default function TrackUpload() {
  const [trackUploadImg, setTrackUploadImg] = useState<string>(TrackUploadDefaultImg);
  const [tarckJacketImage, setTrackJacketImage] = useRecoilState<File | FormData>(uploadTrackJacketImage);

  const [isHover, setIsHover] = useState<boolean>(false);

  function setHover(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    if (trackUploadImg !== TrackUploadDefaultImg) {
      e.type === "mouseenter" ? setIsHover(true) : setIsHover(false);
    }
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      if (trackUploadImg === TrackUploadDefaultImg) {
        setTrackUploadImg(TrackUploadDefaultImg);
      } else {
        return;
      }
    }

    if (e.target.files !== null) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setTrackUploadImg(fileUrl);
      setTrackJacketImage(e.target.files[0]);
    }
  }

  async function convertURLtoFile(url: string) {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  }

  useEffect(() => {
    convertURLtoFile("../assets/image/trackUploadDefaultImg.png").then((data) => {
      setTrackJacketImage(data);
    });
  }, []);

  return (
    <Container>
      <SectionWrapper>
        <TrackImageBox>
          <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
            <TrackUploadImage
              src={trackUploadImg}
              alt="트랙이미지"
              onMouseEnter={setHover}
              onMouseLeave={setHover}
              isHover={isHover}
            />
          </label>
          <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
            {isHover && <FileChangeIcon onMouseEnter={setHover} onMouseLeave={setHover} />}
          </label>
        </TrackImageBox>
        <input
          type="file"
          id="imageFileUpload"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={uploadImage}
          readOnly
        />
        <UploadInfo />
      </SectionWrapper>
    </Container>
  );
}

const Container = styled.section`
  height: 76.2rem;
  width: 171rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 100%;
  /* width: 138.2rem; */

  display: flex;
  align-items: center;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const TrackImageBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  margin-left: 6.5rem;
  margin-right: 4.9rem;
  overflow: hidden;
  cursor: pointer;
`;

const TrackUploadImage = styled.img<{ isHover: boolean }>`
  width: 60.4rem;
  height: 60.4rem;
  object-fit: cover;
  ${(props) =>
    props.isHover
      ? css`
          background: rgba(30, 32, 37, 0.5);
          filter: blur(3rem);
        `
      : css`
          background: default;
          filter: default;
        `}
`;

const FileChangeIcon = styled(FileChangeIc)`
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;
