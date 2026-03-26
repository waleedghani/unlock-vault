// export const signUpValidation = (userData, setFormErrors) => {
//   let errors = {};
//   let isValid = true;
//   console.log("from signup", userData);
//   // Validate first name
//   if (!userData || !userData.fname) {
//     errors.fname = ["First name is required"];
//     isValid = false;
//   } else if (userData.fname.length > 15) {
//     errors.fname = ["First name must be under 15 characters"];
//     isValid = false;
//   }

//   // Validate last name
//   if (!userData || !userData.lname) {
//     errors.lname = ["Last name is required"];
//     isValid = false;
//   } else if (userData.lname.length > 15) {
//     errors.lname = ["Last name must be under 15 characters"];
//     isValid = false;
//   }

//   // Validate email
//   if (!userData || !userData.email) {
//     errors.email = ["Email is required"];
//     isValid = false;
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
//     errors.email = ["Invalid email format"];
//     isValid = false;
//   }

//   if (userData?.phone_number) {
//     // Check if the phone number format is valid
//     if (
//       !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test(
//         userData.phone_number
//       )
//     ) {
//       if (!errors.phone_number) errors.phone_number = [];
//       errors.phone_number.push("Phone number is not valid");
//       isValid = false;
//     }
//   }
//   // Validate password
//   if (!userData || !userData.password) {
//     errors.password = ["Password is required"];
//     isValid = false;
//   } else if (userData.password.length < 8 || userData.password.length > 20) {
//     errors.password = ["Password must be between 8 to 20 characters"];
//     isValid = false;
//   } else if (
//     !/[A-Z]/.test(userData.password) // At least one uppercase letter
//   ) {
//     errors.password = ["Password must include at least one uppercase letter"];
//     isValid = false;
//   } else if (
//     !/[a-z]/.test(userData.password) // At least one lowercase letter
//   ) {
//     errors.password = ["Password must include at least one lowercase letter"];
//     isValid = false;
//   } else if (
//     !/[0-9]/.test(userData.password) // At least one digit
//   ) {
//     errors.password = ["Password must include at least one number"];
//     isValid = false;
//   } else if (
//     !/[!@#$%^&*(),.?":{}|<>]/.test(userData.password) // At least one special character
//   ) {
//     errors.password = ["Password must include at least one special character"];
//     isValid = false;
//   }

//   // Validate confirm password
//   if (!userData || !userData.password_confirm) {
//     errors.password_confirm = ["Confirm password is required"];
//     isValid = false;
//   } else if (userData.password_confirm !== userData.password) {
//     errors.password_confirm = ["Passwords do not match"];
//     isValid = false;
//   }

//   // Set errors and return validation status
//   setFormErrors(errors);
//   return isValid;
// };

const validatePassword = (password, fieldName = "Password") => {
  let errors = [];

  if (!password) {
    errors.push(`${fieldName} is required`);
  } else {
    if (password.length < 6 || password.length > 20) {
      errors.push(`${fieldName} must be between 6 to 20 characters`);
    }
    if (!/\d/.test(password)) {
      errors.push(`${fieldName} must include at least one number`);
    }
  }

  return errors;
};

