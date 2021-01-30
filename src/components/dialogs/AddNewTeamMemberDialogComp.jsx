import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { AddNewMember } from "actions/dbActions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewTeamMemberDialogComp = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);
  const [member, setMember] = useState(null);

  const handleAddNewMember = async () => {
    if (member === null) {
      return;
    }

    let teamName = activity.currentTeam.teamName;
    let currentSeason = activity.currentSeason;
    if (
      window.confirm(
        `${teamName}(${currentSeason}) 팀에 ${member.name}님을 추가하시겠습니까?`
      )
    ) {
      await dispatch(AddNewMember(currentSeason, teamName, member));
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>새 팀원 추가</DialogTitle>
      <DialogContent>
        <Select
          value={member}
          onChange={(e) => setMember(e.target.value)}
          autoFocus
          margin="dense"
          id="teamMember"
          label="팀원 선택"
          type="text"
          fullWidth
        >
          {activity.memberList.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item.isSupporter ? <Star style={{ color: "#0221aa" }} /> : ""}{" "}
              {item.name}({item.property})
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button
          onClick={handleAddNewMember}
          color="primary"
          variant="contained"
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewTeamMemberDialogComp;
