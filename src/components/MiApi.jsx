import { useState, useEffect } from "react";
import Busqueda from "./Busqueda";
import "./miApi.css";
import spinner from "../img/spinner.gif";

const MiApi = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        const url = `https://breakingbadapi.com/api/characters`;
        const response = await fetch(url);
        const data = await response.json();
        const dataOrdenada = sortArray(data);

        setItems(dataOrdenada);
        setFilteredItems(dataOrdenada);
        setIsLoading(false);
    };

    const sortArray = (arr) => {
        return arr.sort((a, b) => {
            const nombreA = a.name.toLowerCase();
            const nombreB = b.name.toLowerCase();

            if (nombreA > nombreB) {
                return 1;
            }
            if (nombreA < nombreB) {
                return -1;
            }
            return 0;
        });
    };

    return (
        <div>
            <Busqueda items={items} setFilteredItems={setFilteredItems} />

            {isLoading ? (
                <img
                    src={spinner}
                    style={{
                        width: "500px",
                        margin: "0 auto",
                        display: "block",
                    }}
                />
            ) : filteredItems.length === 0 ? (
                <h2 className='no-hay-personajes'>
                    No se encontraron personajes
                </h2>
            ) : (
                <section className='cards'>
                    {filteredItems.map((item) => (
                        <div className='card' key={item.char_id}>
                            <div className='card-inner'>
                                <div className='card-front'>
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className='card-back'>
                                    <h1>{item.name}</h1>
                                    <ul>
                                        <li>
                                            <strong>Nombre actor:</strong>{" "}
                                            {item.portrayed}
                                        </li>
                                        <li>
                                            <strong>Apodo:</strong>{" "}
                                            {item.nickname}
                                        </li>
                                        <li>
                                            <strong>Status:</strong>{" "}
                                            {item.status}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default MiApi;
