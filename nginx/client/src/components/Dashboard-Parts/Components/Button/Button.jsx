import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ variant, text, onClick, type="button"}) => {
    const [className, setClassName] = useState(styles.button);

    useEffect(() => {
        if (variant == "remove"){
            console.log("useEffect = remove");
            setClassName(styles.remove);
        }

        if(variant == "form"){
            setClassName(styles.form);
        }

        if(variant == "cancel"){
            setClassName(styles.cancel)
        }
    }, []);

    return (
        <button onClick={onClick} type={type} className={className}>
            {text}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(["remove", "form"]),
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;