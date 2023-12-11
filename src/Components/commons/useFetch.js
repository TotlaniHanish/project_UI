import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = async (method, url, body, successCallback, errorCallback, makeCall) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (makeCall) {
      
        fetch('http://localhost:8095' + `${url}`, getRequestInit(method, body))
        .then((response) => {
          if ([200, 201].includes(response.status)) {
            return response.json().then((data) => ({ data, status: response.status }));
          } else {
            return Promise.resolve({ data: null, status: response.status });
          }
        }).then(({data, status}) => {
          if ([200, 201].includes(status))
            successCallback(data);
          else {
            if ([401,403].includes(status)) {
              console.log('error');
            }
            if (errorCallback)
              errorCallback();
            }
        })
      } 
  }, [url, makeCall, body]);
};

function getRequestInit(method, body) {
  const headers = getHeaders();
  if (method == "GET") {
    return {
      method,
      headers
    }
  } else {
    return {
      method,
      headers,
      body: JSON.stringify(body),
    }
  }
}

function getAuthorization() {
  const token = sessionStorage.getItem("auth");
  if (token) return "Bearer " + token;
  return null;
}

function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  };
  const auth = getAuthorization();
  if (auth) headers["Authorization"] = auth;
  return headers;
}

export default useFetch;
