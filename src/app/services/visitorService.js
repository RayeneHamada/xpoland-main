// visitorService.js

import apiClient from "./apiClient";

const participateFreely = async (visitorData) => {
  try {
    const response = await apiClient.post(
      "/visitor/participate/free",
      visitorData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const participatePaied = async (visitorData) => {
  try {
    const response = await apiClient.post(
      "/visitor/participate/paied",
      visitorData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export { participateFreely, participatePaied };
