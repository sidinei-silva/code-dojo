const getLinter = async module => {
  const { default: linter } = await import(`./${module}/linter`);
  return linter;
};

export default getLinter;
