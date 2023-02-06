import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, CommentBtnIc } from "../../assets";
import CommentWrite from "./commentWrite";
import EachUserComment from "./eachUserComment";
import { useEffect, useState, useMemo } from "react";
import { UploadDataType } from "../../type/uploadDataType";

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import { getComment } from "../../core/api/trackPost";
import { UserCommentType } from "../../type/userCommentsType";
import { postComment } from "../../core/api/trackPost";
import { useRecoilState } from "recoil";
import { endPost, postContent, postIsCompleted, postWavFile } from "../../recoil/postIsCompleted";
import { playMusic, showPlayerBar } from "../../recoil/player";
import Player from "../@common/player";
import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";

interface PropsType {
  closeComment: () => void;
  beatId: number;
}

export default function UserComment(props: PropsType) {
  const { closeComment, beatId } = props;

  const [comments, setComments] = useState<UserCommentType[]>();
  const [progress, setProgress] = useState<number>(0);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [currentAudioFile, setCurrentAudioFile] = useState<string>("");
  const [uploadData, setUploadData] = useState<UploadDataType>({
    content: "",
    wavFile: null,
  });
  const [audioInfos, setAudioInfos] = useState({
    title: "",
    name: "",
    progress: "",
    duration: 0,
    image: "",
  });

  const [isCompleted, setIsCompleted] = useRecoilState<boolean>(postIsCompleted);
  const [content, setContent] = useRecoilState<string>(postContent);
  const [wavFile, setWavFile] = useRecoilState(postWavFile);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const audio = useMemo(() => new Audio(), []);

  useEffect(() => {
    if (comments) {
      audio.src = comments[clickedIndex].vocalWavFile;
      setCurrentAudioFile(comments[clickedIndex].vocalWavFile);
      getAudioInfos(
        "title",
        comments[clickedIndex]?.vocalName,
        comments[clickedIndex]?.vocalProfileImage,
        comments[clickedIndex]?.vocalWavFileLength,
      );
    }
  }, [clickedIndex]);

  useEffect(() => {
    if (currentAudioFile) {
      playAudio();
    }
  }, [currentAudioFile]);

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

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getComment(page, 8);
      setComments((prev) => (prev ? [...prev, ...response?.commentList] : [...response?.commentList]));
      return { response, nextPage: page + 1 };
    }
  }

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "comments",
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.response.commentList.length !== 0 ? lastPage?.nextPage : undefined;
      },
    },
  );

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  //post
  function uploadComment(uploadData: UploadDataType) {
    setIsCompleted(true);
  }
  useEffect(() => {
    if (content && wavFile) {
      let formData = new FormData();
      formData.append("wavFile", wavFile);
      formData.append("content", content);
      mutate(formData);
    }
  }, [isCompleted]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("beatId");
      setUploadData({
        content: "",
        wavFile: null,
      });
      setContent("");
      setWavFile(null);
      setIsCompleted(false);
      setIsEnd(false);
    },
  });

  function getUploadData(text: string, audioFile: File | null) {
    setUploadData({
      content: text,
      wavFile: audioFile,
    });
  }

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;
    setAudioInfos(tempInfos);
  }

  function clickComment(index: number) {
    setClickedIndex(index);
  }

  function playAudio() {
    audio.play();
    setPlay(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function goProgress() {
    if (audio.duration) {
      const currentDuration = (audio.currentTime / audio.duration) * 100;
      setProgress(currentDuration);
    }
  }

  return (
    <>
      <CommentContainer>
        <CloseCommentBtn>
          <CloseBtnIc onClick={closeComment} />
        </CloseCommentBtn>
        <form>
          <CommentWrite getUploadData={getUploadData} />
          <AddWrapper>
            <div></div>

            <AddCommentIcon onClick={() => uploadComment(uploadData)} />
          </AddWrapper>
        </form>

        <CommentWriteWrapper>
          {comments &&
            comments.map((data, index) => {
              return (
                <EachUserComment
                  key={index}
                  commentInfo={data}
                  audio={audio}
                  clickedIndex={clickedIndex}
                  clickComment={clickComment}
                  pauseAudio={pauseAudio}
                  currentIndex={index}
                />
              );
            })}
          <BlurSection />
        </CommentWriteWrapper>
        <InfiniteWrapper ref={observerRef}></InfiniteWrapper>
      </CommentContainer>
      {showPlayer && (
        <Player
          audio={audio}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          progress={progress}
          audioInfos={audioInfos}
          play={play}
          setPlay={setPlay}
        />
      )}
    </>
  );
}

const CommentWriteWrapper = styled.div`
  /* position: fixed; */
`;

const CommentContainer = styled.section`
  width: 107.7rem;
  float: right;
  background-color: rgba(13, 14, 17, 0.75);
  backdrop-filter: blur(1.5rem);
  padding-left: 6.5rem;
  padding-top: 6.1rem;
  padding-right: 7.5rem;
  position: sticky;
  z-index: 1;
  top: 0;
  right: 0;
`;

const CloseCommentBtn = styled.div`
  width: 19.8rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.7rem;
`;

const CloseText = styled.strong`
  ${({ theme }) => theme.fonts.id};
  color: ${({ theme }) => theme.colors.white};
  margin-left: 0.5rem;
`;

const CommentBtnIcon = styled(CommentBtnIc)`
  height: 2rem;
  width: 100%;
`;

const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const AddCommentIcon = styled(AddCommentIc)`
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
`;

const BlurSection = styled.div`
  height: 32rem;
  width: 101.1rem;
  background: linear-gradient(360deg, #000000 27.81%, rgba(0, 0, 0, 0) 85.65%);
  bottom: 0;
  right: 0;
  position: sticky;
`;

const InfiniteWrapper = styled.div`
  width: 100%;
  height: 2rem;
`;
