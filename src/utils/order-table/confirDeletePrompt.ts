export const confirDeletePrompt = (id: string, name: string) => {
  const confirmDelete = window.confirm(
    `წაიშალოს შემდეგი მონაცემები? \n 
      Identity: ${id} \n 
      Customer: ${name} \n 
      `
  );
  return confirmDelete;
};
