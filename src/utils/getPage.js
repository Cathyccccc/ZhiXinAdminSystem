export default function(pathname) {
  return pathname.includes('/users') ? 'Login' : 'Default'
}