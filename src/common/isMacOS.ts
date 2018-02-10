const isMacOS: () => boolean = () => {
  return process.platform === "darwin";
};

export { isMacOS };
