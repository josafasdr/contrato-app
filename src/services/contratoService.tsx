import axios from 'axios'

export function insert(contrato:any) {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_PATH_API}/contratos`,
      headers: { 'Content-Type': 'application/json' },
      data: contrato
    });
}

export function update(contrato:any, id:any) {
    return axios({
        method: 'put',
        url: `${process.env.REACT_APP_PATH_API}/contratos/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data: contrato
    })
}

export function get(id:any) {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_PATH_API}/contratos/${id}`
    });
}

export function getByEmpresa(idEmpresa:any) {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_PATH_API}/contratos?idEmpresa=${idEmpresa}`
    });
}

export function getAditivosByEmpresa(idEmpresa:any) {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_PATH_API}/contratos/aditivos?idEmpresa=${idEmpresa}`
    });
}

export function remove(id:any){
    axios({
        method: 'delete',
        url: `${process.env.REACT_APP_PATH_API}/contratos/${id}`,
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        window.location.reload();
    }).catch((err) => {
        console.log(err)
    });
}