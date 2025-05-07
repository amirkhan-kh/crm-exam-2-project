import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button } from "antd";
import { ProfileInfo, ProfileStatistic } from "../../components";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="w-full"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Profile: React.FC = () => {
  const [value, setValue] = React.useState(0); 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Button variant="solid" style={{ padding: "3px 6px" }}>
            <FaAngleLeft color="#90A0B7" />
          </Button>
        </div>
        <span></span>
      </div>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "210px"}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Ma'lumotlar" {...a11yProps(1)} className="w-20px"/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProfileInfo/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} >
          <ProfileStatistic/>
        </CustomTabPanel>

      </Box>
    </div>
  );
};

export default Profile;
