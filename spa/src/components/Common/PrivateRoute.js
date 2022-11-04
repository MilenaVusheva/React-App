import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({
    children
}) => {
    const { user } = useAuthContext();

    return user.username ? children : <Navigate to="/login" />
};

export default PrivateRoute;