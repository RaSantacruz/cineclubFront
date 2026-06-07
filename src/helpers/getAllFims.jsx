export default async function getAllFilms() {
    const url = `${import.meta.env.VITE_API_URL}/films/getAll`;
    const response = await fetch(url);
    let data = await response.json();      
    return data;
  }