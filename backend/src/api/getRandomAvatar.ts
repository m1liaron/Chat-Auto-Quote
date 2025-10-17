const randomSeed = Math.random().toString(36).substring(2);
const randomUserAvatarAPI = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`;

const getRandomAvatar = () => randomUserAvatarAPI;

export { getRandomAvatar };
