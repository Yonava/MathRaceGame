import bannedWords from '../assets/filteredWords.js'

export default function validateUsername(username) {

  let errorMessage = '';
  const maxChars = 10
  const minChars = 4

  if (!username) 
    return errorMessage = 'Enter A Username';

  if (username.length < minChars)
    return errorMessage = `Username Is Too Short: Min ${minChars}`;

  if (username.length > maxChars) {
    return errorMessage = `Username Is Too Long: Max ${maxChars}`;
  }

  if (username.includes(' ')) {
    return errorMessage = 'Username May Not Include Spaces'
  }

  for (let i in bannedWords) {
    if (username.toLowerCase().includes(bannedWords[i])) return errorMessage = `Username Violates Our Community Guidelines: '${bannedWords[i]}'`;
  }

  const dreamStan = ['innit', 'dream', 'dream smp',
  'notfound', 'georgenotfound', 'badboyhalo'];
  
  for (let i in dreamStan) {
    if (username.toLowerCase().includes(dreamStan[i])) return errorMessage = 'Get Out You Filthy Dream Stan!';
  }

  return errorMessage;
}