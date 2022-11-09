import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import MyNoticeDetail from './MyNoticeDetail';
import { useEffect } from 'react';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';

// 아이템 리스트
const ItemList = styled.div`
  width: 250px;
  display: flex;

  flex-direction: column;
  color: black;
  height: 320px;
  background-color: #f8ede3;
  margin-top: 30px;
  border-radius: 10%;
  box-shadow: 0.5rem 0.5rem 0.5rem gray;
  .state {
    justify-content: center;
    padding-left: 30%;
  }
  .regdate {
    justify-content: center;
    padding-left: 25%;
    padding-top: 3%;
  }

  &:hover {
    box-shadow: 0.5rem 0.5rem 0.5rem #b2b2b2;
  }

  cursor: pointer;
`;

// 검색 div
const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
`;
// 태그를 담을 div box
const TagBox = styled.div`
  display: grid;
  justify-content: space-evenly;
  min-height: 90px;
  column-gap: 10px;
  row-gap: 10px;
  grid: '. .';
`;
// 태그 하나하나의 div
const TagItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 15px;
  padding: 5px 20px;
  background-color: aliceblue;
  width: fit-content;
  height: 30px;
`;

//검색 input

const SearchInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 5px;
`;
// 아이템 나누기
const ItemGrid = styled.div`
  font-weight: 600;
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
  font-size: 20px;
  background-color: ${props => props.backgrounColor};
`;

const ItemGrid2 = styled.div`
  width: 100px;
  height: 200px;
  display: flex;
  justify-content: center;
`;

// 전체 영역 , pages에 60% 걸어둠
const Wrapper = styled.div`
  width: 100%;
`;
// 카드 여러개 map 해주는 style div
const ListTotal = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  margin-bottom: 10%;
  row-gap: 80px;
  column-gap: 40px;
  grid: '. . .';
  justify-content: space-between;
`;

// 자소서 작성 버튼
const CreateButton = styled.div`
  border-radius: 10px;
  box-shadow: 0.1rem 0.1rem 0.1rem #5837d0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #81c6e8;
  border-radius: 5px;

  :hover {
    background-color: #5da7db;
    box-shadow: 0.2rem 0.2rem 0.2rem #5837d0;
  }
`;

const SearchButton = styled.button`
  margin-left: 50px;
`;


const MyNoticeList = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState('');
  const [detailFlag, setDetailFlag] = useState(false);
  const [dropdownState, setDropdownState] = useState('전체보기');
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    getNoticeData();
  }, []);

  


  // axios get 하는 함수
  const getNoticeData = () => {
    axiosInstance
      .get(apis.notice)
      .then(response => {
        console.log([response.data], 'get해온값');
        setDummyData(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleDropdownState = e => {
    setDropdownState(e.target.value);
  };

  // useEffect(() => {
  //   getItems();
  // }, [dropdownState]);

  // const getItems = () => {
  //   getNoticeData();
  //   if (dropdownState === '전체보기') {
      
  //     setDummyData(dummyData);
      
  //   }

  //   if (dropdownState === '진행중') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '진행중'),
  //     );
  //   }
  //   if (dropdownState === '면접탈락') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '면접탈락'),
  //     );
  //   }
  //   if (dropdownState === '서류탈락') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '서류탈락'),
  //     );
  //   }
  //   if (dropdownState === '최종합격') {
      
  //     setDummyData(
  //       dummyData.filter(dummystate => dummystate.progress === '최종합격'),
  //     );
  //   }
    
  // };

  

  

  // 검색 함수

  const handleChangeSearch = e => {
    setSearchData(e.target.value);
  };

  // 검색 엔터 함수
  const keyDownSearch = e => {
    if (e.key === 'Enter') {
      setSearchData('');
    }
  };

  // 검색 버튼 클릭 함수

  const onClickSearch = () => {
    setSearchData('');
  };


  // 값을 디테일 페이지에 보내는 함수

  const onLinkDetail = async (e) => {
    e.preventDefault();
    navigate('/notice/detail', {
      state : {

      }
    });
  }

  return (
    <Wrapper>
      <SearchDiv>
        <SearchInput
          onChange={handleChangeSearch}
          value={searchData}
          onKeyDown={keyDownSearch}
          placeholder="태그를 검색하세요."
        ></SearchInput>
        <SearchButton onClick={onClickSearch}>🔍</SearchButton>
      </SearchDiv>
      <br></br>
      <br></br>
      {/*자소서 작성 버튼을 우측 으로 하기위한 div */}
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      >
        <Link to="/notice/add" style={{ textDecoration: 'none' }}>
          <CreateButton id="contentFont">자소서 작성</CreateButton>
        </Link>
      </div>
      <div>
        <select
          id="contentFont"
          defaultValue="전체보기"
          onChange={handleDropdownState}
        >
          <option value="전체보기">전체보기</option>
          <option value="진행중">진행중</option>
          <option value="서류탈락">서류탈락</option>
          <option value="최종합격">최종합격</option>
          <option value="면접탈락">면접탈락</option>
        </select>
      </div>
      <ListTotal>
        {dummyData.map((dummy, index) => (
          <div key={index}>
            
              <ItemList onClick={()=>{navigate('/notice/detail',{
                state:{
                  noticeSeq : dummy.noticeSeq
                }
              })}}>
                {/* <ItemGrid className="regdate" id="titleFont" width="100%">
                  {dummy.regDate}
                </ItemGrid> */}
                <ItemGrid id="contentFont" width="100%" marginTop="40px">
                  {dummy.coName}
                </ItemGrid>

                <ItemGrid id="contentFont" width="100%" marginTop="20px">
                  {dummy.noticeName}
                </ItemGrid>
                <br></br>
                <TagBox>
                  {dummy?.noticeTag?.split(', ').map((tag, index) => (
                    <TagItemBox id="contentFont" key={index}>
                      # {tag}
                    </TagItemBox>
                  ))}
                </TagBox>
                <br></br>

                <ItemGrid className="state" id="titleFont" width="100%">
                  {dummy.progress}
                </ItemGrid>
                <br></br>
              </ItemList>
            
          </div>
        ))}
      </ListTotal>
    </Wrapper>
  );
};

export default MyNoticeList;