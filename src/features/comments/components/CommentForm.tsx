import React from "react";
import { CommentType } from "../types/comment";

type Props = {
  formData: CommentType;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const CommentForm = ({ formData, onChange, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col p-1">
      <textarea
        name="text"
        value={formData.text}
        onChange={onChange}
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
  );
};

export default CommentForm;
