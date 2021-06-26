import crypto from 'crypto'
import { test } from 'uvu'
import { equal, instance } from 'uvu/assert'
import axios from 'axios'

const fnText = () => {
  return crypto.randomBytes(12).toString('hex')
}

test('GET USERS', async () => {
  const { data, status } = await axios.get('http://localhost:3333')
  instance(data.users, Array)
  equal(status, 200)
})

test('CREATE USER', async () => {
  const obj = {
    name: fnText()
  }
  const { data, status } = await axios.post('http://localhost:3333', obj, { headers: { 'Content-Type': 'application/json' } })
  equal(data.user.name, obj.name)
  equal(status, 201)
})

test('FAIL TO FIND USER', async () => {
  try {
    await axios.get(`http://localhost:3333/${fnText()}`)
  } catch ({ response: res }) {
    equal(res.status, 500)
  }
})

test('UPDATE USER', async () => {
  const res = await axios.get('http://localhost:3333')
  const obj = res.data.users[0]
  obj.name = fnText()
  const { data, status } = await axios.put(`http://localhost:3333/${obj._id}`, obj, { headers: { 'Content-Type': 'application/json' } })
  equal(data.user.name, obj.name)
  equal(status, 200)
})

test.skip('DELETE USER', async () => {
  const res = await axios.get('http://localhost:3333')
  const userId = res.data.users[0]._id
  const { data, status } = await axios.delete(`http://localhost:3333/${userId}`)
  equal(data.user._id, userId)
  equal(status, 200)
})

test.run()
