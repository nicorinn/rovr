import { RootState } from '../store';
import { loadLikes, saveLikes } from './localStorage';

const testState: RootState = {
  likes: {},
  waypoints: [],
  images: { imageList: [], selectedIndex: 0 },
};
describe('saveLikes', () => {
  test('saves likes to localStorage', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    saveLikes(testState);

    expect(setItem).toBeCalledWith('likes', JSON.stringify(testState.likes));
  });
});

describe('loadLikes', () => {
  test('loads likes from localStorage', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem');

    const likes = loadLikes();

    expect(getItem).toBeCalledWith('likes');
    expect(likes).toStrictEqual(testState.likes);
  });
});
