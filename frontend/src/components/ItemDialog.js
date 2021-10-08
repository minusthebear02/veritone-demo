import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm, Controller } from 'react-hook-form';
import { useItems } from '../context/ItemContext';

const ItemDialog = ({ open, handleCloseDialog, item }) => {
  const { addItem, isAddingItem, updateItem } = useItems();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    handleCloseDialog();
  };

  const onSubmit = async data => {
    if (!item) {
      await addItem(data);
    } else {
      await updateItem({ id: item.id, ...data });
    }
    reset();
    handleClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle className="dialog-title">
        Shopping List
        <IconButton onClick={handleClose}>
          <LastPageIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="content">
        <Typography variant="h4">{item ? 'Edit' : 'Add'} an Item</Typography>
        <Typography variant="h6">
          {item ? 'Edit' : 'Add'} your new item below
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue={item ? item.name : ''}
            rules={{ required: true, maxLength: 100 }}
            render={({ field }) => (
              <TextField
                required
                label="Item Name"
                type="text"
                error={errors.name}
                helperText={errors.name && 'A valid item name is required'}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue={item ? item.description : ''}
            rules={{ maxLength: 100 }}
            render={({ field }) => (
              <TextField
                multiline
                rows={6}
                label="Description"
                type="text"
                error={errors.description}
                helperText={
                  errors.description && 'Max length of 100 characters.'
                }
                {...field}
              />
            )}
          />

          <Controller
            name="quantity"
            control={control}
            defaultValue={item ? item.quantity : ''}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">How many?</InputLabel>
                <Select
                  name="quantity"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="How many?"
                  defaultValue={null}
                  {...field}
                >
                  {[...new Array(10)].map((_, index) => (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {item && (
            <Controller
              name="purchased"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked={item?.purchased} {...field} />
                  }
                  label="Purchased"
                />
              )}
            />
          )}
          <DialogActions className="actions">
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loading={isAddingItem}
              variant="contained"
              color="secondary"
              type="submit"
            >
              {item ? 'Save' : 'Add'} Item
            </LoadingButton>
          </DialogActions>
        </Form>
      </DialogContent>
    </StyledDialog>
  );
};

export default ItemDialog;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 560px;
    border-bottom: 5px solid #4d81b7;
  }

  .dialog-title {
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 600;
    color: #5c6269;
    border-bottom: 0.5px solid #d5dfe9;
  }

  .content {
    padding: 30px;

    h4,
    h6 {
      font-size: 18px;
      color: #2a323c;
    }

    h6 {
      font-size: 16px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  row-gap: 18px;

  label {
    color: #9ca8b4;
  }
`;
