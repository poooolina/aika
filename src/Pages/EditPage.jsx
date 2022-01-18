import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../Contexts/AdminProvider";

const EditPage = () => {
  const params = useParams();
  const { getProductToEdit, productToEdit, saveEditedProduct } =
    useContext(AdminContext);
  const [productEdit, setProductToEdit] = useState(productToEdit);
  const navigate = useNavigate();

  useEffect(() => {
    setProductToEdit(productToEdit);
  }, [productToEdit]);

  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    for (const key in productEdit) {
      if (!productEdit[key]) {
        alert("Заполните поля");
        return;
      }
    }
    saveEditedProduct(productEdit);
    navigate("/admin-panel");
  };

  if (!productEdit) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Edit Page</h2>

        <form onSubmit={handleSubmit}>
          <TextField
            value={productEdit.name}
            onChange={(e) =>
              setProductToEdit({ ...productToEdit, name: e.target.vslue })
            }
            label="Введите название"
            variant="standard"
          />
          <TextField
            value={productEdit.brand}
            onChange={(e) =>
              setProductToEdit({ ...productEdit, brand: e.target.value })
            }
            label="Введите бренд"
            variant="standard"
          />
          <TextField
            value={productEdit.price}
            onChange={(e) =>
              setProductToEdit({ ...productEdit, price: e.target.value })
            }
            label="Введите цену"
            variant="standard"
            type="number"
          />
          <TextareaAutosize
            value={productEdit.description}
            onChange={(e) =>
              setProductToEdit({ ...productEdit, description: e.target.value })
            }
            placeholder="Введите описание"
            minRows={3}
          />
          <TextField
            value={productEdit.image}
            onChange={(e) =>
              setProductToEdit({ ...productEdit, image: e.target.value })
            }
            label="Введите фото"
            variant="standard"
          />

          <FormControl fullWidth>
            <InputLabel id="color-select"> Введите цвет</InputLabel>
            <Select
              value={productEdit.color}
              onChange={(e) =>
                setProductToEdit({ ...productEdit, color: e.target.value })
              }
              labelId="color-select"
              label="Выберите цвет"
            >
              <MenuItem value="black">Черный</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
              <MenuItem value="gray">Серый</MenuItem>
              <MenuItem value="space-gray">Темно-серый</MenuItem>
            </Select>
          </FormControl>
          <Button color="success" variant="outlined" type="submit">
            Сохранить изменения
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditPage;
