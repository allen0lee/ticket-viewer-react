export default function makeReqToApi(url) {
  return fetch(url).then(res => res.json())
}