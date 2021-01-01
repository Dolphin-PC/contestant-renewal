const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
   },
}));

export default useStyles;
