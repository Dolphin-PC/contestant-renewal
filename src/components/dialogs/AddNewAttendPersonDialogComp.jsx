import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Grid,
  Tooltip,
  TextField,
  Input,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import {
  DeletePreset,
  GetPreset,
  SaveAttends,
  SavePreset,
} from "actions/dbActions";
import TransferList from "components/transfer/TransferList";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewAttendPersonDialogComp = ({
  open,
  handleClose,
  currentAttend,
  isPreset,
}) => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const schedule = useSelector((state) => state.schedule);
  const { schedules, presets } = schedule;

  // * Transfer list - 출석 인원
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const presetNameRef = useRef();
  const [currentPresets, setCurrentPresets] = useState(undefined);

  const handleCreateAttend = useCallback(() => {
    dispatch(SaveAttends(currentAttend, right));
    handleClose();
  });

  const handleCreatePreset = useCallback(() => {
    if (currentPresets) {
      dispatch(SavePreset(currentPresets.presetName, right));
    } else {
      var presetName = presetNameRef.current.value;
      if (presetName === "") return alert("프리셋 이름을 입력해주세요.");
      dispatch(SavePreset(presetName, right));
    }
  });

  const handleSelectPreset = useCallback((e) => {
    if (e.target.value === "") {
      setCurrentPresets(undefined);
    } else {
      setCurrentPresets(e.target.value);
      presetNameRef.current.value = "";
    }
  });

  const handleLoadPreset = useCallback((e) => {
    setCurrentPresets(e.target.value);
  });

  const handleDeletePreset = () => {
    if (
      window.prompt("프리셋을 삭제하시려면 [삭제]를 입력해주세요.") === "삭제"
    ) {
      DeletePreset(currentPresets.presetName);
    } else {
      alert("삭제 취소");
    }
  };

  const getListData = useCallback(() => {
    let savedAttends = [];
    if (currentAttend !== null) {
      Object.values(schedules).filter((schedule) => {
        if (schedule.scheduleTime === currentAttend.scheduleTime) {
          if (schedule.scheduleAttends !== undefined) {
            savedAttends = schedule.scheduleAttends;
          }
        }
      });
      setRight(Object.values(savedAttends));
    }
    setLeft(activity.memberList);
  });

  const getPresetData = useCallback(() => {
    dispatch(GetPreset());
    setRight([]);
  });

  useEffect(() => {
    if (isPreset) {
      getPresetData();
    }
    getListData();
  }, [open]);

  useEffect(() => {
    if (currentPresets !== undefined && currentPresets.preset !== undefined) {
      setRight(Object.values(currentPresets.preset));
    } else {
      setRight([]);
    }
  }, [currentPresets]);

  // * 프리셋 설정 다이얼로그
  if (isPreset) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>출석 인원 프리셋 설정</DialogTitle>
        <Divider />
        <DialogContent>
          <TransferList
            left={left}
            right={right}
            setLeft={setLeft}
            setRight={setRight}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip
            title="프리셋을 생성하시려면, [프리셋 생성]을 선택하고, 프리셋을 수정하시려면, 해당 프리셋을 선택하시면 됩니다."
            placement="left"
          >
            <Select
              value={
                currentPresets !== undefined ? currentPresets.presetName : ""
              }
              onChange={handleSelectPreset}
            >
              <MenuItem value="">프리셋 생성</MenuItem>
              {presets &&
                Object.values(presets).map((preset, index) => {
                  return (
                    <MenuItem value={preset} key={index}>
                      <ListItemText primary={preset.presetName} />
                      <HighlightOff
                        onClick={handleDeletePreset}
                        fontSize="small"
                      />
                    </MenuItem>
                  );
                })}
            </Select>
          </Tooltip>

          <Tooltip title="기존 프리셋 이름은 변경이 불가합니다.">
            <input
              disabled={currentPresets ? true : false}
              className="Preset-textField"
              ref={presetNameRef}
              placeholder={
                currentPresets
                  ? currentPresets.presetName
                  : "새 프리셋 이름을 입력해주세요."
              }
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
          <Button
            onClick={handleCreatePreset}
            color="primary"
            variant="contained"
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // * 출석인원 추가 설정 다이얼로그
  else {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          출석 인원 추가 &emsp;
          {currentAttend && (
            <small>
              {currentAttend.scheduleTime}&ensp;{currentAttend.scheduleName}
            </small>
          )}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TransferList
            left={left}
            right={right}
            setLeft={setLeft}
            setRight={setRight}
          />
        </DialogContent>
        <DialogActions>
          <Select
            className="Add-Attend-Preset-Select-Box"
            value={currentPresets}
            onChange={handleLoadPreset}
          >
            <MenuItem value="">프리셋 선택</MenuItem>

            {presets &&
              Object.values(presets).map((preset, index) => {
                return (
                  <MenuItem value={preset} key={index}>
                    <ListItemText primary={preset.presetName} />
                  </MenuItem>
                );
              })}
          </Select>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button
            onClick={handleCreateAttend}
            color="primary"
            variant="contained"
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default AddNewAttendPersonDialogComp;
