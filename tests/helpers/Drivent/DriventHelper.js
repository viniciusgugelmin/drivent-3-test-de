class DriventHelper {
  getResponse(error) {
    if (!error.response || !error.response.status || !error.response.data) {
      throw error;
    }

    return {
      status: error.response.status,
      data: error.response.data
    };
  }
}

export { DriventHelper };
