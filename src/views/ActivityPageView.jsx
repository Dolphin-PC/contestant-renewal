import { Paper, Tab, Tabs } from "@material-ui/core";
import { a11yProps, TabPanel } from "functions/functions";
import React, { useState } from "react";
import Attention from "./Activity/Attention";
import Log from "./Activity/Log";
import TeamBuilding from "./Activity/TeamBuilding";

const ActivityPageView = () => {
   const [page, setPage] = useState(0);
   const handleChangePage = (e, value) => {
      setPage(value);
   };
   return (
      <div>
         <div>
            <Paper
               elevation={3}
               style={{ width: "95%", marginTop: "10%", marginLeft: "auto" }}
            >
               <Tabs value={page} onChange={handleChangePage}>
                  <Tab label="회의록" {...a11yProps(0)} />
                  <Tab label="출석부" {...a11yProps(1)} />
                  <Tab label="팀 빌딩(투표)" {...a11yProps(2)} />
               </Tabs>

               <TabPanel value={page} index={0} className="TabPanel">
                  <Log />
               </TabPanel>
               <TabPanel value={page} index={1} className="TabPanel">
                  <Attention />
               </TabPanel>
               <TabPanel value={page} index={2} className="TabPanel">
                  <TeamBuilding />
               </TabPanel>
            </Paper>
         </div>
      </div>
   );
};

export default ActivityPageView;
