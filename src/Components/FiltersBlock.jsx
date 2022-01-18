import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../Contexts/ClientProvider";

const FiltersBlock = () => {
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { getProducts } = useContext(ClientContext);
  const [searchValue, setSearchValue] = useState(search.get("q") || "");
  const [colorValue, setColorValue] = useState(search.get("color") || "");

  const filterProducts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    setColorValue(search.get("color") || "");
    getProducts();
  };

  const resetFilter = () => {
    navigate("/");
    setSearchValue("");
    setColorValue("");
    getProducts();
  };
  return (
    <div className="filters-block">
      <div>
        <TextField
          value={searchValue}
          onChange={(e) => filterProducts("q", e.target.value)}
          variant="outlined"
          label="Живой поиск..."
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="color-select">Цвет</InputLabel>
          <Select
            value={colorValue}
            onChange={(e) => filterProducts("color", e.target.value)}
            labelId="color-select"
            label="Выберите цвет"
          >
            <MenuItem value="black">Черный</MenuItem>
            <MenuItem value="white">Белый</MenuItem>
            <MenuItem value="gray">Серый</MenuItem>
            <MenuItem value="space-gray">Темно-серый</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button onClick={resetFilter} variant="contained" color="inherit">
          Сбросить
        </Button>
      </div>
    </div>
  );
};

export default FiltersBlock;
