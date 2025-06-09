import ApiService from "../../../services/ApiService";
import Cookies from "js-cookie";

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      console.log(cookies, 'cookies');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  console.log('Native document.cookie:', document.cookie);


console.log('Cookies.get():', Cookies.get());
console.log('Cookies.get("csrftoken"):', Cookies.get('csrftoken'));
console.log('Cookies.get("csrftoken", { path: "/" }):', Cookies.get('csrftoken', { path: '/' }));

function getCookieValue(name) {
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    const [key, value] = c.trim().split('=');
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}
console.log('Manual getCookieValue:', getCookieValue('csrftoken'));


  const NewsLetterService = {
    subscribe: async (email, gdpr_consent) => {
        const csrfToken = Cookies.get('csrftoken');
        console.log('CSRF Token:', csrfToken);
        console.log(Cookies.get(), 'Cookies');
        console.log('document.cookie:', document.cookie);

        return ApiService.post("/newsletter/subscribe/", 
          { email, gdpr_consent },
          {
            headers: {
              'X-CSRFToken': csrfToken,
            }
          }
        );
    },
};

export default NewsLetterService;