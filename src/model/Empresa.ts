export type Empresa = {
  id?: Number,
  cnpj: String,
  razaoSocial: String,
  nomeFantasia: String,
  email: String,
  endereco?: Endereco,
  telefones?: Telefone[],
  //contratos: Contrato[],
}

type Endereco = {
  _idEndereco: String,
  rua: String,
  numero: Number,
  bairro: String,
  cidade: String,
  uf: String
}

type Telefone = {
  _id_telefone: String,
  ddd: String,
  telefone: String
}