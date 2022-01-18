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
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../Contexts/AdminProvider";

const AddPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
    color: "",
  });

  const { addProduct } = useContext(AdminContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    // ! проверка на пустоту
    for (const key in newProduct) {
      if (!newProduct[key]) {
        alert("Заполните поля!");
        return;
      }
    }

    addProduct(newProduct);
    // ! очищаем инпуты
    setNewProduct({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      color: "",
    });
  };

  return (
    <div className="add-edit-page">
      <Container>
        <h2>ADD PAGE</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            value={newProduct.name}
            label="Введите название"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            value={newProduct.brand}
            label="Введите бренд"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: +e.target.value })
            }
            value={newProduct.price}
            label="Введите цену"
            variant="standard"
            type="number"
          />
          <TextareaAutosize
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            value={newProduct.description}
            minRows={3}
            placeholder="Введите описание"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            value={newProduct.image}
            label="Введите фото"
            variant="standard"
          />

          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              onChange={(e) =>
                setNewProduct({ ...newProduct, color: e.target.value })
              }
              value={newProduct.color}
              labelId="color-select"
              label="Выберите цвет"
            >
              <MenuItem value="black">Черный</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
              <MenuItem value="gray">Серый</MenuItem>
              <MenuItem value="space-gray">Темно-серый</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Добавить
          </Button>
        </form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default AddPage;
