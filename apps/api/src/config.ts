export const config = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'local-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
