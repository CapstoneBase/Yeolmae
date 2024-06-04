import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
// import axios from '../hooks/useAxios';
// import Wrapper from '../../Common/Wrapper';
import Button from '../../Common/Button';
import './createPostStyle.css';

const BoardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  margin: 10px 0px 10px 0px;
`;

function CreatePost() {
  const [input, setInput] = useState({
    category: '',
    parentCategory: '',
    title: '',
    content: '',
    imageUrl: ''
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  /* const { resetBoard } = useState();
  // effect : 마운트 시 실행할 함수
  useEffect(() => {
    resetBoard();
  }, []); */

  const navigate = useNavigate();

  const submitPost = (e) => {
    e.preventDefault();
    if (!input.title) {
      return alert('제목을 입력해주세요.');
    }
    if (!input.content) {
      return alert('내용을 입력해주세요.');
    }

    const body = {
      category: input.category,
      parentCategory: input.parentCategory,
      title: input.title,
      content: input.content,
      imageUrl: input.imageUrl
    };

    axios
      .post('/api/v1/posts', body)
      .then((res) => {
        console.log(input);
        console.log(res.data);
        // console.log(res);
        if (res.status === 200) {
          console.log('게시글 작성 성공');
          navigate('/{postsid}');
        }
      })
      .catch((err) => {
        console.log(input);
        console.error(err.response);
        if (err.response.status === 403) {
          alert('게시글 업로드에 실패하였습니다.');
        }
      });
    return null;
  };

  return (
    <div className="Wrapper">
      <BoardWrapper>
        <div className="CreateBoardTitleBox">
          <input
            className="InputBoardTitle"
            id="title"
            name="title"
            type="text"
            placeholder="제목"
            onChange={onChange}
          />
        </div>
        <div className="CreateBoardContentBox">
          <textarea
            className="InputBoardTextarea"
            id="title"
            name="title"
            type="content"
            placeholder="내용"
            onChange={onChange}
          />
        </div>
        <input className="UploadFile" type="file" text="파일 첨부" />
      </BoardWrapper>
      <Button onClick={submitPost} text="작성완료" />
    </div>
  );
}
export default CreatePost;