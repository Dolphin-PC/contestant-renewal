import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   TextField,
   Button,
} from "@material-ui/core";
import { AddNewSeason } from "actions/dbActions";
import { LOADING } from "actions/types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SeasonDialogComp = ({ open, handleClose }) => {
   const [season, setSeason] = useState("");
   const dispatch = useDispatch();

   const handleCreate = async () => {
      if (window.confirm(`[${season}] 시즌을 추가합니다.`)) {
         dispatch({
            type: LOADING,
            payload: "새로운 시즌을 추가하고 있습니다...",
         });
         await dispatch(AddNewSeason(season));
         handleClose();
      }
   };
   return (
      <Dialog open={open} onClose={handleClose} fullWidth>
         <DialogTitle>새 시즌 추가</DialogTitle>
         <DialogContent>
            <DialogContentText>
               공모자들의 새로운 시즌을 추가해주세요.
            </DialogContentText>
            <TextField
               autoFocus
               margin="dense"
               id="season"
               label="시즌 명"
               type="text"
               fullWidth
               helperText="예) 2021년 1학기"
               onChange={(e) => setSeason(e.target.value)}
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

export default SeasonDialogComp;
