import { useEffect, useState } from 'react';

export default function Film() {
    const [filmData, setFilmData] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getFilm() {
            const response = await fetch('https://rasantacruz.fr/cineclub/films/get/1');
            const data = await response.json();
            setFilmData(data);
            setLoading(false);            
            
            console.log(data);
        }
        getFilm();
    }, []);
    return (
        <>
            {loading ?
                <p>Loading</p>
                : <div>
                    <h1>{filmData.name}</h1>
                    <h3>par {filmData.author}</h3>
                    <img src={"http://rasantacruz.fr/cineclub" + filmData.url_image} alt="" />
                </div>
            }
        </>
    )
}