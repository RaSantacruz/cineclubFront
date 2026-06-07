export default async function getFilm(id) {
    const url = `${import.meta.env.VITE_API_URL}/films/get/${id}`;
    const response = await fetch(url);
    let data = await response.json();    
    return data;
}