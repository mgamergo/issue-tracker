import { auth } from "@/auth";

const getSession = async () => {
  const session = await auth()
  if(session) {
    return session.user
  }
}

export default getSession