import { FormControl, Input, InputLabel, makeStyles, MenuItem, Paper, Select } from "@material-ui/core"
import useService from "../../hooks/useService";


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    },
  
    margin: {
      margin: theme.spacing(1),
    },
  
    grid: {
      width: '100%'
    },
  
    textField: {
      marginTop: '30px',
      [theme.breakpoints.up('sm')]: {
        marginRight: '10px'
      }
    },
  
    flexGrow1: {
      flexGrow: 1
    }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const RelatorioContratos = () => {
    const classes = useStyles()
    const { loading, data, error } = useService({
      url: `${process.env.REACT_APP_PATH_API}/empresas`,
      method: 'GET'
    })
    
    const handleChange = (event: any) => {
      const { name, value } = event.target;
    }
  
    return (
        <Paper>
            <FormControl className={classes.formControl}>
              <InputLabel id="empresa-label">Empresa</InputLabel>
              <Select 
                labelId="empresa-label"
                id="empresa"
                name="_idEmpresa"
                input={<Input />}
                MenuProps={MenuProps}
                onChange={handleChange}>
                  {data.map((empresa:any) => (
                    <MenuItem key={empresa._id} value={empresa._id}>
                      {empresa.razaoSocial}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
        </Paper>
    )
}