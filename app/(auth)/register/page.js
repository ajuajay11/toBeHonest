import Button from "../../components/authentication/button";
import { registerUser } from "../../actions/chronicles";

export default function Page() {
  return (
    <form action={registerUser} method="POST">
      <div>
        <label htmlFor="firstname">Firstname:</label>
        <input type="text" id="firstname" name="firstname" required />
      </div>
      <div>
        <label htmlFor="lastname">Lastname:</label>
        <input type="text" id="lastname" name="lastname" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required />
      </div>
      <Button />
    </form>
  );
}
