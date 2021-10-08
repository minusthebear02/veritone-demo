import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useItems } from '../context/ItemContext';
import { decodeHtml } from '../utils/decodeHtml';

const ShoppingListItem = ({ item, openDialog, openDeleteDialog, index }) => {
  const [isPurchased, setIsPurchased] = useState(item.purchased);
  const { updatePurchased, updatePurchasedError } = useItems();

  const handlePurchase = e => {
    setIsPurchased(e.target.checked);
    updatePurchased({ itemId: item.id, isPurchased: e.target.checked });
  };

  useEffect(() => {
    if (updatePurchasedError) {
      setIsPurchased(!isPurchased);
    }
  }, [updatePurchasedError]);

  const handleOpenDialog = () => {
    openDialog('', item);
  };

  const { name, description, quantity } = item;

  return (
    <StyledBox
      index={index % 20}
      sx={{
        background: isPurchased ? '#D5DFE92B' : '#fff',
        borderColor: isPurchased ? 'transparent' : '#d5dfe9',
      }}
    >
      <div className="checkbox">
        <Checkbox defaultChecked={isPurchased} onChange={handlePurchase} />
      </div>
      <div className="item-content">
        <Typography
          variant="h5"
          color={isPurchased ? 'primary' : null}
          sx={{ textDecoration: isPurchased ? 'line-through' : 'none' }}
        >
          {name}
          <span variant="body2" className="quantity">
            (qty: {quantity})
          </span>
        </Typography>

        <Typography
          variant="body1"
          sx={{ textDecoration: isPurchased ? 'line-through' : 'none' }}
        >
          {decodeHtml(description)}
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
};

export default ShoppingListItem;

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 20px;
  border-width: 0.5px;
  border-style: solid;
  border-radius: 4px;
  opacity: 0;
  animation: ${FadeIn} 0.5s ease-out forwards;
  animation-delay: ${props => props.index * 0.1}s;
  transition: all 0.2s ease-out;

  .item-content {
    flex: 1;
    padding: 0 20px;

    h5 {
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
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
