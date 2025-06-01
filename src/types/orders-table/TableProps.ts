export interface TableProps {
  onSetStatus: (s: string) => void;
  onSetTitle: (t: string) => void;
  onOpenModal: (id: string | null) => void;
  modalIndex: string | null;
}
