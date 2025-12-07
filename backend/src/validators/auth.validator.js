import { email, string, z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid mail format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  dateOfBirth: z.string(),
});

export const verifyUserSchema = z.object({
  email: z.string().email(),
  userVerificationCode: string()
})

export const resendVerficationCodeSchema = z.object({
  email: z.string().email(),
})

export const loginUserSchema = z.object({
  email: z.string().email("Invalid mail format"),
  userPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  userVerificationCode: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
})
