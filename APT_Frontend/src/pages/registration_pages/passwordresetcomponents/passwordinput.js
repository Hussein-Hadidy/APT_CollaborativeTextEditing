import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
/**
 *
 * @return {JSX.Element} Password input field
 */
function Passwordinput({onPasswordChange, width, showInvalidCredentials, labelText, emptypassword}) {
    const imageStyle = {
        position: 'absolute',
        zIndex: 1,
        right: '14px',
        top: '18px',
        height: '10px',
        width: '12px',
    };

    const checkImage = 'https://www.redditstatic.com/accountmanager/d489caa9704588f7b7e1d7e1ea7b38b8.svg';
    let passwordUrl = checkImage;

    const exclamImage = 'https://www.redditstatic.com/accountmanager/90a416eeb64d4d6ecd46c53d4ee11975.svg';

    const fieldStylesPassword = `mt-6 relative m-0 w-[${width}] border-[none] p-0`;

    const [password, setPassword] = useState('');

    const handleInputChangePassword = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        onPasswordChange(newPassword);
    };


    const [isFocusPassword, setIsFocusPassword] = React.useState(false);
    const [mouseOverPassword, setMouseOverPassword] = React.useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const inpClassPassword = `inputAnimation pointer-events-none absolute left-3 top-3.5 inline-block origin-[0_50%] 
    align-middle text-[10px] font-semibold uppercase leading-[23px] tracking-[0.5px] text-[#a5a4a4] 
    transition-all duration-[0.2s] ease-[ease-in-out]`;
    const animDot = `after:ml-[7px] after:inline-block
    after:align-top after:text-xl after:font-medium after:leading-6
    after:text-[#24a0ed] after:content-['•']`;
    let toPutPassword = inpClassPassword;
    if (isFocusPassword || mouseOverPassword || password.length !== 0) {
        toPutPassword = `${inpClassPassword}`;
    } else {
        toPutPassword = `${inpClassPassword} ${animDot}`;
    }

    let passwordBorderColor = '#e2e2e1'; // Default border color
    if ((password.length < 8 && password.length !== 0)||showInvalidCredentials || emptypassword) {
        passwordBorderColor = '#ea0027'; // Red border color when password is less than 8 characters
    } else if (password.length >= 8) {
        passwordBorderColor = '#1976d2'; // Blue border color when password is 8 or more characters
    }

    if (((password.length < 8)||showInvalidCredentials || emptypassword)) {
        passwordUrl = exclamImage;
    } else {
        passwordUrl = checkImage;
    }

    if ((password.length != 0)) {
        if (isVisiblePassword == false) {
            setIsVisiblePassword(true);
        }
    } else {
        if (isVisiblePassword == true) {
            setIsVisiblePassword(false);
        }
    }

    return (
        <fieldset className={fieldStylesPassword} id="registerPasswordField"
            data-testid="registerPasswordField"
        >
            <input
                id="regPassword-prevent3"
                className="h-12 w-full appearance-none rounded
                border border-solid bg-[#fcfcfb] px-3 pb-2.5 pr-9 pt-[22px]
                transition-all duration-[0.2s] ease-[ease-in-out] hover:bg-[#FFFFFF]"
                data-hidden=""
                type="password"
                name="password-prevent"
                data-empty="true"
                value={password}
                onChange={handleInputChangePassword}
                onFocus={() => setIsFocusPassword(true)}
                onBlur={() => {
                    setIsFocusPassword(false); setMouseOverPassword(false);
                }}
                onMouseOver={() => !isFocusPassword && setMouseOverPassword(true)}
                onMouseLeave={() => !isFocusPassword && setMouseOverPassword(false)}
                style={{borderColor: passwordBorderColor, outline: 'none'}}
                data-testid="regPassword80"
            />
            {isVisiblePassword && <img src={passwordUrl} alt="Image" style={imageStyle}
                data-testid="passwordImage15"
            />}
            <label className={toPutPassword}
                data-empty={isFocusPassword || mouseOverPassword || password.length !== 0 ? 'false' : 'true'}
                htmlFor="regPassword"
                data-testid="regPasswordLabel200"
            >{labelText}</label>

            <div className="mt-1 max-h-[1000px] text-xs font-medium leading-4
                        text-[#ea0027] opacity-100 transition-all
                        duration-[0.2s] ease-[ease-in-out]" data-for="password"
            data-testid="passwordmessage500"
            >
                {(((password.length < 8) && (password.length != 0)) ||emptypassword )&& (
                    <>Password must be at least 8 characters long</>
                )}

            </div>
        </fieldset>

    );
}

Passwordinput.propTypes = {
    onPasswordChange: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    showInvalidCredentials: PropTypes.bool.isRequired,
    labelText: PropTypes.string.isRequired,
    emptypassword: PropTypes.bool,
};

export {Passwordinput};
