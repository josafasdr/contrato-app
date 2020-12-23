import Pagamento from "./Pagamento"

type Conta = {
    copiaConta?: String,
    tipoConta?: number,
    statusConta?: number,
    dataVencimentoConta?: Date,
    dataRecebimentoSetor?:Date,
    dataEnvioDof?:Date,
    valorConta?:number,
    observacoesConta?:String,
    pagamento?:Pagamento
}

export default Conta