class DriventHelper {
  getResponse(error) {
    if (!error.response || !error.response.status) {
      throw error;
    }

    return {
      status: error.response.status
    };
  }
}

export { DriventHelper };
