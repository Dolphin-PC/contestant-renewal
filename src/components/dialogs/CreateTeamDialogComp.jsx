import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { AddTeam, GetSeasons } from "actions/dbActions";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateTeamDialogComp = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [season, setSeason] = useState("");
  const [team, setTeam] = useState("");
  const activity = useSelector((state) => state.activity);

  const handleCreate = () => {
    if (season === "") return alert("시즌을 선택해주세요.");
    if (team === "") return alert("팀명을 입력해주세요.");
    if (window.confirm(`[${team}] 팀을 추가합니다.`)) {
      dispatch(AddTeam(season, team));
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>새로운 팀 추가</DialogTitle>
      <DialogContent>
        <InputLabel>1) 시즌을 선택해주세요.</InputLabel>
        <Select
          autoWidth
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {activity.seasons.map((item, index) => (
            <MenuItem key={index} value={item.seasonName}>
              {item.seasonName}
            </MenuItem>
          ))}
        </Select>
        <br />
        <br />
        <InputLabel>2) 팀명을 입력하세요.</InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="team"
          type="text"
          fullWidth
          onChange={(e) => setTeam(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleCreate} color="primary" variant="contained">
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeamDialogComp;
