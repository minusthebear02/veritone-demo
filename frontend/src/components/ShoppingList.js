import React, { useState } from 'react'
import styled from 'styled-components'
import List from '@mui/material/List';

import ShoppingListItem from './ShoppingListItem'
import DeleteItemDialog from './DeleteItemDialog';

const ShoppingList = ( { pages, openDialog } ) => {

    const [showDeleteDialog, toggleDeleteDialog] = useState( false )
    const [itemBeingDeleted, setItemBeingDeleted] = useState( null )

    const handleOpenDeleteDialog = ( itemId ) => {
        setItemBeingDeleted(itemId)
        toggleDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setItemBeingDeleted(null)
        toggleDeleteDialog(false)
    }

    const renderItems = (pages) => {
        const flattenedItems = pages.reduce( (acc, currentPage) => {
            return [...acc, ...currentPage.data?.data]
        }, [] )

        if ( !flattenedItems.length ) return null;

        return flattenedItems.map( item => <ShoppingListItem key={item.id} item={item} openDialog={openDialog} openDeleteDialog={() => handleOpenDeleteDialog(item.id)} />)
    }

    return (
        <>
            <StyledList>
                {renderItems(pages)}
            </StyledList>
            <DeleteItemDialog open={showDeleteDialog} handleCloseDialog={handleCloseDeleteDialog} itemId={itemBeingDeleted} />
        </>
    )
}

export default ShoppingList

const StyledList = styled( List )`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
`
