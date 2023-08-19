/**
 * owner,
 * developer,
 * superadmin,
 * admin,
 * user.
 */

export const isOwner = (role) =>
    (role === 'owner');
export const isDev = (role) =>
    (role === 'developer' || isOwner(role));
export const isSuperAdmin = (role) =>
    (role === 'superadmin' || isDev(role) || isOwner(role));
export const isAdmin = (role) =>
    (role === 'admin' || isDev(role) || isOwner(role));
export const isUser = (role) =>
    (role === 'user' || isDev(role) || isOwner(role));