import { prisma } from '../../lib/prisma'

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findFirst()
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }
  return {
    user
  }
})
