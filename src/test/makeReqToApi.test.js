import makeReqToApi from '../lib/makeReqToApi.js'

test("test valid response for tickets", async () => {
  const url = "http://localhost:9292/tickets_list/page/1"
  const res = await makeReqToApi(url)
  expect("tickets" in res).toBe(true)
})

test("test valid response for single ticket details", async () => {
  const url = "http://localhost:9292/ticket/1"
  const res = await makeReqToApi(url)
  expect("ticket" in res).toBe(true)
})