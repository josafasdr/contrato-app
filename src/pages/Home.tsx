import { AppBar, makeStyles, Paper, Tab, Tabs } from '@material-ui/core'
import { useState } from 'react';

import { RelatorioPagamento } from '../components/relatorios'
import { RelatorioAditivos } from '../components/relatorios/RelatorioAditivos';
import { RelatorioContratos } from '../components/relatorios/RelatorioContratos';
import { TabPanel } from '../components/TabPanel';

const useStyles = makeStyles({
  root: {
  }
})

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0);
  
  const tabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <AppBar position="static">
          <Tabs value={value} onChange={tabChange} aria-label="simple tabs example">
            <Tab label="Contratos" {...a11yProps(0)} />
            <Tab label="Aditivos" {...a11yProps(1)} />
            <Tab label="Pagamentos" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <RelatorioPagamento />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RelatorioAditivos />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RelatorioContratos />
        </TabPanel>
      </Paper>
    </div>
  )
}

export default Home