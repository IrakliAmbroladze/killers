import type { CommentType } from "../types/comment";

export const mapComments = (comments: unknown[]): CommentType[] => {
  return comments.map((comment) => {
    if (typeof comment === "object" && comment !== null) {
      const c = comment as CommentType;
      return {
        ...c,
        employees: Array.isArray(c.employees) ? c.employees[0] : c.employees,
      };
    }
    return comment as CommentType;
  });
};
