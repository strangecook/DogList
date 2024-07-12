import React from 'react';
import styled from 'styled-components';

const UsageContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto; /* 위에 여백 추가 */
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  border-bottom: 2px solid #6CC18E;
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-size: 24px;
  color: #333333;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #555555;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

const ListItem = styled.li`
  font-size: 18px;
  line-height: 1.6;
  color: #555555;
`;

const Usage = () => {
  return (
    <UsageContainer>
      <h2>사용 설명</h2>

      <Section>
        <SectionTitle>왜 이 사이트를 만들게 되었나</SectionTitle>
        <Paragraph>
          초대형견을 찾고 싶어서 네이버에 검색해 보았지만, 정보는 부족하고, 중복된 몇 가지 품종만 나왔습니다. 각 품종의 정보를 개별적으로 확인하는 것도 번거로웠고, 데이터를 한눈에 보기도 어려웠습니다. 게다가, 여러 카페나 블로그에서 정보를 찾는 과정도 쉽지 않았습니다. 대부분의 블로그는 정확한 정보 없이 복사해 붙여넣은 글들뿐이었습니다. 양질의 글은 거의 찾아볼 수 없었습니다.
        </Paragraph>
        <Paragraph>
          그래서 저는 생각했습니다. <strong>"이럴 바엔 내가 직접 만들자."</strong>
        </Paragraph>
        <Paragraph>
          저희 사이트는 누구나 강아지에 대한 데이터를 쉽게 찾고, 수정할 수 있도록 하여 더 나은 정보를 모으는 것을 목표로 합니다. 어떤 품종이 어떻게 생겼고, 어떤 점이 좋은지 명확하게 알 수 있도록 데이터를 모으고 정리하였습니다.
        </Paragraph>
        <Paragraph>
          저희 사이트는 "내가 원하는 강아지를 쉽게 찾고, 정보를 바로 얻을 수 있는 곳"이 되기 위해 최선을 다하고 있습니다.
        </Paragraph>
        <Paragraph>
          여러분의 참여와 기여를 통해, 강아지에 대한 최고의 정보를 제공하는 사이트로 성장해 나가겠습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>개요</SectionTitle>
        <Paragraph>이 웹사이트는 강아지 품종에 대한 상세 정보를 제공하며, 사용자가 적합한 품종을 찾을 수 있도록 도와줍니다.</Paragraph>
      </Section>

      <Section>
        <SectionTitle>시작하기</SectionTitle>
        <Paragraph>회원 가입 및 로그인을 통해 개인 맞춤형 서비스를 이용하실 수 있습니다.</Paragraph>
        <List>
          <ListItem>회원 가입: 이메일과 비밀번호를 입력하여 회원 가입을 합니다.</ListItem>
          <ListItem>로그인: 가입한 이메일과 비밀번호를 사용하여 로그인합니다.</ListItem>
          <ListItem>프로필 수정: 로그인 후, 프로필 페이지에서 개인 정보를 수정할 수 있습니다.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>주요 기능</SectionTitle>
        <Paragraph>다양한 강아지 품종의 정보를 확인하고, 적합한 품종을 검색 및 필터링할 수 있습니다.</Paragraph>
        <List>
          <ListItem>홈 페이지: 최신 정보 및 추천 품종을 확인할 수 있습니다.</ListItem>
          <ListItem>검색 기능: 특정 품종을 검색할 수 있습니다.</ListItem>
          <ListItem>필터링: 품종을 크기, 털 타입 등 다양한 기준으로 필터링할 수 있습니다.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>탐색</SectionTitle>
        <Paragraph>사이트 메뉴를 통해 쉽게 원하는 정보를 찾을 수 있습니다.</Paragraph>
        <List>
          <ListItem>홈: 주요 페이지로 이동합니다.</ListItem>
          <ListItem>사용 설명: 이 페이지입니다.</ListItem>
          <ListItem>라이센스: 웹사이트의 라이센스 정보를 확인할 수 있습니다.</ListItem>
          <ListItem>개발자 문의: 개발자에게 문의할 수 있습니다.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>데이터 및 정보</SectionTitle>
        <Paragraph>
          저희 사이트의 정보 데이터는 AKC(American Kennel Club)의 데이터를 기준으로 작성되었습니다. 사진 데이터는 AKC와 The Dog API에서 제공받아 사용하고 있습니다.
        </Paragraph>
        <Paragraph>
          개발 초보자인 저도 만족할 수 있는 웹사이트를 만들 수 있도록 도움을 준 ChatGPT에게 깊이 감사드립니다. 또한, 저에게 개발의 용기를 주신 피터 레벨스에게도 진심으로 감사의 말씀을 드립니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>FAQ</SectionTitle>
        <Paragraph>자주 묻는 질문과 그에 대한 답변을 확인할 수 있습니다.</Paragraph>
      </Section>

      <Section>
        <SectionTitle>지원 및 문의</SectionTitle>
        <Paragraph>추가 지원이 필요하거나 문제를 보고하려면 개발자에게 문의하십시오.</Paragraph>
      </Section>

    </UsageContainer>
  );
};

export default Usage;
