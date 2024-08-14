const setSession = (user: any): void => {
  if (user) {
    localStorage.setItem('@user', JSON.stringify(user));
  } else {
    localStorage.removeItem('@user');
  }
};

export { setSession };
