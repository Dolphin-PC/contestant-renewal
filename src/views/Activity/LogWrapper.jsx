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
  Typography,
} from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { Edit, ExpandLess, ExpandMore } from "@material-ui/icons";

const LogWrapper = (props) => {
  const { title } = props;
  const [tab, setTab] = useState("log");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const LogFeedbackRender = ({ tab }) => {
    const [editMode, setEditMode] = useState(false);

    const handleSwitchEditMode = () => {
      if (editMode) {
        if (window.confirm("내용을 수정하시겠습니까?")) {
          //   TODO 내용 저장하기
          setEditMode(false);
        }
      } else {
        setEditMode(true);
      }
    };

    const Wrapper = (props) => {
      const { header, subHeader } = props;
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
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
              />
            ) : (
              <Viewer initialValue="test" />
            )}
          </Paper>
        </div>
      );
    };
    switch (tab) {
      case "log":
        return (
          <Wrapper
            header="회의 내용(필수)"
            subHeader="팀 회의 내용을 적어주세요."
          />
        );
      case "feedback":
        return (
          <Wrapper
            header="피드백(선택)"
            subHeader="받은 피드백에 대한 내용을 적어주세요."
          />
        );

      default:
        return <></>;
    }
  };

  const FeedbackRightDrawer = (props) => {
    const [allExpand, setAllExpand] = useState(false);

    return (
      <Drawer
        className="FeedBackDrawer"
        style={{ width: "100%" }}
        variant="persistent"
        anchor="right"
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
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
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
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
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => setFeedbackOpen(false)}
            >
              돌아가기
            </Button>
          </div>
        </div>
      </Drawer>
    );
  };

  return (
    <Paper elevation={3} className="padding20">
      <h2>{title}</h2>
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
        <Col lg="8" style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={() => setFeedbackOpen(!feedbackOpen)}
          >
            피드백 내용 보기
          </Button>
        </Col>
      </Row>
      <br />

      <LogFeedbackRender tab={tab} />
      <FeedbackRightDrawer />
    </Paper>
  );
};

LogWrapper.defaultProps = {
  title: "회의록 이름",
};

export default LogWrapper;
