import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SavedDocument {
  id: string;
  filename: string;
  hash: string;
  walletAddress: string;
  timestamp: number;
  size: number;
  type: string;
}

const STORAGE_KEY = "saved_documents";

export const useDocumentStorage = () => {
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Load documents from AsyncStorage on mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedDocuments(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDocumentsToStorage = async (documents: SavedDocument[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error("Failed to save documents:", error);
    }
  };

  const saveDocument = (
    filename: string,
    hash: string,
    walletAddress: string,
    size: number,
    type: string
  ): SavedDocument => {
    const newDoc: SavedDocument = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      filename,
      hash,
      walletAddress,
      timestamp: Date.now(),
      size,
      type,
    };

    const updatedDocuments = [...savedDocuments, newDoc];
    setSavedDocuments(updatedDocuments);
    saveDocumentsToStorage(updatedDocuments);

    return newDoc;
  };

  const findDocumentByHash = (hash: string): SavedDocument | null => {
    const normalizedHash = hash.trim().toLowerCase();
    return (
      savedDocuments.find(
        (doc) => doc.hash.trim().toLowerCase() === normalizedHash
      ) || null
    );
  };

  const getDocumentsByWallet = (): SavedDocument[] => {
    return savedDocuments;
  };

  const deleteDocument = (id: string) => {
    const updatedDocuments = savedDocuments.filter((doc) => doc.id !== id);
    setSavedDocuments(updatedDocuments);
    saveDocumentsToStorage(updatedDocuments);
  };

  return {
    savedDocuments,
    saveDocument,
    findDocumentByHash,
    getDocumentsByWallet,
    deleteDocument,
    loading,
  };
};
