import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useItems } from '../context/ItemContext';


const ShoppingListItem = ( { item, openDialog, openDeleteDialog } ) => {

    const { updatePurchased } = useItems()

    const handlePurchase = e => {
        updatePurchased( { itemId: item.id, isPurchased: e.target.checked })
    }

    const handleOpenDialog = () => {
        openDialog('', item)
    }

    const { name, description, quantity, purchased } = item;

    return (
      <StyledBox
        sx={{
          background: purchased ? '#D5DFE92B' : '#fff',
          borderColor: purchased ? 'transparent' : '#d5dfe9',
        }}
      >
        <div className="checkbox">
          <Checkbox
            defaultChecked={item?.purchased}
            onChange={handlePurchase}
          />
        </div>
        <div className="item-content">
          <Typography
            variant="h5"
            color={purchased ? 'primary' : null}
            sx={{ textDecoration: purchased ? 'line-through' : 'none' }}
          >
            {name}
            <span
              variant="body2"
              className="quantity"
            >
              (qty: {quantity})
            </span>
          </Typography>

          <Typography
            variant="body1"
            sx={{ textDecoration: purchased ? 'line-through' : 'none' }}
          >
            {description}
          </Typography>
        </div>
        <div className="action-buttons">
          <IconButton onClick={handleOpenDialog}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={openDeleteDialog}>
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
      </StyledBox>
    );
}

export default ShoppingListItem

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 20px;
  border-width: 0.5px;
  border-style: solid;
  border-radius: 4px;
  transition: all 0.2s ease-out;

  .item-content {
      flex: 1;
      padding: 0 20px;

      h5 {
          font-size: 16px;
          font-weight: 600;
          transition: all 0.2s ease-out;
        }

        .quantity {
            font-size: 0.7em;
            opacity: 0.5;
            margin-left: 7px;
        }

        p {
            font-size: 14px;
            color: #7d7a7a;
            font-weight: 600;
            transition: all 0.2s ease-out;
    }
  }
`;
