import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   TextField,
   Button,
} from "@material-ui/core";
import React, { useState } from "react";

const SeasonDialogComp = ({ open, handleClose }) => {
   const [season, setSeason] = useState("");

   const handleCreate = () => {
      alert(`[${season}] 시즌을 추가합니다.`);
      handleClose();
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
