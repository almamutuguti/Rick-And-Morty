import React, { useEffect, useState } from 'react'
import background from '../assets/photo1.jpg'

const BASE_URL = 'https://rickandmortyapi.com/api/character'

function Characters() {

    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let aborted = false
        async function fetchAllChars() {
            try {
                let allCharacters = [];
                let nextUrl = BASE_URL;

                while (nextUrl) {
                    const res = await fetch(nextUrl);
                    if (!res.ok) throw new Error(`Failed with status ${res.status}`);

                    const data = await res.json();
                    allCharacters = allCharacters.concat(data.results);
                    nextUrl = data.info.next;

                    if (aborted) break;

                }

                if (!aborted) {
                    console.log("Characters fetched: ", allCharacters);
                    setCharacters(allCharacters);
                }

            } catch (err) {
                if (!aborted) setError(err.message);
                console.log('Error fetching all data:', err)
            }
        }
        fetchAllChars();

        return () => {
            aborted = true;
        };
    }, [])

    if (error) return <div className='p-4 text-red-600'>Error: {error} </div>

    const handleDelete = (idToDelete) => {
        setCharacters(characters.filter(character => character.id !== idToDelete))
    };
    return (
        <div
            className=""
            style={{ backgroundImage: `url(${background})` }}
        >

            <div className="relative z-10 p-6 text-white">
                <h2 className="font-semibold text-center text-2xl mb-6">
                    Rick and Morty Characters ({characters.length})
                </h2>

                <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4'>
                    {characters.map((char) => (
                        <div key={char.id} className='border-2 rounded-lg p-6 bg-black bg-opacity-60 hover:bg-gray-800 hover:cursor-pointer'>
                            <img
                                src={char.image} className='rounded-lg'
                            />
                            <h3 className='text-white'>{char.name}</h3>
                            <button className='bg-red-600 text-white rounded-lg hover:bg-red-800 p-2 w-20 hover:cursor-pointer' onClick={() => handleDelete(char.id)}>Delete</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>)
}

export default Characters