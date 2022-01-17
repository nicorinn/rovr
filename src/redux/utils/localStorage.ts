import { RootState } from '../store';

/**
 * Save likes to localStorage
 * @param state Application state
 */
export function saveLikes(state: RootState) {
  try {
    const stringifiedLikes = JSON.stringify(state.likes);
    localStorage.setItem('likes', stringifiedLikes);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Load likes from localStorage, if present
 * @returns Likes loaded from localStorage or empty object
 */
export function loadLikes() {
  try {
    const stringifiedLikes = localStorage.getItem('likes');
    return stringifiedLikes ? JSON.parse(stringifiedLikes) : {};
  } catch (err) {
    console.error(err);
    return {};
  }
}
