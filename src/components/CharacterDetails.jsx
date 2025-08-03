import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import background from '../assets/photo1.jpg'

function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Show spinner initially

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error('Failed to fetch character');
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen  text-white p-6" style={{ backgroundImage: `url(${background})` }}>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white hover:bg-black text-black px-4 py-2 rounded-lg hover:text-white ease-in-out duration-500"
      >
        <span>🡐</span> Back
      </button>

      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-2xl">
        <img
          src={character.image}
          alt={character.name}
          className="w-full rounded-full mb-4 p-3 border-2 "
        />
        <h2 className="text-2xl font-bold mb-2 underline text-center text-purple-700">{character.name}</h2>
        <p><strong className=' italic text-purple-700'>Status :</strong>  {character.status}</p>
        <p><strong className='italic text-purple-700'>Species :</strong>  {character.species}</p>
        <p><strong className='italic text-purple-700'>Gender :</strong>  {character.gender}</p>
        <p><strong className='italic text-purple-700'>Origin :</strong>  {character.origin?.name}</p>
        <p><strong className='italic text-purple-700'>Location :</strong>  {character.location?.name}</p>
      </div>
    </div>
  );
}

export default CharacterDetails;