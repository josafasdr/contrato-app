export type Empresa = {
  _id?: Number,
  cnpj: string,
  razaoSocial: string,
  nomeFantasia: string,
  email: string,
  endereco?: Endereco,
  telefones?: Telefone[],
  //contratos: Contrato[],
}

type Endereco = {
  _idEndereco: string,
  rua: string,
  numero: Number,
  bairro: string,
  cidade: string,
  uf: string
}

type Telefone = {
  _id_telefone: string,
  ddd: string,
  telefone: string
}