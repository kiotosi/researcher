const routeInfo = {
  home: {
    name: 'Home',
    path: '/',
  },
  info: {
    name: "Info",
    path: '/info'
  },
  link: {
    name: 'Link',
    path: '/link',
  },
  book: {
    name: 'Book',
    path: '/book',
  },
  video: {
    name: 'Video',
    path: '/video',
  },
  note: {
    name: 'Notes',
    path: '/note',
  },
  settings: {
    name: 'Settings',
    path: '/settings',
  },
};

// Paths, that doesn't require tag list or hiding navigation list
export const ADDITIONAL_PATHS = [
  routeInfo.home.path,
  routeInfo.info.path
]

export default routeInfo;