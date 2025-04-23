import { prisma } from './client'

async function main() {
  const allUsers = await prisma.user.findMany()
}

main()