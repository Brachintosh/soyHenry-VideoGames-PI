import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from  'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVgame, getGenres, getPlatforms } from '../../redux/actions/index.js';
import './Create.css';

// VALIDACION:
function validate(input) {
    // eslint-disable-next-line
    let regexURL = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    // let regexDate = /((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])/;  // confirmar porqué no anda...
    // let regexDate = /^\d{4}-\d{2}-\d{2}$/;   // ANDA MEDIO CHUBI...
    // let regexDate = /[0-9]{4}-([0][0-9]|[1][0-2])-([0][0-9]|[1][0-9]|[2][0-9]|[3][0-1])/;    //anda con cualquier año... :S
    // let regexDate = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/;
    // This regex checks if a date is in ISO-format (yyyy-mm-dd). Leap year should be checked too. Date has to be between 1900-01-01 and 2999-12-31.
    
    let regex_formatDate = /^((19|20)\d\d)[- /.](([1-9]|[0][1-9]|1[012]))[- /.](([1-9]|[0][1-9]|1[012])|([12][0-9]|3[01]))$/;

    let error = {};

    if(!input.name || input.name?.trim() >= 4) {
      error.name = "Name your game !";    
    }
    else if(!(regexURL.test(input.background_image))) {
    error.background_image = "Background image will be replaced if it's empty!";
    }
    else if(!input.rating || input.rating === parseInt("0") || input.rating === '' ||
        input.rating < parseFloat("0.1") || input.rating >= parseFloat("5.1") || !Number(input.rating) ) {
    error.rating = "Rating must be a number from 0.1 to 5.0 !"
    }
    else if(!(regex_formatDate.test(input.releaseDate))) {
    error.releaseDate = "Release Date must be: YYYY/MM/DD format!";
    }                                                                   // if(input.releaseDate?.length <= 0) { // error.releaseDate = "Release Date must be: YYYY/MM/DD format !"; // }
    else if(!input.description || input.description?.trim().length <= 3) {
    error.description = "Description must be present.";
    }
    else if(!input.platforms[0]) {
    error.platforms = "Platforms are required !";
    }
    else if(!input.genres[0]) {
    error.genres = "Select at least one Genre!";
    }

    return error;
  };

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

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    function handleOnChanges(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log("Soy INPUT >>> ", input);
        // Validacion de input:
        setErrors(
            validate({
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

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter((gen) => gen !== e.target.value),
            platforms: input.platforms.filter((pt) => pt !== e.target.value),
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        // eslint-disable-next-line
        let regexURL = /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        if(!input.background_image || !(regexURL.test(input.background_image)) ) {
            input.background_image = "https://www.pngkit.com/png/full/336-3365446_view-samegoogleiqdbsaucenao-404-oops-you-found-a-dead.png";
        }
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );

        if(Object.keys(errors).length === 0) {
            dispatch(postVgame(input));
            alert("Game created successfully!");
            setInput({
                name: '',
                background_image: '',
                rating: '',
                releaseDate: '',
                description: '',
                genres: [],
                platforms: [],
            });
            setTimeout(() => {
                history("/home");
              }, 2000);
        }else{
            alert("Error: Game was not created!");
            return;
        }
    };

    // function handleBtnGenreSelected () {
    //     let divStatus = document.getElementById('selected-genres');
       
    //         if (divStatus.style.display == 'block') { divStatus.style.display = 'none'; }
    //             else { divStatus.style.display = 'block'; }
    // }

    let id = 0
    function addKey(){
        return id++
    }

    return(
        <div className='box-container' >

            <div key='f-1' className='create-container'>
                <h2><u>Create your own Game:</u></h2><br />

                <form onSubmit={handleSubmit}>
                    <div className='labels-grid'>
                        <div>
                            <label>Name: </label>
                            <input autoFocus
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
                                className='input-form'   type='text' min='0' max='5'   name='rating'
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
                                className='input-form' type="text"    name='releaseDate'    id='releseDateGame'
                                placeholder='e.g. 2001-9-11'    
                                min='2019-12-31'  max='2022-12-31'    value={input.releaseDate}
                                onChange={handleOnChanges}
                            />
                            {
                                errors.releaseDate && (
                                    <p className='error'>   {errors.releaseDate}  </p>
                                )
                            }
                        </div>  <br />
                    </div>
                    <div className='labels-grid-2'>
                        <div>
                            <label>Genres: </label>
                            <select onChange={handleGenreSelected} className='input-form'>
                                <option name='genres' key='keyG'>Select from...</option>
                                {
                                    genres && genres.map((g) => (
                                        <option key={g.id} value={g.name} name={g}>{g.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.genres && (
                                    <p className='error'>   {errors.genres}  </p>
                                )
                            }
                        </div>  <br />
                        

                        <div>
                            <label>Platforms: </label>
                            <select onChange={handlePlatformSelected} className='input-form'>
                                <option name='platforms' key='keyP'>Choose from...</option>
                                {
                                    platforms && platforms.map(plat => (
                                        <option key={plat.id} value={plat.name} name={plat}>{plat.name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.platforms && (
                                    <p className='error'>   {errors.platforms}  </p>
                                )
                            }
                        </div>  <br />
                        
                    </div> <hr /> <br />

                    <div >
                        <p><b>Genres Selected:</b></p> <br />
                    {/* BOTON PARA HACER CLICK Y BORRAR LA OPCION ELEGIDA: */}
                    <div className='buttons'>
                            {input.genres.map(gen => (
                                    <div key={addKey()}>
                                        <button onClick={handleDelete} className='btn-create' value={gen}>
                                            {gen}
                                        </button>
                                    </div>
                                ))
                            }
                    </div>  <br />
                    </div>  <br />
                            <hr /> <br />
                    <div>
                        <p><b>Platforms Selected:</b></p> <br />
                    {/* BOTON PARA HACER CLICK Y BORRAR LA OPCION ELEGIDA: */}
                    <div className='buttons'>
                            {input.platforms.map(p => (
                                <div key={addKey()}>
                                    <button onClick={handleDelete} className='btn-create' value={p}>
                                        {p}
                                    </button>
                                </div>
                                ))
                            }
                    </div>  <br />
                    </div>  <br />
                    <hr /> <br />
                    
                    <div>
                        <label>Description: </label>
                        <input 
                        className='input-form'   type="textarea"    name='description'  key='description'
                        placeholder='Breif resume about the game...'    value={input.description}
                        onChange={handleOnChanges}
                        />
                        {
                            errors.description && (
                                <p className='error'>   {errors.description}  </p>
                            )
                        }
                    </div>  <br />


                    <button
                        className='btn-submit' value='create-game' type='submit'
                        id='submit-button'>
                            SUBMIT
                    </button>

                </form><br />
                
            <Link to="/home">
                <button className='btn'>Go Back</button><br />
            </Link><br />
            </div>  

        </div>
    );
};



    // VALIDACION:
    // function validateErrors(input){
    //     // var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image);    || !validIMG
    //     let errors = {};

    //     if(!input.name){
    //         errors.name = 'Each game must have a Name!';
    //     } else if(!input.background_image ){
    //         errors.background_image = 'Image must have a valid Link.'

    //     } else if(!input.description || input.lenght > 3){
    //         errors.description = 'Description must be present...'

    //     } else if(!input.released){
    //         errors.released = 'Game must have a date of released.'

    //     } else if(!input.rating || input.rating === 0 || input.rating === '' || input.rating <= 1 || input.rating >= 5 ){
    //         errors.rating = 'Game Rating must be from 1 to 5 points.'
    //     }
    //         return errors;
    // }