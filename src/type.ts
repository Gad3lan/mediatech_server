import { User as AppUser } from "./models/User";

declare global {
  namespace Express {
    class User extends AppUser {}
  }
}
