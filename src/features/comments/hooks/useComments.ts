"use client";
import React, { useEffect, useState } from "react";
import { CommentType } from "../types/comment";
import { createComment } from "../lib/create-comment";
import { refreshComments } from "../utils/refresh";
import { deleteComment } from "../lib/deleteComment";
import { updateComment } from "../lib/updateComment";
import { useCommentsQuantities } from "@/hooks/useCommentsQuantities";

const useComments = (id: string) => {
  const initialFormData: CommentType = {
    text: "",
    task_id: id,
  };
  const blankContent = {
    id: null,
    text: "",
  };
  const [formData, setFormData] = useState<CommentType>(initialFormData);
  const [commentList, setCommentList] = useState<CommentType[] | null>([]);
  const [editing, setEditing] = useState<{ id: string | null; text: string }>(
    blankContent
  );

  const { increaseQuantity, decreaseQuantity } = useCommentsQuantities();

  useEffect(() => {
    (async () => {
      try {
        await refreshComments(id, setCommentList);
      } catch (error) {
        console.error("Failed to refresh comments:", error);
      }
    })();
  }, [id, setCommentList]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      increaseQuantity(id);
      await createComment(formData);
      await refreshComments(id, setCommentList);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error: " + error.message);
      } else {
        console.log("An unknown error occurred.");
      }
    }
    setFormData(initialFormData);
  };

  const handleEdit = (commentId: string, currentText: string) => {
    setEditing({ id: commentId, text: currentText });
  };

  const handleCancel = () => {
    setEditing(blankContent);
  };

  const handleSave = async (commentId: string) => {
    try {
      await updateComment(commentId, editing.text);
      await refreshComments(id, setCommentList);
      setEditing(blankContent);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      decreaseQuantity(id);
      await deleteComment(commentId);
      await refreshComments(id, setCommentList);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  return {
    formData,
    commentList,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
    editing,
    setEditing,
  };
};

export default useComments;
