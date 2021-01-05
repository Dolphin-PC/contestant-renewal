import { Card, Divider, Button } from "@material-ui/core";
import React from "react";

const TeamCardComp = () => {
   return (
      <Card
         style={{
            maxWidth: "100%",
            height: 300,
            paddingLeft: "10%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
         }}
      >
         <div>
            <Divider style={{ width: 50, height: 10 }} />
            <br />
            <h4>관광활성화 공모전 팀</h4>
            <small>~ 2021/1/21</small>
         </div>

         <div>
            <Button color="primary" variant="contained">
               입장하기
            </Button>
         </div>
      </Card>
   );
};

export default TeamCardComp;
