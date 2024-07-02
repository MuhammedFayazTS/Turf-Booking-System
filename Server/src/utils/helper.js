export const createAccessToken = async (user) => {
  if (!env.JWT_KEY) return;

  return jwt.sign(
    {
      data: user,
    },
    env.JWT_KEY,
    {
      expiresIn: "30m",
    }
  );
};
