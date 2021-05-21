// export function BukuAction(inputType,inputValue){
//     return {type:"SET_BUKU",inputType:inputType,inputValue:inputValue}
// }

export function UserAction(inputType,inputValue){
    return {type:"SET_USER",inputType:inputType,inputValue:inputValue}
}

export const GET_DATA = 'GET_DATA';

export const getDataUser = () => {
    try {
      return async dispatch => {
        const res = await axios.get(`http://7770cc0911b9.ngrok.io/user`);
        if (res.data) {
          dispatch({
            type: GET_DATA,
            payload: res.data,
          });
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      // Add custom logic to handle errors
    }
  };