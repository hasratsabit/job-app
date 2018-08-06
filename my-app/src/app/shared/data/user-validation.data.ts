export const userValidationData = {
    name: {
      required: 'The name field is required.',
      minlength: 'Name must be at least 2 characters.',
      maxlength: 'Name cannot exceed 30 characters.',
      pattern: 'Name must not contain special characters.'
    },
    username: {
      required: 'The username field is required.',
      minlength: 'Username must be at least 5 characters.',
      maxlength: 'Username cannot exceed 30 characters.',
      pattern: 'Username must not contain spaces and special characters.'
    },
    userCategory: {
      required: 'User category is required.'
    },
    companyName: {
      required: 'The company field is required.',
      minlength: 'Company name must be at least 3 characters.',
      maxlength: 'Company name cannot exceed 30 characters.',
      pattern: 'Company name must not contain spaces and special characters.'
    },
    companySize: {
      required: 'The company size is required.'
    },
    email: {
      required: 'The email field is required.',
      minlength: 'Email must be at least 3 characters.',
      maxlength: 'Email cannot exceed 30 characters.',
      pattern: 'Please provide a valid email address.',
    },
    confirmEmail: {
      required: 'Please confirm your email.'
    },
    password: {
      required: 'The Password field is required.',
      minlength: 'Password must be at least 8 characters.',
      maxlength: 'Password cannot exceed 30 characters.',
    },
    confirmPassword: {
      required: 'Please confirm your password.'
    }
  };