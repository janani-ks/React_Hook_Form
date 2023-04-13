import "./dynamic.css"
let Gender = (props) => {
    return (
        <div className="field">
                <label >
                    Gender
                    <div >
                        <label htmlFor="gender" className='gender_names' ><input type="radio" name='gender' {...props.register} value={'male'} /> Male </label>
                        <label htmlFor="gender" className='gender_names' ><input type="radio" name='gender' {...props.register} value={'female'} /> Female </label>
                        <label htmlFor="gender" className='gender_names' ><input type="radio" name='gender' {...props.register} value={'others'} /> Others </label>
                    </div>
                </label>
            <div className="invalid_gender">{props.errorMessages}</div>
        </div>

    )
}
export default Gender;