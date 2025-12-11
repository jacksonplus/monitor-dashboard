import { prisma } from '../lib/prisma'

async function main() {
  // Example: Fetch all records from a table
  // Replace 'user' with your actual model name
  const allUsers = await prisma.user.findMany()
  console.log('All users:', JSON.stringify(allUsers, null, 2))
  
  // Add example: Create a new record
  const newUser = await prisma.user.create({
    data: {
      email: 'newuser@example.com',
      name: 'New User',
    },
  })
  console.log('Created user:', JSON.stringify(newUser, null, 2))
  // const getUsers = await prisma.user.findMany()
  // console.log('All users:', JSON.stringify(getUsers, null, 2))

  // Add example: Update a record
  // const updatedUser = await prisma.user.update({
  //   where: { id: 1 },
  //   data: { name: 'Updated User' },
  // })
  // console.log('Updated user:', JSON.stringify(updatedUser, null, 2))
  // const getUsers = await prisma.user.findMany()
  // console.log('All users:', JSON.stringify(getUsers, null, 2))

  // Add example: find a record
  // const user = await prisma.user.findUnique({
  //   where: { id: 1 },
  // })
  // console.log('User:', JSON.stringify(user, null, 2))

  // Add example: find a record by email
  // const userByEmail = await prisma.user.findUnique({
  //   where: { email: 'newuser@example.com' },
  // })
  // console.log('User by email:', JSON.stringify(userByEmail, null, 2))
  
  // Add example: find a record by email and include posts
  // const userByEmailWithPosts = await prisma.user.findUnique({
  //   where: { email: 'newuser@example.com' },
  //   include: { Post: true },
  // })
  // console.log('User by email with posts:', JSON.stringify(userByEmailWithPosts, null, 2))

  // Delete example: delete a record
  // const deletedUser = await prisma.user.delete({
  //   where: { id: 1 },
  // })
  // console.log('Deleted user:', JSON.stringify(deletedUser, null, 2))
  // const getUsers = await prisma.user.findMany()
  // console.log('All users:', JSON.stringify(getUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })