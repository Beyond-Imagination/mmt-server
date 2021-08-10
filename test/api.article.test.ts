import axios from 'axios'

const BASE_URL = 'http://localhost:3005'
describe('api/articles', () => {
  test('GET All', async () => {
    const { data } = await axios.get(`${BASE_URL}/api/articles/`)
    expect(data)
      .toStrictEqual({
        status: 200,
        success: true,
        message: 'success',
        result: []
      })
  })
})
