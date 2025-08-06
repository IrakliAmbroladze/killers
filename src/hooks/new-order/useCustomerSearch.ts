import { useState, useCallback } from "react";
import { fetchCustomers } from "@/lib"; // A function that can fetch by partial ID
import { Customer } from "@/types";

export const useCustomerSearch = () => {
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchCustomers = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }
    try {
      const res = await fetchCustomers(query);
      if (res?.data) {
        setSearchResults(res.data);
        setIsOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { searchResults, isOpen, searchCustomers, closeSearch };
};
