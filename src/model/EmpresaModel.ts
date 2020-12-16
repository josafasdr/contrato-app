import Endereco from './Endereco'
import Telefone from './Telefone'

export default interface EmpresaModel {
  id?: Number,
  cnpj: String,
  razaoSocial: String,
  nomeFantasia: String,
  email: String,
  endereco?: Endereco,
  telefones?: Telefone[],
  //contratos: Contrato[],
}