import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from  'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVgame, getGenres, getPlatforms } from '../../redux/actions/index.js';
import './Create.css';

// VALIDACION:
function validateErrors(input){
    var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image);
    let errors = {};

    if(!input.name){
        errors.name = 'Each game must have a Name!';
    } else if(!input.background_image || !validIMG){
        errors.background_image = 'Image must have a valid Link.'

    } else if(!input.description || input.lenght > 3){
        errors.description = 'Description must be present...'

    } else if(!input.released){
        errors.released = 'Game must have a date of released.'

    } else if(input.rating === 0 || input.rating === '' || input.rating < 1 || input.rating >= 5 ){
        errors.rating = 'Game Rating must be from 1 to 5 points.'
    }
        return errors;
}

export default function Create(){

    const dispatch = useDispatch();
    
    const genres = useSelector((state) => state.genres);
    // console.log("Soy Genres >>> ", genres);
    const platforms = useSelector((state) => state.platforms);
    // console.log("Soy Platforms >>> ", platforms);

    // useHistory ahora se llama useNavigate [[ v6 react-router-dom ]]
    const history = useNavigate(); 
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        background_image: '',
        rating: '',
        releaseDate: '',
        description: '',
        genres: [],
        platforms: [],
    });

    function handleOnChanges(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log("Soy INPUT >>> ", input);
        // Validacion de input:
        setErrors(
            validateErrors({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    function handlePlatformSelected(e) {
        e.preventDefault();
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
        });
    };

    function handleGenreSelected(e) {
        e.preventDefault();
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        //  CONTROLO QUÉ TIENE EL FORM ANTES DE SER ENVIADO:
        if( input.name &&
            input.background_image &&
            input.rating &&
            input.releaseDate &&
            input.description &&
            input.genres &&
            input.platforms
            ){
        //  LLAMO A LA FUNCTION QUE CONECTA CON EL back-end Y LE MANDO LO QUE TIENE input:
        dispatch(postVgame(input));
        alert("VideoGame was created successfully !");
        setInput({
            name: '',
            background_image: '',
            rating: '',
            releaseDate: '',
            description: '',
            genres: [],
            platforms: [],
        });
        history('/home');
        }else(alert('Must feel all the inputs.'));
    };

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            genres: input.genres.filter((gen) => gen !== e.target.value),
            platforms: input.platforms.filter((pt) => pt !== e.target.value),
        });
    };

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    let id = 0
    function addKey(){
        return id++
    }

    return(
        <div className='create-container'>

            <div>
                <h2><u>Create your own Game:</u></h2><br />

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name: </label>
                        <input
                            className='input-form'  type='text'    name='name'
                            placeholder='Be creative...'    value={input.name}
                            onChange={handleOnChanges}
                        />
                        {
                            errors.name && (
                                <p className='error'>   {errors.name}   </p>
                            )
                        }
                    </div>  <br />

                    <div>
                        <label>Image: </label>
                        <input 
                            className='input-form'    type='text'   name='background_image'
                            placeholder='Image Link....'    value={input.background_image}
                            onChange={handleOnChanges}
                        />
                        {
                            errors.background_image && (
                                <p className='error'>   {errors.background_image}   </p>
                            )
                        }
                    </div>  <br />

                    <div>
                        <label>Rating: </label>
                        <input 
                            className='input-form'   type='text'    name='rating'
                            placeholder='Numbers 1 to 5 max.'   value={input.rating}
                            onChange={handleOnChanges}
                        />
                        {
                            errors.rating && (
                                <p className='error'>   {errors.rating}  </p>
                            )
                        }
                    </div>  <br />

                    <div>
                        <label>Release Date: </label>
                        <input
                            className='input-form' type="date"    name='releaseDate'    id='releseDateGame'
                            // placeholder='e.g. 2001-9-11'    
                            min='2019-12-31'  max='2022-12-31'    value={input.releaseDate}
                            onChange={handleOnChanges}
                        />
                        {
                            errors.releaseDate && (
                                <p className='error'>   {errors.releaseDate}  </p>
                            )
                        }
                    </div>  <br />

                    <div>
                        <label>Description: </label>
                        <input
                        className='input-form'   type="textarea"    name='description'
                        placeholder='Breif resume about the game...'    value={input.description}
                        onChange={handleOnChanges}
                        />
                    </div>  <br />

                    <div>
                        <label>Genres: </label>
                        <select onChange={handleGenreSelected} className='input-form'>
                            <option name='genres' key='keyG'>Select from...</option>
                            {
                                genres && genres.map((g) => (
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                ))
                            }
                        </select>
                    </div>  <br />
                    {/* BOTON PARA HACER CLICK Y BORRAR LA OPCION ELEGIDA: */}
                    <div className='btn-genres'>
                        {input.genres.map(gen => (
                                <div key={addKey()}>
                                    <button onClick={handleDelete} className='btn-delete-gen' value={gen}>
                                        {gen}
                                    </button>
                                </div>
                            ))
                        }
                    </div>  <br />

                    <div>
                        <label>Platforms: </label>
                        <select onChange={handlePlatformSelected} className='input-form'>
                            <option name='platforms' key='keyP'>Choose from...</option>
                            {
                                platforms && platforms.map(plat => (
                                    <option key={plat.id} value={plat.name}>{plat.name}</option>
                                ))
                            }
                        </select>
                    </div>  <br />
                    {/* BOTON PARA HACER CLICK Y BORRAR LA OPCION ELEGIDA: */}
                    <div className='btn-platforms'>
                        {input.platforms.map(p => (
                            <div key={addKey()}>
                                <button onClick={handleDelete} className='btn-delete-platforms' value={p}>
                                    {p}
                                </button>
                            </div>
                            ))
                        }
                    </div>  <br />

                    <button
                        className='btn-submit' value='create-game' type='submit'
                        id='submit-button'>
                            SUBMIT
                    </button>

                </form>
                
            </div>  <br />

            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    );
};
