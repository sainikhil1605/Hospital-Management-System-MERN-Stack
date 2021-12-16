const initialState = {
  isLogedIn: false,
  name: '',
  role: '',
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOG_IN':
      localStorage.setItem('token', payload.token);
      localStorage.setItem('name', payload.name);
      return {
        ...state,
        isLogedIn: true,
        name: payload.name,
        role: payload.role,
      };
    default:
      return state;
  }
};
export default loginReducer;
