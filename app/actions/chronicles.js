"use server";

export async function registerUser(formData) {
  try {
    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        email: formData.get("email"),
        password: formData.get("password"),
        gender: formData.get("gender"),
        age: formData.get("age"),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "Something went wrong" };
    }

    return { success: "User registered successfully" };
  } catch (error) {
    return { error: "Server error: " + error.message };
  }
}
