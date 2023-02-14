import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const isNotEmpty = value => value.trim() !== '';
const isPostalCode = value => {
    return value.trim().length === 6 && Number.isInteger((Number)(value))
}

const Checkout = props => {

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: enteredNameChangeHandler,
        inputBlurHandler: enteredNameBlurHandler,
        reset: enteredNameReset,
    } = useInput(isNotEmpty);

    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: enteredStreetHasError,
        valueChangeHandler: enteredStreetChangeHandler,
        inputBlurHandler: enteredStreetBlurHandler,
        reset: enteredStreetReset,
    } = useInput(isNotEmpty);

    const {
        value: enteredPostalCode,
        isValid: enteredPostalCodeIsValid,
        hasError: enteredPostalCodeHasError,
        valueChangeHandler: enteredPostalCodeChangeHandler,
        inputBlurHandler: enteredPostalCodeBlurHandler,
        reset: enteredPostalCodeReset,
    } = useInput(isPostalCode);

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: enteredCityHasError,
        valueChangeHandler: enteredCityChangeHandler,
        inputBlurHandler: enteredCityBlurHandler,
        reset: enteredCityReset,
    } = useInput(isNotEmpty);

    let formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

    const confirmHandler = event => {
        event.preventDefault();

        if (!enteredNameIsValid || !enteredStreetIsValid || !enteredPostalCodeIsValid || !enteredCityIsValid) {
            formIsValid = false;
            return;
        }

        // Submit the cart data.
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        });

        enteredNameReset();
        enteredStreetReset();
        enteredPostalCodeReset();
        enteredCityReset();
    }

    const nameInputClasses = `${classes.control} ${!enteredNameHasError ? '' : classes.invalid}`;
    const streetInputClasses = `${classes.control} ${!enteredStreetHasError ? '' : classes.invalid}`;
    const postalCodeInputClasses = `${classes.control} ${!enteredPostalCodeHasError ? '' : classes.invalid}`;
    const cityInputClasses = `${classes.control} ${!enteredCityHasError ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={enteredName}
                    onChange={enteredNameChangeHandler}
                    onBlur={enteredNameBlurHandler}
                />
                {enteredNameHasError && <p>Please enter a valid name.</p>}
            </div>

            <div className={streetInputClasses}>
                <label htmlFor='street'>Address</label>
                <input
                    type='text'
                    id='street'
                    value={enteredStreet}
                    onChange={enteredStreetChangeHandler}
                    onBlur={enteredStreetBlurHandler}
                />
                {enteredStreetHasError && <p>Please enter a valid Address.</p>}
            </div>

            <div className={postalCodeInputClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    type='text'
                    id='postal'
                    value={enteredPostalCode}
                    onChange={enteredPostalCodeChangeHandler}
                    onBlur={enteredPostalCodeBlurHandler}
                />
                {enteredPostalCodeHasError && <p>Please enter a valid Postal code (6-char).</p>}
            </div>

            <div className={cityInputClasses}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    id='city'
                    value={enteredCity}
                    onChange={enteredCityChangeHandler}
                    onBlur={enteredCityBlurHandler}
                />
                {enteredCityHasError && <p>Please enter a valid City.</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
};

export default Checkout