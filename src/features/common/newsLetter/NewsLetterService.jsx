import ApiService from "../../../services/ApiService";

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
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

  const NewsLetterService = {
    subscribe: async (email, gdpr_consent) => {
        const csrfToken = getCookie('csrftoken');
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