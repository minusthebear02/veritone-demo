import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import { useItems } from "../context/ItemContext";

const DeleteItemDialog = ({ open, handleCloseDialog, itemId }) => {
  const { deleteItem, isDeletingItem } = useItems();

  const handleClose = () => {
    handleCloseDialog();
  };

  const handleDeleteItem = () => {
    console.log("delete item: ", itemId);
    deleteItem(itemId);
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Item?</DialogTitle>
      <DialogContent className="content">
        <Typography variant="h6">
          Are you sure you want to delete this item? This can not be undone.
        </Typography>
      </DialogContent>

      <DialogActions className="actions">
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          loading={isDeletingItem}
          variant="contained"
          color="secondary"
          onClick={handleDeleteItem}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default DeleteItemDialog;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 410px;
    border-bottom: 5px solid #4d81b7;
  }

  .content {
    padding-bottom: 30px;

    h6 {
      font-size: 16px;
      color: #2a323c;
      margin-top: 5px;
      opacity: 0.7;
    }
  }

  .actions {
    padding-top: 30px;
  }

  button {
    font-weight: 600;
  }
`;
