import Axios from 'axios'

export const getData = async (count) => {
  try {
    const { data } = await Axios.get(`https://rickandmortyapi.com/api/character/?page=${count}`)
    return data.results
  } catch (error) {
    console.log('ocurrio un error')
  }
}