import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor, Viewer } from "@toast-ui/react-editor";
import { Button, Paper } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { Edit } from "@material-ui/icons";

const LogWrapper = (props) => {
  const { title } = props;
  const [tab, setTab] = useState("log");

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
          <Wrapper header="회의 내용" subHeader="팀 회의 내용을 적어주세요." />
        );
      case "feedback":
        return (
          <Wrapper
            header="피드백"
            subHeader="받은 피드백에 대한 내용을 적어주세요."
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <Paper elevation={3} className="padding20">
      <h2>{title}</h2>
      <br />
      <Row>
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
      </Row>
      <br />

      <LogFeedbackRender tab={tab} />
    </Paper>
  );
};

LogWrapper.defaultProps = {
  title: "회의록 이름",
};

export default LogWrapper;
