const getLinter = async module => {
  const { default: linter } = await import(`../_modules/${module}/linter`);
  return linter;
};

export default getLinter;
