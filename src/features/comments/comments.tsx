"use client";
import type { CommentType } from "./types/comment";
import { createComment } from "./lib/create-comment";
import { fetchComments } from "./lib/fetch-comments";
import React, { JSX, useEffect, useState } from "react";
import { deleteComment } from "./lib/deleteComment";
import { updateComment } from "./lib/updateComment";
import Comment from "./comment";
import { mapComments } from "./utils/map-comments";

const Comments = ({ id }: { id: string }): JSX.Element => {
  const initialFormData: CommentType = {
    text: "",
    task_id: id,
  };
  const [formData, setFormData] = useState<CommentType>(initialFormData);
  const [commentList, setCommentList] = useState<CommentType[] | null>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    const loadComments = async (id: string) => {
      try {
        const result = await fetchComments(id);
        setCommentList(mapComments(result));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error: " + error.message);
        } else {
          console.log("An unknown error occurred.");
        }
      }
    };
    loadComments(id);
  }, [id]);

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
      await createComment(formData);
      const result = await fetchComments(id);
      setCommentList(mapComments(result));
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
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const handleCancel = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleSave = async (commentId: string) => {
    // You'll need to write updateComment(commentId, editingText) in ./lib/update-comment.ts
    try {
      await updateComment(commentId, editingText);
      const updatedComments = await fetchComments(id);
      const mappedResult = updatedComments.map((c) => ({
        ...c,
        employees: Array.isArray(c.employees) ? c.employees[0] : c.employees,
      }));
      setCommentList(mappedResult as CommentType[]);
      setEditingCommentId(null);
      setEditingText("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    // You'll need to write deleteComment(commentId) in ./lib/delete-comment.ts
    try {
      await deleteComment(commentId);
      const updatedComments = await fetchComments(id);
      const mappedResult = updatedComments.map((c) => ({
        ...c,
        employees: Array.isArray(c.employees) ? c.employees[0] : c.employees,
      }));
      setCommentList(mappedResult as CommentType[]);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-1">
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md"
          placeholder="დაწერე კომენტარი"
        />
        <br />

        <button
          type="submit"
          className="bg-[#DDD2FF] p-2 rounded cursor-pointer hover:bg-[#d1c7f1] active:scale-95 transition-transform ease-in-out duration-150 text-black"
        >
          დააკომენტარე
        </button>
      </form>
      <div className="flex my-5 gap-1.5">
        <div className="font-bold ">კომენტარები</div>
        <div className="rounded-2xl bg-[#8338EC] text-white px-2.5">
          {commentList?.length}
        </div>
      </div>
      <div className="overflow-y-auto max-h-64 pr-2">
        {commentList &&
          commentList.map((comment) => {
            return (
              <div key={comment.id} className="my-5 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-bold text-sm">
                    {comment.employees?.display_name ?? "Unknown Author"}
                  </span>
                  <span className="text-sm">
                    {comment.created_at &&
                      new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
                <Comment
                  editingCommentId={editingCommentId}
                  comment={comment}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
