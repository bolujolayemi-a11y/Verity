import type { UIMessage } from "ai";

export interface Source {
  id: string;
  documentId: string;
  pageNumber: number;
  quote: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
}

export type Message = UIMessage<{
  sources?: Source[];
}>;
