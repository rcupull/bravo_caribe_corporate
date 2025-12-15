export const getContactRoute = () => {
  return "/contacto";
};

export const getPayRoute = () => {
  return "/pagar";
};

export const getSignInRoute = () => {
  return "/iniciar-sesion";
};

export const getSignUpRoute = () => {
  return "/registrarse";
};

export const getRecoveryPasswordRoute = () => {
  return "/recuperar-cuenta";
};

export const getHomeRoute = () => {
  return "/";
};

export const getProductRoute = () => {
  return "/productos";
};

export const getAdminRoute = () => {
  return "/admin";
};

export const getBlogRoute = (args?: { blogSlug?: string }) => {
  const { blogSlug } = args || {};

  if (blogSlug) {
    return `/blog/${blogSlug}`;
  }
  return "/blog";
};
