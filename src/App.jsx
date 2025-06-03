import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './App.css'
import { use } from 'react'

// Zod validation schema
const schema = z.object({
  name: z.string().nonempty('Name is required'),
  age: z.number({invalid_type_error: 'Age must be a number'}).positive('Age must be positive').int('Age must be an integer'),
  email: z.string().email('Invalid email address'),
})

function App() {
  const { register, handleSubmit, formState: {errors},} = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="zod-form-app" >
      <h2>User Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        { /* Name */}
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`form-input ${errors.username ? "form-input-error" : ""}`}/>
            {errors.username && (
              <p className="error-text">{errors.username.message}</p>)}
        </div>

        {/* Age */}
        <div className="form-group">
          <label className="form-label">Age:</label>
          <input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className={`form-input ${errors.age ? "form-input-error" : ""}`}/>
            {errors.age && (
              <p className="error-text">{errors.age.message}</p>)}
          </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`form-input ${errors.email? "form-input-error" : ""}`}/>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>)}
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>

      </form>
    </div>

  );
}

export default App
