import { useNavigate } from 'react-router-dom';
import * as petService from '../../services/petService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext,types} from '../../contexts/NotificationContext';

import style from './Create.module.css'


const Create = () => {
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    const onPetCreate = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let category = formData.get('category');

        petService.create({
            name,
            description,
            imageUrl,
            category,
        }, user.accessToken)
            .then(result => {
                addNotification('You created pet successfully', types.success);
                navigate('/');
            })
    }

    return (
        <section id="create-page" className="create">
            <form id={style.createForm} onSubmit={onPetCreate} >
                <fieldset>
                    <legend>Add new Pet</legend>
                    <p className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input">
                            <input type="text" name="name" id="name" placeholder="Максимум 10 символа" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea name="description" id="description" placeholder="Моля въведете описание"></textarea>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Задължително" />
                        </span>
                    </p>

                    <p className="field">
                        <label htmlFor="category">Category</label>
                        <span className="input">
                            <select id="category" name="category">
                                <option value="cats">Cats</option>
                                <option value="dogs">Dogs</option>
                                <option value="parrots">Parrot</option>
                                <option value="horses">Horse</option>
                                <option value="other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input className={style.button} type="submit" value="Add Pet" />
                </fieldset>
            </form>
        </section>
    );
}

export default Create;