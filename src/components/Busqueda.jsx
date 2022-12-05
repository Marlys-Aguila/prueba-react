import { useState } from "react";
import "./busqueda.css";

const Busqueda = ({ items, setFilteredItems }) => {
    const [text, setText] = useState("");

    const onChangeText = (event) => {
        const searchText = event.target.value;
        setText(searchText);
        setFilteredItems(filter(searchText.trim().toLowerCase()));
    };

    const filter = (searchText) => {
        const filtro = items.filter((item) => {
            let newName = item.name.trim().toLowerCase();
            return newName.includes(searchText);
        });
        return filtro;
    };

    return (
        <div>
            <form>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Buscar personaje'
                    value={text}
                    onChange={(event) => onChangeText(event)}
                    autoFocus
                />
            </form>
        </div>
    );
};

export default Busqueda;
