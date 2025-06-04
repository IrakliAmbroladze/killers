import { Dispatch, SetStateAction } from "react";
import { CommentType } from "../types/comment";
import { mapComments } from "./map-comments";
import { fetchComments } from "../lib/fetch-comments";

export const refreshComments = async (
  id: string,
  set: Dispatch<SetStateAction<CommentType[] | null>>
) => {
  try {
    const result = await fetchComments(id);
    set(mapComments(result));
  } catch (error) {
    console.error("Failed to fetch and map comments:", error);
  }
};
