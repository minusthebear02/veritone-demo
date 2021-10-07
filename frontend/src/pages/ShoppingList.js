import React, { useState } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

import { useItems } from '../context/ItemContext'
import ShoppingList from '../components/ShoppingList'
import ItemDialog from '../components/ItemDialog'

const ShoppingListPage = () => {

    const { shoppingListItems, loadingItems } = useItems()
    const [ dialogOpen, setDialogOpen ] = useState( false )
    const [ itemBeingEdited, setItemBeingEdited ] = useState(null)

    const handleOpenDialog = (e, item) => {
        if ( item ) {
            setItemBeingEdited( item )
        }
        setDialogOpen( true );
    }

    if (loadingItems) return <Loader size={76} />

    return (
        <>
            <Page>
                {!shoppingListItems?.pages?.[0].data?.data?.length ? (
                    <Box className="empty-box">
                        <Typography variant="h4">Your shopping list is empty :(</Typography>
                        <Button variant="contained" color="secondary" onClick={handleOpenDialog}>Add your first item</Button>
                    </Box>
                ) : <ShoppingList listItems={shoppingListItems.pages} />}
            </Page>
            <ItemDialog open={dialogOpen} setOpen={setDialogOpen} item={itemBeingEdited} />
        </>
    )
}

export default ShoppingListPage

const Loader = styled( CircularProgress )`
    position: absolute;
    top: 188px;
    left: 50%;
    transform: translateX(-50%);
`

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 100px 5%;

  .empty-box {
    width: 100%;
    max-width: 614px;
    height: 290px;
    border: 1px solid #c6c6c6;
    border-radius: 5px;
    margin-top: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    h4 {
        font-family: 'Nunito';
        font-size: 18px;
        color: #87898C;
        position: absolute;
        transform: translateY(-43px)
    }

    button {
        font-family: 'Nunito';
        font-weight: 600;
        font-size: 14px;
        text-transform: unset;
    }
  }
`;
