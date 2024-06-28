import { Outlet, Link } from "react-router-dom";
import { Fragment } from 'react';
import { ReactComponent as CrownIcon } from '../../assets/crown.svg'; // Adjusted SVG component name to start with a capital letter
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">


                <Link className="nav-link" to='/'>
                    <div className="logo-container">
                        <CrownIcon /> {/* Using the imported SVG component */}
                    </div>
                </Link>


                <div className="nav-link-container">

                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>

                    <Link className="nav-link" to='/SignIn'>
                        Sign-In
                    </Link>

                </div>


            </div>
            <Outlet /> {/* Outlet for rendering nested routes */}
        </Fragment>
    );
};

export default Navigation;
