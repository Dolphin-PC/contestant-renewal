import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor, Viewer } from "@toast-ui/react-editor";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Col, Row } from "reactstrap";
import {
  ArrowLeft,
  Edit,
  ExpandLess,
  ExpandMore,
  Feedback,
} from "@material-ui/icons";
import { useRef } from "react";
import { useEffect } from "react";
import { usePreventLeave } from "functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { UpdateLogContent } from "actions/dbActions";

const LogWrapper = (props) => {
  const { logName, log, feedback, feedbacks } = props;
  const [tab, setTab] = useState("log");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const handleOpenFeedback = () => {
    setFeedbackOpen(false);
  };

  return (
    <Paper elevation={3} className="padding20">
      <h2>{logName}</h2>
      <br />
      <Row>
        <>
          <Col lg="2">
            <Button
              fullWidth
              variant={tab === "log" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setTab("log")}
            >
              회의 내용
            </Button>
          </Col>
          <Col lg="2">
            <Button
              fullWidth
              variant={tab === "feedback" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setTab("feedback")}
            >
              피드백
            </Button>
          </Col>
        </>
        <div className="fixed-r30 z1200">
          <Tooltip title="피드백 보기" placement="left">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setFeedbackOpen(true)}
            >
              <Feedback />
            </Button>
          </Tooltip>
        </div>
      </Row>
      <br />

      <LogFeedbackRender tab={tab} {...props} />
      <FeedbackRightDrawer
        feedbackOpen={feedbackOpen}
        handleOpenFeedback={handleOpenFeedback}
      />
    </Paper>
  );
};
LogWrapper.defaultProps = {
  logName: "회의록 이름",
};

// * 회의내용/피드백내용
const LogFeedbackRender = ({ tab, log, feedback, logName }) => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);

  const [editMode, setEditMode] = useState(false);
  const contentRef = useRef("");
  const { onPreventLeave, offPreventLeave } = usePreventLeave();

  useEffect(() => {
    if (editMode) {
      onPreventLeave();
    } else {
      offPreventLeave();
    }
  }, [editMode]);

  const handleSwitchEditMode = async () => {
    if (editMode) {
      if (window.confirm("내용을 수정하시겠습니까?")) {
        dispatch(
          UpdateLogContent(
            activity,
            logName,
            tab,
            contentRef.current.getInstance().getHtml()
          )
        );
        //   TODO 내용 저장하기
        setEditMode(false);
      }
    } else {
      setEditMode(true);
    }
  };

  const WrapperRender = (props) => {
    const { header, subHeader, content, tab } = props;

    return (
      <div>
        <Row className="margin0" style={{ justifyContent: "space-between" }}>
          <div>
            <h5>{header}</h5>
            <small>{subHeader}</small>
          </div>
          <Button onClick={handleSwitchEditMode}>
            <Edit />
          </Button>
        </Row>
        <hr />
        <Paper elevation={2} className="padding20">
          {editMode ? (
            <Editor
              placeholder={
                tab === "log"
                  ? "이번 주 진행한 회의를 업로드해주세요."
                  : "다른 동아리원들에게 받은 피드백을 토대로 바뀐 점을 기록해보세요."
              }
              initialValue={content}
              previewStyle="vertical"
              height="500px"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              ref={contentRef}
            />
          ) : (
            <Viewer initialValue={content} />
          )}
        </Paper>
      </div>
    );
  };

  switch (tab) {
    case "log":
      return (
        <WrapperRender
          tab="log"
          header="회의 내용(필수)"
          subHeader="팀 회의 내용을 적어주세요."
          content={log}
        />
      );
    case "feedback":
      return (
        <WrapperRender
          tab="feedback"
          header="피드백(선택)"
          subHeader="받은 피드백에 대한 내용을 적어주세요."
          content={feedback}
        />
      );

    default:
      return <></>;
  }
};
LogFeedbackRender.defaultProps = {
  tab: "log",
  log: "회의 내용 오류",
  feedback: "피드백 내용 오류",
  logName: "회의록 제목 오류",
};

// * 피드백 오른쪽 Drawer
const FeedbackRightDrawer = (props) => {
  const [allExpand, setAllExpand] = useState(false);
  const { feedbackOpen, handleOpenFeedback } = props;

  return (
    <Drawer
      className="FeedBackDrawer"
      style={{ width: "100%" }}
      variant="persistent"
      anchor="right"
      open={feedbackOpen}
      onClose={handleOpenFeedback}
    >
      <div className="RightMenu">
        <div>
          <ListItem style={{ justifyContent: "space-between" }}>
            <h4>피드백</h4>
            <div>
              <IconButton onClick={() => setAllExpand(false)}>
                <ExpandLess />
              </IconButton>
              <IconButton onClick={() => setAllExpand(true)}>
                <ExpandMore />
              </IconButton>
            </div>
          </ListItem>
          <Divider />
        </div>

        <div style={{ height: "100%" }}>
          <ListItem>
            {/* TODO 여기 안됨 ㅠㅠ... 모두 확장/축소가 안딤;; */}
            <Accordion defaultExpanded={allExpand}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Chip label="박찬영" />
                <p style={{ margin: "auto 0px auto 10px" }}>2021-01-01</p>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </div>
                  <div>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Chip label="박찬영" />
                        <p style={{ margin: "auto 0px auto 10px" }}>
                          2021-01-01
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        </div>

        <div className="Bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenFeedback}
          >
            <ArrowLeft /> 돌아가기
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default LogWrapper;
