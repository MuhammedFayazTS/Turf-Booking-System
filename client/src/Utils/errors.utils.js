export const parseHtmlError = (htmlResponse) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlResponse, 'text/html');
  const errorText = htmlDoc.querySelector('pre')?.innerHTML || 'An error occurred';

  // Split by <br> and take the first part
  const cleanErrorMessage = errorText.split('<br>')[0].trim();

  return cleanErrorMessage;
};
