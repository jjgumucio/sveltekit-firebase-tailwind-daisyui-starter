import * as yup from 'yup'

export const validationSchema = yup.object({
  testInput: yup.string().min(3).max(12).required(),
  testSelect: yup.string().required(),
  testFile: yup.mixed()
})