interface Route {
  name: string,
  path: string
}

export default {
  home: {
    name: 'Home',
    path: '/'
  } as Route,
  link: {
    name: 'Link',
    path: '/link'
  } as Route,
  book: {
    name: 'Book',
    path: '/book'
  } as Route,
  video: {
    name: 'Video',
    path: '/video'
  } as Route,
  note: {
    name: 'Notes',
    path: '/note'
  } as Route,
  settings: {
    name: 'Settings',
    path: '/settings'
  } as Route
}