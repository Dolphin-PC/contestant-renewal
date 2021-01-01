import { Box } from "@material-ui/core";

export function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`tabpanel-${index}`}
         aria-labelledby={`tab-${index}`}
         {...other}
      >
         {value === index && <Box p={3}>{children}</Box>}
      </div>
   );
}

export function a11yProps(index) {
   return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
   };
}
