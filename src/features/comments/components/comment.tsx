import React from "react";
import type { CommentType } from "../types/comment";
import { renderTextWithLinks } from "../utils/renderTextWithLinks";

interface CommentProps {
  editingCommentId: string | null;
  comment: CommentType;
  editingText: string;
  setEditing: (payload: { id: string | null; text: string }) => void;
  onEdit: (commentId: string, currentText: string) => void;
  onDelete: (commentId: string) => void;
  onSave: (commentId: string) => void;
  onCancel: () => void;
}

const Comment = ({
  editingCommentId,
  comment,
  editingText,
  setEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: CommentProps) => {
  return (
    <>
      {editingCommentId === String(comment.id) ? (
        <div className="mt-2">
          <textarea
            className="w-full border rounded p-1"
            value={editingText}
            onChange={(e) =>
              setEditing({ id: String(comment.id), text: e.target.value })
            }
          />
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => onSave(String(comment.id!))}
              className="text-white bg-[#00c951] px-2 py-1 rounded hover:bg-[#43A047]"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-white bg-[#6a7282] px-2 py-1 rounded hover:bg-[#718096]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-1">{renderTextWithLinks(comment.text)}</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => onEdit(String(comment.id!), comment.text)}
              className="text-sm text-[#155dfc] hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(String(comment.id!))}
              className="text-[#e7000b] text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
