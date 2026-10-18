"use server";

import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["application/pdf", "text/plain", "text/markdown"];

export async function uploadDocument(formData: FormData) {
  const file = formData.get("file") as File | null;

  if (!file) {
    return { error: "No file provided." };
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Only PDF and text files are supported." };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { error: "File size must be under 10MB." };
  }

  // Placeholder: In a real implementation, this would:
  // - Parse the document content
  // - Store it server-side
  // - Return a document ID
  // - Trigger chunking/embedding

  console.log(`Document upload placeholder: ${file.name} (${file.size} bytes, ${file.type})`);

  // Revalidate the home page to reflect the uploaded document
  revalidatePath("/");

  return {
    success: true,
    message: "Document upload is not fully implemented yet. This is a placeholder.",
    fileName: file.name,
    fileSize: file.size,
  };
}
