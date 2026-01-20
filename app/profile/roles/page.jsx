import { redirect } from "next/navigation";

export default function ProfileRolesRedirect() {
  redirect("/profile/access");
}
