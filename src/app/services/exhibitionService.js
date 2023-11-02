// exhibitionService.js

import apiClient from './apiClient';

const getExhibitionForVisitor = async (id) => {
  try {
    const response = await apiClient.get(`/exhibition/getExhibitionForVisitor/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export { getExhibitionForVisitor };
