import crypto from 'crypto';

export const generateDefaultPassword = (length = 12): string => {
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  let password = '';
  while (password.length < length) {
    const char = crypto.randomBytes(1).toString('ascii');
    if (/[a-zA-Z0-9]/.test(char) || specialChars.includes(char)) {
      password += char;
    }
  }

  return password;
};
