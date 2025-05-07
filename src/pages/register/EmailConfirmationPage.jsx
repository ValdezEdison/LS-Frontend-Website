import styles from "./TravelerRegistration.module.css";
import Header from "../../components/layouts/Header";
import EmailConfirmation from "../../components/popup/EmailConfirmation/EmailConfirmation";
import Modal from "../../components/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closePopup, closeEmailConfirmationPopup, openPopup } from "../../features/popup/PopupSlice";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail, resendVerificationMail } from "../../features/authentication/AuthActions";
import SuccessMessagePopup from "../../components/popup/SuccessMessage/SuccessMessagePopup";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const EmailConfirmationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { t } = useTranslation('Registration');
    
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const { isOpen, emailConfirmation } = useSelector((state) => state.popup);

    const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [successTitle, setSuccessTitle] = useState('');

    const handleConfirmationClose = () => {
        dispatch(closePopup());
        dispatch(closeEmailConfirmationPopup());
        navigate('/register');
    };

    const handleResendEmail = () => {
       dispatch(resendVerificationMail(emailConfirmation.email)).then((response) => {
        if (response.error) {
          toast.error(response.error.message || t('emailConfirmation.toast.resendError'));
        } else {
            toast.success(t('emailConfirmation.toast.resendSuccess'));
        }
       })
    };

    const handleCloseSuccessPopup = () => {
        setIsOpenSuccessPopup(false);
        dispatch(closePopup());
        navigate('/login'); // Moved here from the useEffect
    };

    //   useEffect(() => {
    //     let timer;
    //     if (isOpenSuccessPopup) {
    //       timer = setTimeout(() => {
    //         dispatch(closePopup());
    //         setIsOpenSuccessPopup(false);
    //         setSuccessMessage("");
    //         setSuccessTitle("");
    //       }, 15000); // 5 seconds in milliseconds
    //     //   navigate('/login');
    //     }
    
    //     // Clean up the timer when the component unmounts or when popupState.success changes
    //     return () => {
    //       if (timer) clearTimeout(timer);
    //     };
    //   }, [isOpenSuccessPopup]);

    useEffect(() => {
        if (email) {
            dispatch(verifyEmail(email))
                .then((response) => {
                    if (response.error) {
                        toast.error(response.error.message ||  t('emailConfirmation.toast.verifyError'));
                    } else {
                        setSuccessMessage(response.payload?.detail || t('emailConfirmation.success.message'));
                        setSuccessTitle(t('emailConfirmation.success.title'));
                        setIsOpenSuccessPopup(true);
                        dispatch(openPopup());
                    }
                })
                .catch((error) => {
                    toast.error(error.message || t('emailConfirmation.toast.genericError'));
                });
        }

        return () => {
            dispatch(closePopup());
            dispatch(closeEmailConfirmationPopup());

        };
    }, [email, dispatch, t]);

    if (isOpenSuccessPopup && isOpen) {
        return (
            <div className={`${styles.registrationPage} ${styles.authPage}`}>
                <Header />
                <Modal
                    title=""
                    onClose={handleCloseSuccessPopup}
                    customClass="modalSmTypeOne"
                    hideCloseButton={true}
                >
                    <SuccessMessagePopup
                        title={successTitle}
                        message={successMessage}
                        onClose={handleCloseSuccessPopup}
                    />
                </Modal>
            </div>
        );
    }

    return (
        <div className={`${styles.registrationPage} ${styles.authPage}`}>
            <Header />
            {isOpen && emailConfirmation?.isConfirmPopupOpen && emailConfirmation?.email && (
                <Modal 
                    onClose={handleConfirmationClose} 
                    customClass="modalMd"
                    title="" // Added empty title for consistency
                >
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