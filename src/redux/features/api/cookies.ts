import Cookies from "js-cookie";

export const setSession = (value: string, name?: string) => {
  const keyName = name || "__session";
  const expirationDate = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

  Cookies.set(keyName, value, { expires: expirationDate });
};

export const setSessionWithValue = (value: string, key: string) => {
  Cookies.set(key, value, {
    expires: new Date().getTime() + 24 * 60 * 60 * 1000,
  });
};

export const getSessionWithKey = (key: string) => {
  return Cookies.get(key);
};

export const getSession = (name?: string) => {
  const jwt = Cookies.get(name || "__session");
  if (jwt) {
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1])); // Decode JWT payload
      return {
        token: jwt,
        expiresIn: payload.exp * 1000, // Convert to milliseconds
      };
    } catch (error) {
      console.error("Invalid JWT", error);
      return null;
    }
  }
  return null;
};

export const clearSession = () => {
  Cookies.remove("__session");
};
