const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

class ApiError extends Error {
  constructor({ error = {}, response = {}, responseBody }) {
    super(error);

    this.status = response.status;
    this.statusText = response.statusText;

    if (responseBody) {
      this.message = `Request failed with status ${this.status}: ${this.statusText}.\n\nError:\n${JSON.stringify(responseBody)}`;
    } else if (response) {
      this.message = `Request failed with status ${this.status}: ${this.statusText}.`;
    } else {
      this.message = error.message;
    }
  }
}

const rest = {
  get(url, fullResponse) {
    return rest.request(url, 'GET', null, null, fullResponse);
  },

  post(url, body, headers) {
    return rest.request(url, 'POST', body, headers);
  },

  put(url, body, headers) {
    return rest.request(url, 'PUT', body, headers);
  },

  delete(url) {
    return rest.request(url, 'DELETE');
  },

  async request(url, method, body, headers, fullResponse = false) {
    const options = { method };

    if (headers) options.headers = { ...DEFAULT_HEADERS, ...headers };
    else options.headers = DEFAULT_HEADERS;

    if (body) options.body = JSON.stringify(body);

    let response;

    try {
      response = await fetch(url, options);
    } catch (e) {
      throw new ApiError({ error: e });
    }

    const responseBody = await response.json();

    if (!response.ok) {
      throw new ApiError({
        response,
        responseBody,
        error: new Error(),
      });
    }

    return fullResponse ? {
      body: responseBody,
      headers: response.headers,
      status: response.status,
    } : responseBody;
  },
};


export default rest;
