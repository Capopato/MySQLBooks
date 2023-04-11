import { ZodLazy, z } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Validate input
 * Validate updates
 */

export const validateInput = (newBookInput: validateInputSchema): boolean => {
  try {
    validateInputSchema.parse(newBookInput);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return false;
    }
  }
  return false;
};
export const validateUpdate = (bookUpdateInput: validateUpdateSchema): boolean => {
  try {
    validateUpdateSchema.parse(bookUpdateInput);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return false;
    }
  }
  return false;
};

const validateInputSchema = z.object({
  author: z.string(),
  title: z.string(),
  pages: z.number(),
  year: z.number(),
});

const validateUpdateSchema = z.object({
  author: z.string().optional(),
  title: z.string().optional(),
  pages: z.number().optional(),
  year: z.number().optional(),
});

export type validateInputSchema = z.infer<typeof validateInputSchema>;
export type validateUpdateSchema = z.infer<typeof validateUpdateSchema>;
