import styles from "./TravelerRegistration.module.css";
import Header from "../../components/layouts/Header";
import EmailConfirmation from "../../components/popup/EmailConfirmation/EmailConfirmation";
import Modal from "../../components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, closeEmailConfirmationPopup } from "../../features/popup/PopupSlice";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../features/authentication/AuthActions";
const EmailConfirmationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const { isOpen, emailConfirmation } = useSelector((state) => state.popup);
    console.log(emailConfirmation, 'emailConfirmation')

    const handleConfirmationClose = () => {
        dispatch(closePopup());
        dispatch(closeEmailConfirmationPopup());
        navigate('/register');

    };
    const handleResendEmail = () => {
        console.log('resend')
    };

    useEffect(() => {
        if (email) {
            dispatch(verifyEmail(email));
        }
        return () => {
            dispatch(closePopup());
            dispatch(closeEmailConfirmationPopup());
        }

    }, [email, isOpen, emailConfirmation]);

    return (
        <div className={`${styles.registrationPage} ${styles.authPage}`}>
            <Header />
            {isOpen && emailConfirmation.isConfirmPopupOpen && emailConfirmation.email && (
                <Modal onClose={handleConfirmationClose} customClass="modalMd">
                    <EmailConfirmation
                        email={emailConfirmation.email}
                        onClose={handleConfirmationClose}
                        onResend={handleResendEmail}
                    />
                </Modal>
            )}
        </div>
    );
};

export default EmailConfirmationPage;