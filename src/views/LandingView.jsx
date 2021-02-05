import React from "react";
import { useState } from "react";
import {
  Col,
  Row,
  Container,
  CarouselItem,
  CarouselCaption,
  Carousel,
  CarouselIndicators,
  CarouselControl,
  Form,
  Input,
} from "reactstrap";

import carousel1 from "assets/images/carousel1.jpg";
import carousel2 from "assets/images/carousel2.jpg";
import carousel3 from "assets/images/carousel3.jpg";

import { InputLabel, TextField, Button } from "@material-ui/core";
import { LandingPageTeamAnimation } from "assets/animation/Animations";
import { ArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";

const items = [
  {
    src: carousel1,
    altText: "",
    caption: "",
  },
  {
    src: carousel2,
    altText: "",
    caption: "",
  },
  {
    src: carousel3,
    altText: "",
    caption: "",
  },
];

const LandingView = () => {
  const history = useHistory();
  return (
    <>
      {/* Visual Section */}
      <div className="Landing-Visual-Section Center">
        <div className="textBox">
          <h1>공모자들</h1>
          <hr />
          <h4>춘천연합공모전동아리</h4>
        </div>
        <MainCarousel />
      </div>

      {/* 설명 Section */}
      <Container className="Landing-Explain-Section">
        <Row>
          <Col lg="6" style={{ margin: "auto" }}>
            <h1>공모자들</h1>
            <h2>무슨 동아리인가요?</h2>
            <hr />
            <p>
              춘천 유일의 공모전 연합동아리 입니다.
              <br />
              '공모자들'에서는 경험이 없어도, 잘 하지 못해도 누구든 다양한
              사람들과 함께 공모전에 도전할 수 있습니다.
            </p>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push("/introduce")}
            >
              더 알아보기&ensp;
              <ArrowRight />
            </Button>
          </Col>
          <Col lg="6">
            <LandingPageTeamAnimation />
          </Col>
        </Row>
      </Container>
      <br />
      <br />

      {/* 공모자들 분야 Section */}
      <div className="Landing-Activity">
        <h1>'공모자들'은 뭘 하나요?</h1>
        <h3>다양한 공모전에 참여합니다.</h3>
        <p>
          소수로 구성된 여러 팀들은 다양한 공모전에 도전합니다.
          <br />수 많은 회의를 통해서 만들어낸 결과물을 통해서, 스펙은 덤!
          <br />
          개개인의 다양한 경험과 역량을 발전시킬 수 있습니다.
        </p>
        <Container>
          <hr />
          <Row>
            <Col lg="4">
              <CarouselRender
                items={items}
                header="공모전"
                subHeader="자유기획/팀프로젝트를 진행합니다."
              />
            </Col>
            <Col lg="4">
              <CarouselRender
                items={items}
                header="수상/경험"
                subHeader="공모자들의 도움으로 수상을 경험합니다."
              />
            </Col>
            <Col lg="4">
              <CarouselRender
                items={items}
                header="친목활동"
                subHeader="영화/야유회/체험 등 공모자들 여러분과 친목을 다집니다."
              />
            </Col>
          </Row>
        </Container>
      </div>

      <br />
      <br />
      <br />
      {/* Contact Section */}
      <ContactSection />
    </>
  );
};

const MainCarousel = () => {
  const height = window.innerHeight;

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const items = [
    {
      src: carousel1,
      altText: "",
      caption: "2018년 정기모임",
    },
    // {
    //    src: carousel2,
    //    altText: "Slide 2",
    //    caption: "Slide 2",
    // },
    // {
    //    src: carousel3,
    //    altText: "Slide 3",
    //    caption: "Slide 3",
    // },
  ];
  const slides = items.map((item) => {
    return (
      <CarouselItem
        key={item.src}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{ height: height, width: "100%", objectFit: "cover" }}
        />
        <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

const CarouselRender = ({ items, header, subHeader }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        key={item.src}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{
            margin: "auto",
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
        <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className="subCarousel"
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}

      <div className="Center CardInnerText">
        <div className="InnerText">
          <h1>{header}</h1>
          <hr />
          <p>{subHeader}</p>
        </div>
      </div>
    </Carousel>
  );
};

const ContactSection = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    school: "",
    content: "",
  });

  const handleOnChange = (e) => {
    setInfo({
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "contestants", e.target, "user_7iyTqTbLD0GITM2hqwzck")
      .then(
        (result) => {
          alert("문의메일이 정상적으로 발송되었습니다 :)");
        },
        (error) => {
          alert("메일 전송에 실패했어요 :(");
        }
      );
  };
  return (
    <Container>
      <Row>
        <Col lg="6">
          <h1>무엇이든 물어보세요.</h1>
          <small>가입문의, 동아리문의도 괜찮아요!</small>
          <hr />
          <Form onSubmit={handleOnSendEmail}>
            <Row>
              <Col lg="6">
                <InputLabel required>이름</InputLabel>
                <Input placeholder="홍길동" name="from_name" />
              </Col>
              <Col lg="6">
                <InputLabel required>이메일 주소</InputLabel>
                <Input placeholder="example@naver.com" name="from_email" />
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="6">
                <InputLabel>핸드폰 번호</InputLabel>
                <Input placeholder="010-1234-5778" name="phone_number" />
              </Col>
              <Col lg="6">
                <InputLabel>학교/학과</InputLabel>
                <Input placeholder="한림대학교/공과대학" name="etc_info" />
              </Col>
            </Row>
            <br />
            <InputLabel required>문의주실 내용</InputLabel>
            <Input
              placeholder="공모자들에게 무엇이 궁금하신가요?"
              name="contents"
            />
            <br />
            <Button type="submit" color="primary" variant="contained" fullWidth>
              문의하기
            </Button>
          </Form>
        </Col>
        <Col lg="6" style={{ margin: "auto", textAlign: "center" }}>
          <h3>공모자들 서포터즈</h3>
          <hr />
          <p>김태남</p>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingView;
