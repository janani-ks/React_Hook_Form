import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";
import data from "./list";
import Dynamic from "./Dynamic";
import Gender from './Gender';
import '../App.css';
import CheckBox from './CheckBox';
const Form = () => {
    const [datac, setDatac] = useState([{ Name: "", Relation_type: "" }])
    const [selectValue, setSelectValue] = useState([]);
    var arr = [];
    const [checkbox, setcheckbox] = useState([
        {
            id: 1,
            name: "Tamil",
            check: false,
        },
        {
            id: 2,
            name: "English",
            check: false,
        },
        {
            id: 3,
            name: "Hindi",
            check: false,
        },
        {
            id: 4,
            name: "Telugu",
            check: false,
        }
    ]);
    const info = [
        { Skill: "C", id: 1 },
        { Skill: "C++", id: 2 },
        { Skill: "Java", id: 3 },
        { Skill: "Python", id: 4 },
        { Skill: "React JS", id: 5 },
    ]
    const [list] = useState(data);
    const { register, handleSubmit, formState: { errors }, getValues, reset, setValue, trigger, clearErrors } = useForm();
    const [userInfo, setuserInfo] = useState();
    const onSubmit = (data) => {
        setuserInfo(data);
        console.log(data);
        setSelectValue([])
        setDatac([{ Name: "", Relation_type: "" }])
        reset();
    }
    const check = (mail) => {
        let flag = false;
        list.forEach(myfunction);
        function myfunction(item) {
            if (item.email === mail)
                flag = true;
        }
        return flag;
    }
    useEffect(() => {
        setValue('hobbies', selectValue)
        setValue('Relations', datac)
        handleinterest();
        setValue('Interest', arr)
    });
    const handleChange = (values) => {
        setSelectValue(Array.isArray(values) ? values.map((x) => x.Skill) : [])
        clearErrors('hobbies')
    };
    const handleRemove = (values) => {
        setSelectValue(Array.isArray(values) ? values.map((x) => x.Skill) : [])
    }
    const handleinterest = () => {
        checkbox.forEach(myFunction);
        function myFunction(item) {
            var list = [{ Id: "", Name: "" }];
            var i = 0;
            if (item.check) {
                list[i].Id = item.id;
                list[i].Name = item.name;
                arr.push(list);
                i++;
            }
        }
    }
    return (
        <div>
            <pre className="content">{JSON.stringify(userInfo, undefined, 2)}</pre>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex_container'>
                    <div className='container'>
                        <h1>Registration</h1>
                        <div className='field'>
                            <label>Name</label>
                            <input type="text" name="name" className='input' placeholder="Enter your name" {...register("name", {
                                required: "Name is required",
                                pattern: { value: /^[a-zA-Z].{2,12}$/, message: "Enter a valid Name" },
                                onChange: () => { trigger("name") }
                            })}
                            ></input>
                            <div className="invalid_name">{errors.name?.message}</div>
                        </div>
                        <Gender register={{
                            ...register('gender', {
                                required: "Gender is required"
                            })
                        }} errorMessages={errors.gender?.message} />
                        <div className='field1'>
                            <label>Skills</label>
                            <Multiselect options={info}
                                value={info.filter((obj) => selectValue.includes(obj.Skill))}
                                displayValue="Skill"
                                onSelect={handleChange}
                                onRemove={handleRemove}
                                hidePlaceholder={true}
                                closeIcon={"close"}
                                register={{ ...register('hobbies', { required: "Skill is required" }) }}
                                className='dropdown' />
                            <div className="invalid_skill">{errors.hobbies?.message}</div>
                        </div>
                        <div className='field'>
                            <label>Relations</label>
                            <Dynamic datac={datac} setDatac={setDatac} register={{ ...register('Relations', { required: "This field is required" }) }} errorMessages={errors.Relations?.message} />
                        </div>
                    </div>
                    <div className='div_container'>
                        <CheckBox checkbox={checkbox} setcheckbox={setcheckbox} register={{
                            ...register('Interest', {
                                required: "Interest is required",
                            })
                        }} clearErrors={clearErrors} trigger={trigger} errorMessages={errors.Interest?.message} />
                        <div className='field'>
                            <label>Username</label>
                            <input type="text" name="username" className='input' placeholder="Enter username" {...register("username", {
                                required: "Username is required",
                                pattern: { value: /^[a-zA-Z._].{4,12}$/, message: "Enter a valid username" },
                                onChange: () => { trigger("username") }
                            })}
                            ></input>
                            <div className="invalid_username">{errors.username?.message}</div>
                        </div>
                        <div className='field'>
                            <label>Email</label>
                            <input type="text" name="email" className='input' placeholder="Enter emailid" {...register("email", {
                                required: "email-id is required",
                                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i, message: "This is not a valid email" },
                                validate: (value) => {
                                    let flag = false;
                                    flag = check(value);
                                    return flag === false || "This email is is already exists";
                                },
                                onChange: () => { trigger("email") }
                            })}
                            ></input>
                            <div className="invalid_email">{errors.email?.message}</div>
                        </div>
                        <div className='field'>
                            <label>Password</label>
                            <input type="text" className='input' name="password" placeholder="Enter password" {...register("password", {
                                required: "password is required",
                                pattern: {
                                    value: /(?=.*[0-9])+(?=.*[a-z])+(?=.*[A-Z])+(?=.*[*.!@$%^&]).{8,32}$/,
                                    message: "Password should contain atleast 1 upper character,1 lower character,1 special character,1 digit and" +
                                        "\nlength should be lesser than 32 and greater than 8"
                                },
                                onChange: () => { trigger("password") }
                            })}
                            ></input>
                            <div className="invalid_pwd">{errors.password?.message}</div>
                        </div>
                        <div className='field'>
                            <label>Re-enter Password</label>
                            <input type="text" className='input' name="confirm_pwd" placeholder="Re-enter password" {...register("confirm_pwd", {
                                required: "Re-enter password is required",
                                validate: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Confirm password didn't match";
                                },
                                onChange: () => { trigger("confirm_pwd") }
                            })}
                            ></input>
                            <div className="invalid_cpwd">{errors.confirm_pwd?.message}</div>
                        </div>
                        <div>
                            <button type='submit' className='btn' >SignUp</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;