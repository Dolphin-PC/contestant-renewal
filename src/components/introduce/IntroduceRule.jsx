import { Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import RuleTextFormatComp from "components/RuleTextFormatComp";
import React, { useState } from "react";
import * as Rules from "data/rules";

import { TabPanel, a11yProps } from "functions/functions";

const IntroduceRule = () => {
   const TabRender = () => {
      const useStyles = makeStyles((theme) => ({
         root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            height: "100%",
         },
         tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
         },
      }));
      const classes = useStyles();

      const [value, setValue] = useState(0);

      const handleChange = (event, newValue) => {
         setValue(newValue);
      };

      return (
         <div className={classes.root}>
            <Tabs
               orientation="vertical"
               variant="scrollable"
               value={value}
               onChange={handleChange}
               aria-label="Vertical tabs example"
               className={classes.tabs}
            >
               <Tab label="회의방침" {...a11yProps(0)} />
               <Tab label="예산운영" {...a11yProps(1)} />
               <Tab label="운영방침" {...a11yProps(2)} />
               <Tab label="채팅방방침" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
               <RuleTextFormatComp {...Rules.OpinionRule} />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <RuleTextFormatComp {...Rules.CostRule} />
            </TabPanel>
            <TabPanel value={value} index={2}>
               <RuleTextFormatComp {...Rules.OperatingRule} />
            </TabPanel>
            <TabPanel value={value} index={3}>
               <RuleTextFormatComp {...Rules.ChattingRule} />
            </TabPanel>
         </div>
      );
   };

   return (
      <div className="inner10">
         <div style={{ marginTop: 50, textAlign: "center" }}>
            <h2>운영방안과 규칙</h2>
            <h4>공모자들, 이것만은 꼭! 지켜주세요.</h4>
         </div>

         <TabRender />
      </div>
   );
};

export default IntroduceRule;
