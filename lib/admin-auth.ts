// Utility to check if a user is an admin based on ADMIN_USER_IDS env var
import {stackServerApp} from "@/stack";
import {UserSchema} from "@/lib/types";

export function isAdminUser(userId: string): boolean {
  const admins = process.env.ADMIN_USER_IDS?.split(',').map(id => id.trim()) || [];
  return admins.includes(userId);
}

export async function getUserById(userId: string) {
  "use server";

  try {
    const currentUser = await stackServerApp.getUser({or: 'redirect'})

    const auth = await currentUser.getAuthJson()

    const userDetail = await fetch(`https://api.stack-auth.com/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        "X-Stack-Access-Type": "server",
        "X-Stack-Project-Id": process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "",
        "X-Stack-Publishable-Client-Key": process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "",
        "X-Stack-Secret-Server-Key": process.env.STACK_SECRET_SERVER_KEY || "",
        "X-Stack-Access-Token": auth.accessToken || "",
      }
    })
    return await UserSchema.parseAsync(userDetail.json())
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null;
  }
}
