import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { useMutation, useInfiniteQuery } from 'react-query';
import { useToastMessage } from './ToastContext';
import { useUser } from './UserContext'

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const agent = useItemProvider();
  return <ItemContext.Provider value={agent}>{children}</ItemContext.Provider>;
};

export const useItems = () => useContext(ItemContext);

const useItemProvider = () => {

    const [nextPage, setNextPage] = useState(1);

    const { showToastMessage } = useToastMessage();

    const { user } = useUser()

  const {
    isLoading: loadingItems,
    data: shoppingListItems,
    error: itemsError,
    isFetchingNextPage: fetchingMoreItems,
    fetchNextPage: fetchMoreItems,
    refetch: refetchItems,
  } = useInfiniteQuery(
    ['shoppingItems', user?.id],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `http://localhost:3000/items?page=${pageParam}&userId=${user?.id}`
      );
      setNextPage(res.data.meta.nextPage);
      return res;
    },
    {
      getNextPageParam: () => nextPage,
    }
  );

  const {
    mutate: addItem,
    isLoading: isAddingItem,
    error: itemAddingError,
  } = useMutation(
    formData => {
      return axios.post('http://localhost:3000/items', {
        ...formData,
        userId: user.id,
      });
    },
    {
      onSuccess: res => {
        if (res) {
            console.log( 'adding item result: ', res );
            refetchItems()
            showToastMessage({
                type: 'success',
                message: 'Item added!',
            });
        } else {
            throw new Error(
                'There was an issue adding the item. Please try again.'
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
    addItem,
    isAddingItem,
    itemAddingError,
  };
};