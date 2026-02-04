"use client";
import React, { JSX } from "react";
import Comment from "./comment";
import CommentForm from "./CommentForm";
import CommentsHeader from "./CommentsHeader";
import useComments from "../hooks/useComments";

const Comments = ({ id }: { id: string }): JSX.Element => {
  const {
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
  } = useComments(id);

  return (
    <div>
      <CommentForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {commentList && <CommentsHeader commentsNumber={commentList.length} />}

      <div className="pr-2">
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
                  editingCommentId={editing.id}
                  comment={comment}
                  editingText={editing.text}
                  setEditing={setEditing}
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
