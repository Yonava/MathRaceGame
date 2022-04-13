
export default function validatePassword(password) {


  let errorMessage = '';
  const minChars = 6;

  if (!password) {
    return errorMessage = '';
  }

  if (password.length < minChars) {
    return errorMessage = `Password Lacks Length: Minimum Length is ${minChars}`;
  }

  if (password.match(/[0-9]/) === null) {
    return errorMessage = 'Password Lacks Numbers';
  }

  if (password.match(/[A-Za-z]/) === null) {
    return errorMessage = 'Password Lacks Letters';
  }
  // \w - alphanumeric
  // \W - anything NOT alphanumeric

  if (password.includes(' ')) {
    return errorMessage = 'Password May Not Include Spaces';
  }
  
  return errorMessage;
}