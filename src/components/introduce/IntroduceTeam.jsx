import React from "react";
import { Col, Row } from "reactstrap";
import Team from "assets/animation/Team.json";
import Lottie from "react-lottie";
import { Paper } from "@material-ui/core";
import SupporterCardComp from "components/SupporterCardComp";

import supporter1 from "assets/images/supporter1.jpeg";
import supporter2 from "assets/images/supporter2.jpeg";
import supporter3 from "assets/images/supporter3.jpeg";
import supporter4 from "assets/images/supporter4.jpeg";
import supporter5 from "assets/images/supporter5.jpeg";
import supporter6 from "assets/images/supporter6.jpeg";

const IntroduceTeam = () => {
  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: Team,
  };

  return (
    <div>
      <div className="inner10">
        <div style={{ marginTop: 50 }}>
          <Row>
            <Col lg="6">
              <h1>공모자들</h1>
              <h4>무슨 동아리인가요?</h4>
              <hr />
              <p>
                춘천 유일의 공모전 연합동아리 입니다.
                <br />
                '공모자들'에서는 경험이 없어도, 잘 하지 못해도 누구든 다양한
                사람들과 함께 공모전에 도전할 수 있습니다.
              </p>
              <p>
                소수로 구성된 여러 팀들은 다양한 공모전에 도전합니다. 수 많은
                회의를 통해서 만들어낸 결과물을 통해서, 스펙은 덤! 개개인의
                다양한 경험과 역량을 발전시킬 수 있습니다.
              </p>
            </Col>
            <Col lg="6">
              <Lottie options={animationOption} height="100%" />
            </Col>
          </Row>
        </div>

        <Row style={{ marginTop: 20 }} className="Introduce">
          <Col lg="4">
            <Paper elevation={3} style={PaperStyle} className="hover-up">
              <h3>공모전</h3>
              <hr />
              <li>대학의 꽃은 대외활동!</li>
              <li>뜻 맞는 사람들끼리 다양한 공모전에 참여/도전하자!</li>
              <li>
                수 많은 회의를 통해 결과물을 만들어 개개인의 다양한 경험과
                역량을 발전시켜 나갑니다.
              </li>
            </Paper>
          </Col>
          <Col lg="4">
            <Paper elevation={3} style={PaperStyle} className="hover-up">
              <h3>수상/경험</h3>
              <hr />
              <li>취업은 해야겠는데 스펙이 없어?</li>
              <li>
                공모자들과 함께 빠방한 공모전 수상 경험 쌓아서 마케팅, 기획,
                IT등 다양한 흥미분야에서 스펙을 쌓을 수 있습니다.
              </li>
            </Paper>
          </Col>
          <Col lg="4">
            <Paper elevation={3} style={PaperStyle} className="hover-up">
              <h3>친목 활동</h3>
              <hr />
              <li>고생많았다 동지들.. 뒷풀이 시간이다!</li>
              <li>
                끝없는 회의를 함께 헤쳐나간 팀원들과 함께 즐기는 시간도
                필요하겠죠?
              </li>
              <li>친구 만들기도 좋은 공모자들! 함께해요~</li>
            </Paper>
          </Col>
        </Row>

        <div style={{ marginTop: 50, textAlign: "center" }}>
          <h1>
            공모자들,
            <br />
            서포터즈를 소개합니다.
          </h1>
          <h4>우리 '공모자들'이 운영되고 힘써주시는 서포터즈 분들입니다!</h4>
          <hr />
          <Row>
            <Col lg="3">
              <SupporterCardComp
                img={supporter1}
                name="찐마"
                desc="한림대학교 글로벌비즈니스 졸업"
              />
            </Col>
            <Col lg="3">
              <SupporterCardComp
                img={supporter2}
                name="토마토"
                desc="우송대학교 글로벌철도융합학과 4학년 재학중"
              />
            </Col>
            <Col lg="3">
              <SupporterCardComp
                img={supporter3}
                name="혀니"
                desc="한림대학교 글로벌비즈니스학과 4학년 휴학중"
              />
            </Col>
            <Col lg="3">
              <SupporterCardComp
                img={supporter4}
                name="두리"
                desc="강원대학교 통계학과 3학년 재학중"
              />
            </Col>
            <Col lg="3">
              <SupporterCardComp
                img={supporter5}
                name="원"
                desc="한림대학교 글로벌비즈니스학과 4학년 휴학중"
              />
            </Col>
            <Col lg="3">
              <SupporterCardComp
                img={supporter6}
                name="찬"
                desc="한림대학교 콘텐츠IT학과 졸업"
              />
            </Col>
          </Row>
        </div>
      </div>
      <br />
      <div className="IntroduceTeamFooter">
        <h2>'공모자들'과 함께 만들어가요!</h2>
        <p>
          '공모자들' 동아리에 참가해서 다양한 사람들과 회의를하고, 수상도
          해보고!
          <br />
          우리와 함께 추억을 만들어가요!
        </p>
        <hr />
        <Row>
          <Col lg="4">
            <h4>팀 구성</h4>
            <p>
              공모자들은 3-4명의 소수의 인원으로
              <br />
              팀이 구성되어 진행돼요.
            </p>
          </Col>
          <Col lg="4">
            <h4>피드백</h4>
            <p>
              공모전 진행이 어려우신가요?
              <br />
              그럼 우리의 피드백을 받아보세요!
            </p>
          </Col>
          <Col lg="4">
            <h4>스펙</h4>
            <p>
              졸업..취업..걱정 많으시죠..
              <br />
              그럴 땐 우리 공모자들과 함께 스펙을 쌓아봐요!
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const PaperStyle = {
  padding: "10%",
  margin: "0 10%",
  height: "100%",
};

export default IntroduceTeam;
