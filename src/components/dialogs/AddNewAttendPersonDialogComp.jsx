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
} from "@material-ui/core";
import { SaveAttends } from "actions/dbActions";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewAttendPersonDialogComp = ({ open, handleClose, currentAttend }) => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const schedule = useSelector((state) => state.schedule);

  // * Transfer list - 출석 인원
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const handleCreate = () => {
    dispatch(SaveAttends(currentAttend, right));
    handleClose();
  };

  useEffect(() => {
    let savedAttends = [];
    console.info(currentAttend);
    if (currentAttend !== null) {
      Object.values(schedule.schedules).filter((schedule) => {
        if (schedule.scheduleTime === currentAttend.scheduleTime) {
          if (schedule.scheduleAttends !== undefined) {
            savedAttends = schedule.scheduleAttends;
          }
        }
      });
      setRight(savedAttends);
    }
    setLeft(activity.memberList);
  }, [open, schedule]);

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
    const [checked, setChecked] = React.useState([]);

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
        <Button onClick={handleCreate} color="primary" variant="contained">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewAttendPersonDialogComp;
