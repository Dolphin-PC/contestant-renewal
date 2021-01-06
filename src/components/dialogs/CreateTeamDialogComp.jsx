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

const CreateTeamDialogComp = ({ open, handleClose }) => {
   const [team, setTeam] = useState("");

   const handleCreate = () => {
      alert(`[${team}] 팀을 추가합니다.`);
      handleClose();
   };
   return (
      <Dialog open={open} onClose={handleClose} fullWidth>
         <DialogTitle>새로운 팀 추가</DialogTitle>
         <DialogContent>
            <DialogContentText>
               <p>1) 시즌을 선택해주세요.</p>

               <br />
               <p>2) 팀명을 입력하세요.</p>
            </DialogContentText>
            <TextField
               autoFocus
               margin="dense"
               id="team"
               label="팀 명"
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
