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
} from "@material-ui/core";
import { GetPreset, SaveAttends, SavePreset } from "actions/dbActions";

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
  const [currentPresets, setCurrentPresets] = useState("");

  const handleCreateAttend = useCallback(() => {
    dispatch(SaveAttends(currentAttend, right));
    handleClose();
  });

  const handleCreatePreset = useCallback(() => {
    var presetName = presetNameRef.current.value;
    if (presetName === "") return alert("프리셋 이름을 입력해주세요.");
    dispatch(SavePreset(presetName, right));

    handleClose();
  });

  const handleSelectPreset = useCallback((e) => {
    if (e.target.value === "") {
      setCurrentPresets("");
    } else {
      setCurrentPresets(e.target.value.presetName);
    }
  });

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

  const TransferList = () => {
    const useStyles = makeStyles((theme) => ({
      root: {
        margin: "auto",
      },
      paper: {
        width: 200,
        height: 230,
        overflow: "auto",
      },
      button: {
        margin: theme.spacing(0.5, 0),
      },
    }));

    function not(a, b) {
      return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
      return a.filter((value) => b.indexOf(value) !== -1);
    }
    const classes = useStyles();
    const [checked, setChecked] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const handleAllRight = () => {
      setRight(right.concat(left));
      // setLeft([]);
    };

    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      // setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
      setLeft(left.concat(right));
      setRight([]);
    };

    const customList = (items) => (
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map((item, index) => {
            return (
              <ListItem
                key={index}
                role="listitem"
                button
                onClick={handleToggle(item)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(item) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <Tooltip title={item.property}>
                  <ListItemText id={index} primary={`${item.name}`} />
                </Tooltip>
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );

    return (
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item className="Left-Attend">
          <h5>동아리원 목록({left.length})</h5>
          {customList(left)}
        </Grid>
        <Grid item className="Center-Attend-Button">
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item className="Right-Attend">
          <h5>출석할 인원 목록({right.length})</h5>
          {customList(right)}
        </Grid>
      </Grid>
    );
  };

  if (isPreset) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <h5>출석 인원 프리셋 설정</h5>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TransferList />
        </DialogContent>
        <DialogActions>
          <Tooltip
            title="프리셋을 생성하시려면, [프리셋 생성]을 선택하고, 프리셋을 수정하시려면, 해당 프리셋을 선택하시면 됩니다."
            placement="left"
          >
            <Select value={currentPresets} onChange={handleSelectPreset}>
              <MenuItem value="">프리셋 생성</MenuItem>
              {presets &&
                Object.values(presets).map((preset) => {
                  return (
                    <MenuItem value={preset}>{preset.presetName}</MenuItem>
                  );
                })}
            </Select>
          </Tooltip>

          <input
            value={currentPresets}
            className="Preset-textField"
            ref={presetNameRef}
            placeholder={"새 프리셋 이름을 입력해주세요."}
          />
          <Button onClick={handleClose} color="primary">
            취소
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
  } else {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <h5>
            출석 인원 추가 &emsp;
            {currentAttend && (
              <small>
                {currentAttend.scheduleTime}&ensp;{currentAttend.scheduleName}
              </small>
            )}
          </h5>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TransferList />
        </DialogContent>
        <DialogActions>
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
