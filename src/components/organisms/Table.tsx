import { Cell, JustifyContent } from "@/types";
import { Fragment } from "react";

type TableProps = {
  id: string;
  title?: { title: string; justify_content?: JustifyContent };
  headers: Cell[];
  rows: Cell[][];
};

export const Table = ({ title, headers, rows }: TableProps) => {
  const styleCell = "border p-2.5 flex items-center h-full";

  const columnsNumber = headers.length;

  return (
    <>
      {title && (
        <h2
          style={{ textAlign: title.justify_content }}
          className="mt-5 mb-2.5 tracking-widest font-bold"
        >
          {title.title}
        </h2>
      )}
      <div
        className="border grid"
        style={{ gridTemplateColumns: `repeat(${columnsNumber}, 1fr)` }}
      >
        {headers.map((header, index) => (
          <div
            key={`header-${index}`}
            className={`${styleCell} justify-${header.justify_content}`}
          >
            {header.node}
          </div>
        ))}

        {rows.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`${styleCell} justify-${cell.justify_content}`}
              >
                {cell.node}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};
