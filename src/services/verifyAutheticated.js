export default function verifiyAutheticated() {
  if (!sessionStorage.getItem('token')) {
    window.location = '/';
  }
}
