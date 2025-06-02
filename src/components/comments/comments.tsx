"use client";
import { Comment } from "./types/comment";
import { createComment } from "./lib/create-comment";
import { fetchComments } from "./lib/fetch-comments";
import React, { JSX, useEffect, useState } from "react";
import { deleteComment } from "./lib/deleteComment";
import { updateComment } from "./lib/updateComment";

const Comments = ({ id }: { id: string }): JSX.Element => {
  const initialFormData: Comment = {
    text: "",
    task_id: id,
  };
  const [formData, setFormData] = useState<Comment>(initialFormData);
  const [commentList, setCommentList] = useState<Comment[] | null>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    const loadComments = async (id: string) => {
      try {
        const result = await fetchComments(id);
        // Map employees array to single object if needed
        const mappedResult = result.map((comment: unknown) => {
          if (typeof comment === "object" && comment !== null) {
            const c = comment as Comment;
            return {
              ...c,
              employees: Array.isArray(c.employees)
                ? c.employees[0]
                : c.employees,
            };
          }
          return comment;
        });
        setCommentList(mappedResult as Comment[]);
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
      // Map employees array to single object if needed
      const mappedResult = result.map((comment: unknown) => {
        if (typeof comment === "object" && comment !== null) {
          const c = comment as Comment;
          return {
            ...c,
            employees: Array.isArray(c.employees)
              ? c.employees[0]
              : c.employees,
          };
        }
        return comment;
      });
      setCommentList(mappedResult as Comment[]);
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
      setCommentList(mappedResult as Comment[]);
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
      setCommentList(mappedResult as Comment[]);
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

                {editingCommentId === String(comment.id) ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full border rounded p-1"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleSave(String(comment.id!))}
                        className="text-white bg-[#00c951] px-2 py-1 rounded hover:bg-[#43A047]"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-white bg-[#6a7282] px-2 py-1 rounded hover:bg-[#718096]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mt-1">{comment.text}</p>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() =>
                          handleEdit(String(comment.id!), comment.text)
                        }
                        className="text-sm text-[#155dfc] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(String(comment.id!))}
                        className="text-[#e7000b] text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
