import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext } from '../../contexts/NotificationContext'

import * as petService from '../../services/petService'
import * as likeService from '../../services/likeService'
//import usePetState from '../../hooks/usePetState';

import { Button } from 'react-bootstrap';
import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';

import heart from '../../Heart.svg.png'
import style from './Details.module.css'


const Details = () => {
    const [pet, setPet] = useState({});
    const { petId } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { addNotification } = useNotificationContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        petService.getOne(petId)
            .then(petResult => {
                setPet(petResult);
            })
    }, [petId]);


    const deleteHandler = (e) => {
        e.preventDefault();

        petService.deleteOne(petId, user.accessToken)
            .then(() => {
                navigate('/my-pets');
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };
    const deleteClickHandler = (e) => {
        e.preventDefault();
        console.log(process.env.NODE_ENV);
        setShowDeleteDialog(true);
    }


    const ownerButtons = (
        <>
             <button className={style.button}>
                <Link  to={`/details/edit/${pet._id}`}> Edit </Link>
         </button> 
            <button className={style.button} onClick={deleteClickHandler} > Delete </button>
        </>
    );

    const likeButtonClick = () => {
        if (user._id === pet._owner) {
            return;
        }

        if (pet.likes.includes(user._id)) {
            addNotification('You cannot like again')
            return;
        }

        likeService.like(user._id, petId)
            .then(() => {
                setPet(state => ({ ...state, likes: [...state.likes, user._id] }));

                addNotification('Successfuly liked this photo');
            });
    };




    const userButtons = <Button
        onClick={likeButtonClick}
        disabled={pet.likes?.includes(user._id)}>
        Like
    </Button>;

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />
            <Link className={style.backButton} to={'/'}  >
                BACK
            </Link>
            <section id="details-page" className={style.details}>
                <div className="pet-information">
                    <h3>Name: {pet.name}</h3>
                    <div className={style.likes}>
                        <img className="hearts" style={{ width: "25px" }} src={heart} alt="Heart" />
                        <span id="total-likes">Likes: {pet.likes?.length || 0}</span>
                    </div>
                    <p>Category: {pet.category}</p>

                    <p className={style.img}><img src={pet.imageUrl} /></p>
                    <div className={style.actions}>
                        {user._id && (user._id === pet.owner
                            ? ownerButtons
                            : userButtons
                        )}

                    </div>
                </div>
                <div className={style.description}>
                    <h3>Description:</h3>
                    <p>{pet.description}</p>
                </div>
            </section>
        </>
    );
}
export default Details;