import { Tabs , Tab,Box, Typography} from "@mui/material";
import React from "react";
import KeepNotes from "../KeepNotes/KeepNotes";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Notes" {...a11yProps(0)} />
        <Tab label="Edit Notes"  {...a11yProps(1)}/>
        <Tab label="Reminders" {...a11yProps(2)}/>
        <Tab label="Trash" {...a11yProps(3)}/>
      </Tabs>
      <TabPanel value={value} index={0}>
      <KeepNotes />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Edit Notes
      </TabPanel>
      <TabPanel value={value} index={2}>
        Reminders
      </TabPanel>
      <TabPanel value={value} index={3}>
        Trash
      </TabPanel>
      
    </>
  );
};

export default Home;