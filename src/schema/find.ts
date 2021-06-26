import { object, string } from 'yup'

const findSchema = object({
  params: object({
    id: string().required()
  })
})

export default findSchema
