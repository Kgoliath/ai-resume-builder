// frontend/src/utils/storage.js
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const saveFeedback = (feedbackData) => {
  const existingFeedback = loadData('aiFeedback') || [];
  const newFeedback = [...existingFeedback, { ...feedbackData, timestamp: new Date().toISOString() }];
  saveData('aiFeedback', newFeedback);
};

export const loadFeedback = () => {
  return loadData('aiFeedback') || [];
};