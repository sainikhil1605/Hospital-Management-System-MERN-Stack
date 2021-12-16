const initialState = {
  isLogedIn: false,
  name: localStorage.getItem('name') || '',
  role: localStorage.getItem('role') || '',
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOG_IN':
      localStorage.setItem('token', payload.token);
      localStorage.setItem('name', payload.name);
      localStorage.setItem('role', payload.role);
      return {
        ...state,
        isLogedIn: true,
        name: payload.name,
        role: payload.role,
      };
    case 'LOG_OUT':
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      return {};
    default:
      return state;
  }
};
export default loginReducer;
