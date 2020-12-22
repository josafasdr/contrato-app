import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { Empresa } from '../model/Empresa'

const useService = (config: AxiosRequestConfig) => {
  const [response, setResponse] = useState<{
    loading: boolean,
    data: Empresa[],
    error: any
  }>({
    loading: true,
    data: [],
    error: null
  })

  useEffect(() => {
    axios(config)
      .then((result) => {
        setResponse({
          loading: false,
          data: result.data,
          error: null
        })
      })
      .catch((err) => {
        setResponse({
          loading: false,
          data: [],
          error: err
        })
        console.log(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return response
}

export default useService