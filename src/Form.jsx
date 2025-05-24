import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countryCityMap } from "./data";

export default function Form() {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value, data = formData) => {
    const updatedErrors = { ...errors };

    switch (name) {
      case "firstName":
        updatedErrors.firstName = value.trim() ? "" : "First Name is required";
        break;
      case "lastName":
        updatedErrors.lastName = value.trim() ? "" : "Last Name is required";
        break;
      case "username":
        updatedErrors.username = value.trim() ? "" : "Username is required";
        break;
      case "email":
        updatedErrors.email = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email";
        break;
      case "password":
        updatedErrors.password = value.length >= 6 ? "" : "Min 6 characters";
        break;
      case "phoneCode":
      case "phoneNumber":
        updatedErrors.phone =
          data.phoneCode.trim() && data.phoneNumber.trim()
            ? ""
            : "Phone number is required";
        break;
      case "country":
        updatedErrors.country = value ? "" : "Select a country";
        break;
      case "city":
        updatedErrors.city = value ? "" : "Select a city";
        break;
      case "pan":
        updatedErrors.pan = value.trim() ? "" : "PAN number is required";
        break;
      case "aadhar":
        updatedErrors.aadhar =
          value.length === 12 ? "" : "Aadhar must be 12 digits";
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      validateField(name, value, updated);
      return updated;
    });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password.length >= 6 &&
      formData.phoneCode &&
      formData.phoneNumber &&
      formData.country &&
      formData.city &&
      formData.pan &&
      formData.aadhar.length === 12 &&
      Object.values(errors).every((e) => !e)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    if (isFormValid()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={`input ${errors.firstName ? "border-red-500" : ""}`}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={`input ${errors.lastName ? "border-red-500" : ""}`}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={`input ${errors.username ? "border-red-500" : ""}`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className={`input ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`input pr-12 ${errors.password ? "border-red-500" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-2 text-sm text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            name="phoneCode"
            placeholder="Code"
            value={formData.phoneCode}
            onChange={handleChange}
            className={`w-1/3 input ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-2/3 input ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`input ${errors.country ? "border-red-500" : ""}`}
        >
          <option value="">Select Country</option>
          {Object.keys(countryCityMap).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country}</p>
        )}

        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={`input ${errors.city ? "border-red-500" : ""}`}
        >
          <option value="">Select City</option>
          {(countryCityMap[formData.country] || []).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city}</p>
        )}

        <input
          type="text"
          name="pan"
          placeholder="PAN Number"
          value={formData.pan}
          onChange={handleChange}
          className={`input ${errors.pan ? "border-red-500" : ""}`}
        />
        {errors.pan && (
          <p className="text-red-500 text-sm">{errors.pan}</p>
        )}

        <input
          type="text"
          name="aadhar"
          placeholder="Aadhar Number"
          value={formData.aadhar}
          onChange={handleChange}
          className={`input ${errors.aadhar ? "border-red-500" : ""}`}
        />
        {errors.aadhar && (
          <p className="text-red-500 text-sm">{errors.aadhar}</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
