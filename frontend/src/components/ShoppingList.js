import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';

import ShoppingListItem from './ShoppingListItem';
import DeleteItemDialog from './DeleteItemDialog';
import { useItems } from '../context/ItemContext';

const ShoppingList = ({ pages, openDialog }) => {
  const [showDeleteDialog, toggleDeleteDialog] = useState(false);
  const [itemBeingDeleted, setItemBeingDeleted] = useState(null);

  const { fetchMoreItems, fetchingMoreItems, hasNextPage } = useItems();

  const handleScroll = () => {
    if (!hasNextPage) return;
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    fetchMoreItems();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage]);

  const handleOpenDeleteDialog = itemId => {
    setItemBeingDeleted(itemId);
    toggleDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setItemBeingDeleted(null);
    toggleDeleteDialog(false);
  };

  const renderItems = pages => {
    const flattenedItems = pages.reduce((acc, currentPage) => {
      return [...acc, ...currentPage.data?.data];
    }, []);

    if (!flattenedItems.length) return null;

    return flattenedItems.map((item, index) => (
      <ShoppingListItem
        key={item.id}
        index={index}
        item={item}
        openDialog={openDialog}
        openDeleteDialog={() => handleOpenDeleteDialog(item.id)}
      />
    ));
  };

  return (
    <>
      <StyledList>{renderItems(pages)}</StyledList>
      {fetchingMoreItems && (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <CircularProgress />
        </div>
      )}
      <DeleteItemDialog
        open={showDeleteDialog}
        handleCloseDialog={handleCloseDeleteDialog}
        itemId={itemBeingDeleted}
      />
    </>
  );
};

export default ShoppingList;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;
