import { writable } from "svelte/store";

const meetups = writable([]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,

  addMeetup: (meetup) => {
    meetups.update((meetups) => [meetup, ...meetups]);
  },

  updateMeetup: (id, isFavorite, meetup) => {
    meetups.update((mtps) =>
      mtps.map((m) => (m.id !== id ? m : { id, isFavorite, ...meetup }))
    );
  },

  deleteMeetup: (id) => {
    meetups.update((mtps) => mtps.filter((m) => m.id !== id && m));
  },

  toggleFavorite: (id) => {
    meetups.update((mtps) =>
      mtps.map((m) => (m.id !== id ? m : { ...m, isFavorite: !m.isFavorite }))
    );
  },

  setMeetups: meetups.set,
};
export default customMeetupsStore;
