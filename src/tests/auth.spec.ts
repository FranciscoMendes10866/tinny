import { test } from 'uvu'
import { equal, is, match } from 'uvu/assert'
import axios from 'axios'

let nodeKey = ''

test('Logged in - should set the cookie', async () => {
  const { data, status, headers } = await axios.get('http://localhost:3333/login')
  const cookie = headers['set-cookie'][0]
  equal(status, 200)
  equal(data, 'OK')
  match(cookie, 'node_key')
  nodeKey = cookie.split('=')[1].split(';')[0]
})

test('Protected route - should access the content', async () => {
  const { data, status } = await axios.get('http://localhost:3333/protected', { headers: { Cookie: [`node_key=${nodeKey}`] } })
  equal(data.message, 'Has access.')
  equal(status, 200)
})

test('Logout - should clear the cookie', async () => {
  const { data, status, headers } = await axios.get('http://localhost:3333/logout', { headers: { Cookie: [`node_key=${nodeKey}`] } })
  const responseCookie = headers['set-cookie'][0].split('=')[1].split(';')[0]
  equal(data, 'OK')
  equal(status, 200)
  is(responseCookie, '')
})

test('Logout (without cookie) - should get an error', async () => {
  try {
    await axios.get('http://localhost:3333/logout', { headers: { Cookie: ['node_key=""'] } })
  } catch ({ response: res }) {
    equal(res.status, 403)
  }
})

test.run()
