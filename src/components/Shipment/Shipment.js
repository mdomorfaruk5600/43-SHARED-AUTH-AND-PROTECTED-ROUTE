import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from "react-hook-form";
import { UserContext } from './../../App';

const Shipment = () => {
    const {
        register,
        handleSubmit,
        formState,
      } = useForm();
      const {errors}  = formState;
      const [loggedInUser] = useContext(UserContext); 
    console.log(errors);
      const onSubmit = (data) => console.log('data',data)
      return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder='Your Name'/>
          {errors.name && <span className='error'>Name is required</span>}
          <input {...register("email", { required: true })} defaultValue={loggedInUser.email}  placeholder='Your Email'/>
          {errors.email && <span className='error'>Email is required</span>}
          <input {...register("address", { required: true })} placeholder='Your Address'/>
          {errors.address && <span className='error'>Address is required</span>}
          <input {...register("phone", { required: true })} placeholder='Your Phone Number'/>
          {errors.phone && <span className='error'>Phone Number is required</span>}
          <input type="submit" />
        </form>
      )
};

export default Shipment;