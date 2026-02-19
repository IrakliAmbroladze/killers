import { ReactNode, Fragment } from "react";

export type Cell = ReactNode;

type TableProps = {
  id: string;
  title?: { title: string; position?: "left" | "center" | "right" };
  headers: Cell[];
  rows: Cell[][];
};

export const Table = ({ title, headers, rows }: TableProps) => {
  const styleCellLeft = "border p-2.5 flex items-center h-full";
  const styleCellCenter = `${styleCellLeft} justify-center`;

  const columnsNumber = headers.length;

  return (
    <>
      {title && (
        <h2
          style={{ textAlign: title.position }}
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
          <div key={`header-${index}`} className={styleCellCenter}>
            {header}
          </div>
        ))}

        {rows.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={cellIndex === 0 ? styleCellLeft : styleCellCenter}
              >
                {cell}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};
