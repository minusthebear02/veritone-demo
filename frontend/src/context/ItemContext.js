import React, { useState, useContext, createContext } from "react";
import axios from "axios";
import { useMutation, useInfiniteQuery } from "react-query";
import { useToastMessage } from "./ToastContext";
import { useUser } from "./UserContext";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const agent = useItemProvider();
  return <ItemContext.Provider value={agent}>{children}</ItemContext.Provider>;
};

export const useItems = () => useContext(ItemContext);

const useItemProvider = () => {
  const { showToastMessage } = useToastMessage();

  const { user } = useUser();

  const {
    isLoading: loadingItems,
    data: shoppingListItems,
    error: itemsError,
    isFetchingNextPage: fetchingMoreItems,
    fetchNextPage: fetchMoreItems,
    hasNextPage,
    refetch: refetchItems,
  } = useInfiniteQuery(
    ["shoppingItems", user?.id],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `http://localhost:3000/items?page=${pageParam}&userId=${user?.id}`
      );
      return res;
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.data.meta.nextPage || false,
    }
  );

  const {
    mutate: addItem,
    isLoading: isAddingItem,
    error: itemAddingError,
  } = useMutation(
    (formData) => {
      return axios.post("http://localhost:3000/items", {
        ...formData,
        userId: user.id,
      });
    },
    {
      onSuccess: (res) => {
        if (res) {
          refetchItems();
          showToastMessage({
            type: "success",
            message: "Item added!",
          });
        } else {
          throw new Error(
            "There was an issue adding the item. Please try again."
          );
        }
      },
    }
  );

  const { mutate: updateItem, isLoading: isUpdatingItem } = useMutation(
    (inputData) => {
      return axios.put("http://localhost:3000/items", inputData);
    },
    {
      onSuccess: (res) => {
        if (res) {
          showToastMessage({
            type: "success",
            message: "Item updated!",
          });
          refetchItems();
        } else {
          throw new Error(
            "There was an issue adding the item. Please try again."
          );
        }
      },
    }
  );

  const { mutate: updatePurchased } = useMutation(
    (inputData) => {
      return axios.put("http://localhost:3000/items/purchased", inputData);
    },
    {
      onSuccess: (res) => {
        if (res) {
          refetchItems();
        } else {
          throw new Error(
            "There was an issue adding the item. Please try again."
          );
        }
      },
    }
  );

  const { mutate: deleteItem, isLoading: isDeletingItem } = useMutation(
    (id) => {
      return axios.delete(`http://localhost:3000/items/${id}`);
    },
    {
      onSuccess: (res) => {
        if (res) {
          refetchItems();
        } else {
          throw new Error(
            "There was an issue adding the item. Please try again."
          );
        }
      },
    }
  );

  return {
    shoppingListItems,
    loadingItems,
    itemsError,
    fetchingMoreItems,
    fetchMoreItems,
    hasNextPage,
    addItem,
    isAddingItem,
    itemAddingError,
    updatePurchased,
    updateItem,
    isUpdatingItem,
    deleteItem,
    isDeletingItem,
  };
};
