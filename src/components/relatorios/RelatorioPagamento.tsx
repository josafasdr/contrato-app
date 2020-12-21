import { List, ListItem, ListItemText, Paper } from "@material-ui/core"

const pagamentos = [
  {
    empresa: { nomeFantasia: 'Empresa Um' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 10000,
    taxaJuros: 2
  },
  {
    empresa: { nomeFantasia: 'Empresa Dois' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 20000,
    taxaJuros: 2
  },
  {
    empresa: { nomeFantasia: 'Empresa Três' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 30000,
    taxaJuros: 2
  },
  {
    empresa: { nomeFantasia: 'Empresa Quatro' },
    dataPagamentoConta: '2020-08-12',
    valorPago: 40000,
    taxaJuros: 2
  }
]

export const RelatorioPagamento = () => {
  return (
    <Paper>
      <h3>Pagamentos</h3>
      <List>
        {pagamentos.map((item: any, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={item.empresa.nomeFantasia}
              secondary={`Valor: ${item.valorPago}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}