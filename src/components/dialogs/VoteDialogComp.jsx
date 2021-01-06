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

const VoteDialogComp = ({ open, handleClose }) => {
   const [vote, setVote] = useState("");

   const handleCreate = () => {
      alert(`[${vote}] 팀을 추가합니다.`);
      handleClose();
   };
   return (
      <Dialog open={open} onClose={handleClose} fullWidth>
         <DialogTitle>새 투표 생성</DialogTitle>
         <DialogContent>
            <TextField
               autoFocus
               margin="dense"
               id="vote"
               label="1) 투표 이름을 입력하세요."
               type="text"
               fullWidth
               onChange={(e) => setVote(e.target.value)}
            />
            &emsp;
            <DialogContentText>
               <p>2) 투표할 선택지를 추가해주세요.</p>
            </DialogContentText>
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

export default VoteDialogComp;