export const signUpValidation = (userData, setFormErrors) => {
  let errors = {};
  let isValid = true;

  // First Name
  if (!userData?.fname) {
    errors.fname = ["First name is required"];
    isValid = false;
  } else if (userData.fname.length > 15) {
    errors.fname = ["First name must be under 15 characters"];
    isValid = false;
  }

  // Last Name
  if (!userData?.lname) {
    errors.lname = ["Last name is required"];
    isValid = false;
  } else if (userData.lname.length > 15) {
    errors.lname = ["Last name must be under 15 characters"];
    isValid = false;
  }

  // Email
  if (!userData?.email) {
    errors.email = ["Email is required"];
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = ["Invalid email format"];
    isValid = false;
  }

  // Phone (optional)
  if (!userData?.phone_number) {
    errors.phone_number = ["Phone number is required"];
    isValid = false;
  } else if (
    !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test(
      userData.phone_number
    )
  ) {
    errors.phone_number = ["Phone number is not valid"];
    isValid = false;
  }

  // Password
  const passwordErrors = validatePassword(userData?.password, "Password");
  if (passwordErrors.length) {
    errors.password = passwordErrors;
    isValid = false;
  }

  // Confirm Password
  if (!userData?.password_confirm) {
    errors.password_confirm = ["Confirm password is required"];
    isValid = false;
  } else if (userData.password_confirm !== userData.password) {
    errors.password_confirm = ["Passwords do not match"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const signInValidation = (userData, setFormErrors) => {
  let isValid = true;
  let errors = {};

  if (!userData || !userData?.email) {
    if (!errors || !errors?.email) {
      if (!errors) errors = {};
      errors.email = [];
    }
    errors?.email?.push("Email is required");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData?.email)) {
    if (!errors || !errors?.email) {
      if (!errors) errors = {};
      errors.email = [];
    }
    errors?.email?.push("Invalid email format");
    isValid = false;
  }

  if (!userData || !userData?.password) {
    if (!errors || !errors?.password) {
      if (!errors) errors = {};
      errors.password = [];
    }
    errors?.password?.push("Password is required");
    isValid = false;
  } else if (
    userData?.password?.length < 0 ||
    userData?.password?.length > 20
  ) {
    if (!errors || !errors?.password) {
      if (!errors) errors = {};
      errors.password = [];
    }
    errors?.password?.push("Password must be between 7 to 20 characters");
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const checkEmailValidation = (email, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!email || !email) {
    errors.email = ["Email is required"];
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Invalid email format"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const VerifyOtpValidation = (otp, setFormErrors) => {
  let errors = {};
  let isValid = true;

  // Validate OTP
  if (!otp || !otp) {
    errors.otp = ["OTP is required"];
    isValid = false;
  } else if (!/^\d{6}$/.test(otp)) {
    errors.otp = ["OTP must be a 6-digit number"];
    isValid = false;
  }
  setFormErrors(errors);
  return isValid;
};

// export const PasswordValidation = (passwordState, setFormErrors) => {
//   let isValid = true;
//   let errors = {};

//   // Validate New Password
//   if (!passwordState?.password) {
//     errors.password = ["New password is required"];
//     isValid = false;
//   } else if (passwordState?.password.length < 8) {
//     errors.password = ["New password must be atleast 8 characters"];
//     isValid = false;
//   }

//   // Validate Confirm Password
//   if (!passwordState?.confirm_password) {
//     errors.confirm_password = ["Confirm password is required"];
//     isValid = false;
//   } else if (passwordState?.confirm_password !== passwordState?.password) {
//     errors.confirm_password = ["Confirm password must match the new password"];
//     isValid = false;
//   }

//   setFormErrors(errors);
//   return isValid;
// };

export const PasswordValidation = (passwordState, setFormErrors) => {
  let errors = {};
  let isValid = true;

  // New Password
  const passwordErrors = validatePassword(
    passwordState?.password,
    "New password"
  );
  if (passwordErrors.length) {
    errors.password = passwordErrors;
    isValid = false;
  }

  // Confirm Password
  if (!passwordState?.confirm_password) {
    errors.confirm_password = ["Confirm password is required"];
    isValid = false;
  } else if (passwordState?.confirm_password !== passwordState?.password) {
    errors.confirm_password = ["Confirm password must match the new password"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
export const UpdateProfileValidation = (userData, setFormErrors) => {
  let errors = {};
  let isValid = true;
  console.log(userData, "userData");

  // ✅ First name (only if provided)
  if (userData?.first_name) {
    if (userData.first_name.length > 15) {
      errors.first_name = ["First name must be under 15 characters"];
      isValid = false;
    }
  }

  // ✅ Last name (only if provided)
  if (userData?.last_name) {
    if (userData.last_name.length > 15) {
      errors.last_name = ["Last name must be under 15 characters"];
      isValid = false;
    }
  }

  // ✅ Email (only if provided)
  if (userData?.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = ["Invalid email format"];
      isValid = false;
    }
  }

  // ✅ Phone number (only if provided)
  if (userData?.phone_number) {
    // Check if the phone number format is valid
    if (
      !/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm.test(
        userData.phone_number
      )
    ) {
      if (!errors.phone_number) errors.phone_number = [];
      errors.phone_number.push("Phone number is not valid");
      isValid = false;
    }
  }

  setFormErrors(errors);
  return isValid;
};

// export const ChangePasswordValidation = (userData, setFormErrors) => {
//   let errors = {};
//   let isValid = true;
//   console.log(userData, "changePasswordData");

//   // ✅ Current password (required)
//   if (!userData?.current_password) {
//     errors.current_password = ["Current password is required"];
//     isValid = false;
//   }

//   // ✅ New password (required + length rules)
//   if (!userData?.new_password) {
//     errors.new_password = ["New password is required"];
//     isValid = false;
//   } else if (userData.new_password.length < 8) {
//     errors.new_password = ["New password must be at least 8 characters"];
//     isValid = false;
//   } else if (userData.new_password.length > 20) {
//     errors.new_password = [
//       "New password must not be greater than 20 characters",
//     ];
//     isValid = false;
//   }

//   // ✅ Confirm password (must match new password)
//   if (!userData?.new_password_confirmation) {
//     errors.new_password_confirmation = ["Password confirmation is required"];
//     isValid = false;
//   } else if (userData.new_password !== userData.new_password_confirmation) {
//     errors.new_password_confirmation = ["Passwords do not match"];
//     isValid = false;
//   }

//   setFormErrors(errors);
//   return isValid;
// };

export const ChangePasswordValidation = (userData, setFormErrors) => {
  let errors = {};
  let isValid = true;

  // Current Password
  if (!userData?.current_password) {
    errors.current_password = ["Current password is required"];
    isValid = false;
  }

  // New Password
  const passwordErrors = validatePassword(
    userData?.new_password,
    "New password"
  );
  if (passwordErrors.length) {
    errors.new_password = passwordErrors;
    isValid = false;
  }

  // Confirm Password
  if (!userData?.new_password_confirmation) {
    errors.new_password_confirmation = ["Password confirmation is required"];
    isValid = false;
  } else if (userData.new_password !== userData.new_password_confirmation) {
    errors.new_password_confirmation = ["Passwords do not match"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

// Wallet Address Validation
export const validateWalletAddress = (walletAddress, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!walletAddress) {
    errors.walletAddress = ["Wallet address is required"];
    isValid = false;
  } else if (walletAddress.length < 10) {
    errors.walletAddress = ["Wallet address must be at least 10 characters"];
    isValid = false;
  } else if (walletAddress.length > 50) {
    errors.walletAddress = ["Wallet address must not exceed 50 characters"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const contactValidation = (formState, setFormErrors) => {
  let isValid = true;
  let errors = {};

  // Validate First Name
  if (!formState?.first_name) {
    errors.first_name = ["First name is required"];
    isValid = false;
  }

  // Validate Last Name
  if (!formState?.last_name) {
    errors.last_name = ["Last name is required"];
    isValid = false;
  }

  // Validate Phone (must be exactly 10 digits)
  // Phone is optional → validate only if user enters something
  if (formState?.phone) {
    // If phone is not empty, apply validation rules
    if (!/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(formState.phone)) {
      errors.phone = [
        "Phone number must be exactly 10 digits or in XXX-XXX-XXXX format",
      ];
      isValid = false;
    }
  }

  // Validate Email (must be in correct format)
  if (!formState?.email) {
    errors.email = ["Email is required"];
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    errors.email = ["Enter a valid email address"];
    isValid = false;
  }

  // Validate Message
  if (!formState?.message) {
    errors.message = ["Message is required"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const newsletterValidation = (formState, setFormErrors) => {
  let isValid = true;
  let errors = {};

  // Validate Email (must be in correct format)
  if (!formState) {
    errors.email = ["Email is required"];
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState)) {
    errors.email = ["Enter a valid email address"];
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

export const vendorValidation = (formState, setFormErrors) => {
  let isValid = true;
  let errors = {};

  // ✅ Validate Name
  if (!formState?.name) {
    errors.name = ["Name is required"];
    isValid = false;
  }

  // ✅ Validate Email
  if (!formState?.email) {
    errors.email = ["Email is required"];
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    errors.email = ["Enter a valid email address"];
    isValid = false;
  }

  // ✅ Validate Phone (optional but formatted)
  if (formState?.phone_number) {
    if (!/^\d{3}-\d{3}-\d{4}$/.test(formState.phone_number)) {
      errors.phone_number = ["Phone number must be in XXX-XXX-XXXX format"];
      isValid = false;
    }
  }

  setFormErrors(errors);
  return isValid;
};
