export const isOwner = (role) =>
    (role === 'owner');
export const isDev = (role) =>
    (role === 'developer' && process.env.NODE_ENV === 'development');
export const isSuperAdmin = (role) =>
    (role === 'superadmin' || isDev(role));
export const isAdmin = (role) =>
    (role === 'admin' || isDev(role));
export const isUser = (role) =>
    (role === 'user' || isDev(role));